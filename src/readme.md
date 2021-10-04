se requiere agregar este comando antes de arrancar

cordova plugin add cordova-plugin-fcm-with-dependecy-updated \
  --variable ANDROID_DEFAULT_NOTIFICATION_ICON="@mipmap/ic_launcher" \
  --variable ANDROID_FIREBASE_BOM_VERSION="26.0.0" \
  --variable ANDROID_GOOGLE_SERVICES_VERSION="4.3.4" \
  --variable ANDROID_GRADLE_TOOLS_VERSION="4.1.1" \
  --variable IOS_FIREBASE_MESSAGING_VERSION="~> 7.4.0"