import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Keyboard, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from "../config";

export function SignUp() {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState({
    email: '',
    nombre: '',
    apellido: '',
    cedula: '',
    fechaNac: '',
    password: '',
  });

/*
  const crearCuenta = async (form) => {
    try {
      const response = await axios.post(`${BASE_URL}/registro`, {
        email: form.email,
        nombre: form.nombre,
        apellido: form.apellido,
        cedula: form.cedula,
        fechaNac: form.fechaNac,
        password: form.password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  */

  // mock, borrar
  const crearCuenta = async (form) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true, message: 'Usuario creado' });
      }, 1000);
    });
  };

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
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[styles.inputControl, { justifyContent: 'center' }]}
            >
              <Text style={{ color: form.fechaNac ? '#222' : '#6b7280', fontSize: 15 }}>
                {form.fechaNac ? form.fechaNac : 'Seleccionar fecha'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={form.fechaNac ? new Date(form.fechaNac) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const d = selectedDate;
                    const fechaFormateada = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}-${d.getFullYear()}`;
                    setForm({ ...form, fechaNac: fechaFormateada });
                  }
                }}
              />
            )}
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
              onPress={async () => {
                try {
                  await crearCuenta(form);
                  Alert.alert(
                    'Registro exitoso',
                    'Tu cuenta fue creada.',
                    [{
                        text: 'OK',
                        onPress: () => navigation.navigate('Loguearse'),
                      },
                    ]
                  );
                } catch (error) {
                  Alert.alert('Error', 'No se pudo crear la cuenta');
                }
              }}
            >
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