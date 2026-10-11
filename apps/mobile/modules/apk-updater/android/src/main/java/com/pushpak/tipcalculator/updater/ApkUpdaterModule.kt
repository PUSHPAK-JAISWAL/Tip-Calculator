package com.pushpak.tipcalculator.updater

import android.content.ContentValues
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.provider.Settings
import androidx.core.content.FileProvider
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.File
import java.io.FileInputStream
import java.security.MessageDigest

class ApkUpdaterModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ApkUpdater")

    Function("getInstalledPackageName") {
      appContext.reactContext?.packageName ?: ""
    }

    Function("getInstalledCertSha256") {
      val context = appContext.reactContext ?: return@Function ""
      signingSha256(context.packageManager, context.packageName, null)
    }

    Function("inspectApk") { path: String ->
      val context = appContext.reactContext ?: throw Exception("No Android context")
      val info = archiveInfo(context.packageManager, path)
        ?: throw Exception("Unable to parse APK")
      mapOf(
        "packageName" to (info.packageName ?: ""),
        "certSha256" to signingSha256(context.packageManager, info.packageName, path)
      )
    }

    AsyncFunction("canRequestInstall") {
      val context = appContext.reactContext ?: return@AsyncFunction false
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        context.packageManager.canRequestPackageInstalls()
      } else {
        true
      }
    }

    AsyncFunction("openInstallPermissionSettings") {
      val context = appContext.reactContext ?: return@AsyncFunction
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val intent = Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES).apply {
          data = Uri.parse("package:${context.packageName}")
          addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        context.startActivity(intent)
      }
    }

    AsyncFunction("installApk") { path: String ->
      val context = appContext.reactContext ?: throw Exception("No Android context")
      val file = File(path)
      if (!file.exists()) throw Exception("APK not found at $path")
      val uri = FileProvider.getUriForFile(
        context,
        "${context.packageName}.fileprovider",
        file
      )
      val intent = Intent(Intent.ACTION_VIEW).apply {
        setDataAndType(uri, "application/vnd.android.package-archive")
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
      }
      context.startActivity(intent)
    }

    AsyncFunction("saveToDownloads") { path: String, filename: String ->
      val context = appContext.reactContext ?: throw Exception("No Android context")
      val src = File(path)
      if (!src.exists()) throw Exception("APK not found")
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        val values = ContentValues().apply {
          put(MediaStore.Downloads.DISPLAY_NAME, filename)
          put(MediaStore.Downloads.MIME_TYPE, "application/vnd.android.package-archive")
          put(MediaStore.Downloads.IS_PENDING, 1)
        }
        val resolver = context.contentResolver
        val uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
          ?: throw Exception("Could not create a Downloads entry")
        resolver.openOutputStream(uri)?.use { out ->
          FileInputStream(src).use { input -> input.copyTo(out) }
        }
        values.clear()
        values.put(MediaStore.Downloads.IS_PENDING, 0)
        resolver.update(uri, values, null, null)
        uri.toString()
      } else {
        @Suppress("DEPRECATION")
        val dest = File(
          Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
          filename
        )
        src.copyTo(dest, overwrite = true)
        dest.absolutePath
      }
    }
  }

  private fun archiveInfo(pm: PackageManager, path: String) =
    if (Build.VERSION.SDK_INT >= 33) {
      pm.getPackageArchiveInfo(
        path,
        PackageManager.PackageInfoFlags.of(signingFlags().toLong())
      )
    } else {
      @Suppress("DEPRECATION")
      pm.getPackageArchiveInfo(path, signingFlags())
    }

  private fun signingFlags(): Int =
    if (Build.VERSION.SDK_INT >= 28) {
      PackageManager.GET_SIGNING_CERTIFICATES
    } else {
      @Suppress("DEPRECATION")
      PackageManager.GET_SIGNATURES
    }

  private fun signingSha256(pm: PackageManager, packageName: String?, apkPath: String?): String {
    val signatures = if (apkPath != null) {
      val info = archiveInfo(pm, apkPath) ?: return ""
      signaturesOf(info)
    } else {
      val info = if (Build.VERSION.SDK_INT >= 33) {
        pm.getPackageInfo(
          packageName ?: return "",
          PackageManager.PackageInfoFlags.of(signingFlags().toLong())
        )
      } else {
        @Suppress("DEPRECATION")
        pm.getPackageInfo(packageName ?: return "", signingFlags())
      }
      signaturesOf(info)
    }
    val first = signatures.firstOrNull() ?: return ""
    val digest = MessageDigest.getInstance("SHA-256").digest(first.toByteArray())
    return digest.joinToString("") { byte -> "%02x".format(byte) }
  }

  private fun signaturesOf(info: android.content.pm.PackageInfo): Array<android.content.pm.Signature> {
    return if (Build.VERSION.SDK_INT >= 28) {
      info.signingInfo?.apkContentsSigners ?: emptyArray()
    } else {
      @Suppress("DEPRECATION")
      info.signatures ?: emptyArray()
    }
  }
}
