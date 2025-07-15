import * as React from 'react';

import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';
import { NotificationProvider } from './context/NotificationContext';
import * as Notifications from 'expo-notifications';

// Configura el comportamiento de las notificaciones cuando la app está en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppNav />
      </NotificationProvider>
    </AuthProvider>
  );
}
