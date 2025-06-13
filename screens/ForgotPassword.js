import React, { useState,useContext, useEffect } from 'react';
import {StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Keyboard,} from 'react-native';
import { NavigationContainer, createStaticNavigation, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import axios from 'axios';
import { BASE_URL } from "../config";

export function ForgotPass() {
  const navigation = useNavigation();
  const [form, setForm] = useState({ email: '' });
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleForgotPass = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/recuperar-password`, { correo: form.email });
      alert(res.data.message);
      navigation.navigate('Loguearse');
    } catch (error) {
      alert('Error al enviar el mail de recuperación.');
    }
  };

  //Ver si el teclado esta abierto o no
  useEffect(() => {
    const keyboardOpenListener = Keyboard.addListener("keyboardDidShow", () =>
        setIsKeyboardOpen(true)
    );
    const keyboardCloseListener = Keyboard.addListener("keyboardDidHide", () =>
        setIsKeyboardOpen(false)
    );
  })
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('./../assets/logo.png')}/>
          <Text style={styles.title}>
              <Text style={{ color: '#075eec' }}>Alla Voy!</Text>
          </Text>
          <Text style={styles.title}>
            Recuperar contraseña 
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Correo</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={email => setForm({ ...form, email })}
              placeholder="pepe@mail.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email} />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleForgotPass}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Enviar mail de recuperación</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
               onPress={() => navigation.navigate('Loguearse')}>
              <View style={styles.btnCancel} >
                <Text style={styles.btnTextCancel}>Cancelar</Text>
              </View>
            </TouchableOpacity>
          </View>

          </View>
        </View>
      </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      padding: 24,
    },
    title: {
      fontSize: 35,
      fontWeight: '700',
      color: '#1D2A32',
      marginBottom: 13,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: '#929292',
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30,
    },
    headerImg: {
      width: 250,
      height: 180,
      alignSelf: 'center',
      marginBottom: 10,
    },
    form: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    formAction: {
      marginTop: 15,
      marginBottom: 0,
    },
    formLink: {
      fontSize: 16,
      fontWeight: '600',
      color: '#075eec',
      textAlign: 'center',
    },
    formFooter: {
      paddingVertical: 24,
      fontSize: 15,
      fontWeight: '600',
      color: '#222',
      textAlign: 'center',
      letterSpacing: 0.15,
    },
    input: {
      marginBottom: 40,
    },
    inputLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: '#222',
      marginBottom: 0,
    },
    inputControl: {
      height: 50,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      borderRadius: 12,
      fontSize: 15,
      fontWeight: '500',
      color: '#222',
      borderWidth: 1,
      borderColor: '#C9D3DB',
      borderStyle: 'solid',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      backgroundColor: '#075eec',
      borderColor: '#075eec',
    },
    btnText: {
      fontSize: 25,
      lineHeight: 26,
      fontWeight: '1000',
      color: '#fff',
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
      lineHeight: 26,
      fontWeight: '1000',
      color: '#000000',
    },
  });

export default ForgotPass;