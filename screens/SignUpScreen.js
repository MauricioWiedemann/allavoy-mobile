import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Keyboard,} from 'react-native';
import { NavigationContainer, createStaticNavigation, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import DateTimePicker from '@react-native-community/datetimepicker';

  export function SignUp() {
    const navigation = useNavigation();
    const [form, setForm] = useState({
      email: '',
      nombre: '',
      apellido: '',
      cedula: '',
      fechaNac: '',
      password: '',
    });
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
              Registrarse en <Text style={{ color: '#075eec' }}>Alla Voy!</Text>
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
                placeholder="pepegon@mail.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Nombre</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={nombre => setForm({ ...form, nombre })}
                placeholder="Pepe"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.nombre} />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Apellido</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={apellido => setForm({ ...form, apellido })}
                placeholder="Gonzales"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.apellido} />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Cedula</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={cedula => setForm({ ...form, cedula })}
                placeholder="1234567-8"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.cedula} />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Fecha de Nacimiento</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={fechaNac => setForm({ ...form, fechaNac })}
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.fechaNac} />
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
              <TouchableOpacity onPress={() => {
                  // handle onPress Funcion para registrar usuario
                  signup(form.email,
                    form.nombre,
                    form.apellido,
                    form.cedula,
                    form.fechaNac,
                    form.password)
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Registrarse</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {!isKeyboardOpen && (
          <Button onPress={() => navigation.navigate('Loguearse')}>
            <Text style={styles.formFooter}>
              ¿Ya se encuentra registrado?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Loguearse</Text>
            </Text>
          </Button>
        )}
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
      marginBottom: 3,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: '#929292',
    },
    /** Header */
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
    /** Form */
    form: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    formAction: {
      marginTop: 5,
      marginBottom: 15,
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
    },
    /** Input */
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
      color: '#222',
      borderWidth: 2,
      borderColor: '#C9D3DB',
      borderStyle: 'solid',
    },
    /** Button */
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
      marginTop: 25
    },
    btnText: {
      fontSize: 25,
      lineHeight: 26,
      fontWeight: '1000',
      color: '#fff',
    },
  });

export default SignUp;