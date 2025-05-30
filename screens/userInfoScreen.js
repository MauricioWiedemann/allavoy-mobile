import React, { useContext } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from "../config";

export default function UserInfo() {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('./../assets/logo.png')}
          />
          <Text style={styles.title}>Datos del usuario</Text>
          <Text style={styles.title}>TBD</Text>
        </View>
        <View style={styles.formAction}>
          <TouchableOpacity onPress={logout}>
            <View style={styles.btnCancel}>
              <Text style={styles.btnTextCancel}>Cerrar sesión</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerImg: {
    width: 150,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#075eec',
    marginBottom: 8,
    textAlign: 'center',
  },
  formAction: {
    marginTop: 30,
    alignItems: 'center',
  },
  btnCancel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#075eec',
  },
  btnTextCancel: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '1000',
    color: '#000000',
  },
});