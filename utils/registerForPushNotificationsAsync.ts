import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Only ask if permissions have not already been granted
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // If permission is not granted, exit the function
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? 
        Constants.easConfig?.projectId;
    if (!projectId) {
      console.warn('No project ID found in EAS config');
      return;
    }

    try {
        const pushTokenString = (await Notifications.getExpoPushTokenAsync({
          projectId,
        })).data;

        console.log('Push notification token:', pushTokenString);
      } catch (error) {
        console.error('Error getting push token:', error);
      }
  } else {
    console.log('Must use physical device for Push Notifications');
  }
}
