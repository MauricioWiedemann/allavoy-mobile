import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from "../config";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function UserInfo() {
  const { logout, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [original, setOriginal] = useState({});
  const [form, setForm] = useState({
    email: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    axios.post(`${BASE_URL}/usuario/buscarporid`, {
      idUsuario: login.id?.toString()
    })
      .then(res => {
        const data = res.data;
        setForm({
          email: data.correo,
          nombre: data.nombre,
          apellido: data.apellido,
          fechaNacimiento: data.fechaNacimiento,
        });
        setOriginal({
          email: data.correo,
          nombre: data.nombre,
          apellido: data.apellido,
          fechaNacimiento: data.fechaNacimiento,
        });
      })
      .catch(() => Alert.alert('Error', 'Error en carga de datos'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/usuario/editar`, {
        idUsuario: login.id?.toString(),
        nombre: form.nombre,
        apellido: form.apellido,
        fechaNacimiento: form.fechaNacimiento,
      });
      if (res.status === 200) {
        setOriginal(form);
        Alert.alert('Éxito', 'Datos guardados');
      } else {
        Alert.alert('Error', 'No se pudo guardar');
      }
    } catch {
      Alert.alert('Error', 'No se pudo guardar');
    }
  };

  const handleCancel = () => setForm(original);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const d = selectedDate;
      const fechaFormateada = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${d.getFullYear()}`;
      setForm({ ...form, fechaNacimiento: fechaFormateada });
    }
  };

  if (loading) return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8ecf4' }}>
      <ActivityIndicator size="large" color="#075eec" />
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={[styles.container, { paddingBottom: 100 }]}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('./../assets/logo.png')}
          />
          <Text style={styles.title}>Datos del usuario</Text>
        </View>
        <Text style={styles.label}>Correo</Text>
        <TextInput style={[styles.input, { backgroundColor: '#e0e0e0' }]} value={form.email} editable={false} />
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={form.nombre} onChangeText={v => handleChange('nombre', v)} />
        <Text style={styles.label}>Apellido</Text>
        <TextInput style={styles.input} value={form.apellido} onChangeText={v => handleChange('apellido', v)} />
        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[styles.input, { justifyContent: 'center', marginBottom: 30 }]}
        >
          <Text style={{ color: form.fechaNacimiento ? '#222' : '#6b7280', fontSize: 15 }}>
            {form.fechaNacimiento ? form.fechaNacimiento : 'Seleccionar fecha'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={
              form.fechaNacimiento
                ? new Date(
                    form.fechaNacimiento.split('-')[2],
                    parseInt(form.fechaNacimiento.split('-')[1], 10) - 1,
                    form.fechaNacimiento.split('-')[0]
                  )
                : new Date()
            }
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
        <View style={styles.formAction}>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleSave}>
            <View style={[styles.btn, { width: '100%' }]}>
              <Text style={styles.btnText}>Guardar Cambios</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.formAction}>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleCancel}>
            <View style={[styles.btnCancel, { width: '100%' }]}>
              <Text style={styles.btnTextCancel}>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 50 }} />
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={logout} style={{ width: '100%' }}>
          <View style={[styles.btnCerrarSesion, { width: '100%' }]}>
            <Text style={styles.btnText}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
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
    marginVertical: 30,
  },
  headerImg: {
    width: 150,
    height: 80,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 0,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    marginBottom: 10,
  },
  formAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
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
    lineHeight: 25,
    fontWeight: '1000',
    color: '#000000',
  },
  logoutContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 24,
  },
  btnCerrarSesion: {
    backgroundColor: '#ff8888',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 2,
  },
  
});