import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import firebase from "../firebase";
import { StatusBar } from "react-native";

import Admin from "./admin";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setError('Please fill in all fields');
    } else {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  if (isAuth) {
    // Navigate to AppNav if the user is authenticated
    return <AppNav />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#fffcf2' />
      <Image source={require('../assets/logo.png')} style={{ width: '30%', height: '10%', marginBottom: 100 }} />
      <Text style={styles.titleText}>Welcome back!</Text>
      <Text style={globalStyles.text}>Email:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <Text style={globalStyles.text}>Password:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCompleteType="password"
      />

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
        <Text style={styles.btnTxt}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffcf2'
  },
  titleText: {
    fontFamily: 'Bold',
    fontSize: 22,
    marginBottom: '10%',
  },
  btn: {
    width: '80%',
    height: 48,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c69214',
    borderWidth: 2,
    borderRadius: 4,
  },
  btnTxt: {
    color: '#c69214',
    fontFamily: 'Bold',
    fontSize: 16,
  },
  errorText: {
    fontFamily: 'Bold',
    fontSize: 12,
    marginTop: 10,
    color: 'red'
  }
});
