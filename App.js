import * as React from 'react';

import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';

//const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
