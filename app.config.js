module.exports = {
  "expo": {
    "name": "prueba_concepto_mobile",
    "slug": "prueba_concepto_mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.grupo52015.allavoyg5",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.grupo52015.allavoyg5",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON ?? './google-services.json'
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "2a786c55-1096-4571-8aaf-493922723dd8"
      }
    },
    "owner": "leoarbelo"
  }
}
