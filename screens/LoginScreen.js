import React, { useState,useContext, useEffect } from 'react';
import {StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Keyboard, Alert,} from 'react-native';
import { NavigationContainer, createStaticNavigation, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { AuthContext } from '../context/AuthContext';

  export function Login() {
    const navigation = useNavigation();
    const {login} = useContext(AuthContext);
    const [form, setForm] = useState({
      email: '',
      password: '',
    });

    const validaCampos = () => {
      if(form.email==='' || form.password===''){
        Alert.alert("Error", "Complete todos los campos");
      } else {
        login(form.email,form.password);
      }
    }

    //Ver si el teclado esta abierto o no
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
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
              Ingresar a <Text style={{ color: '#075eec' }}>Alla Voy!</Text>
            </Text>
            <Text style={styles.subtitle}>
              Obten acceso a boletos de omnibus y mas!
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
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Constraseña</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>
            <View style={styles.formAction}>
              <TouchableOpacity 
                
                onPress={() => validaCampos()}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Ingresar</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('RecuperarPass')}>
              <Text style={styles.formLink}>¿Olvidó su contraseña?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {!isKeyboardOpen && (
        <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
          <Text style={styles.formFooter}>
            No tiene cuenta?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Registrar Usuario</Text>
          </Text>
        </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      padding: 24,
    },
    title: {
      fontSize: 35,
      fontWeight: '700',
      color: '#1D2A32',
      marginBottom: 3,
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
      marginTop: 25,
      marginBottom: 16,
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
      marginBottom: 10,
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
  });

export default Login;