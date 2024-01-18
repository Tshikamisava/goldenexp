import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import firebase from '../firebase';
import { globalStyles } from '../styles/global';
import { StatusBar } from "react-native";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, [firebase, navigation]);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (email === '' || password === '' || confirmPassword === '' || firstName === '' || lastName === '' || phoneNumber === '') {
      setError('Please fill in all fields before continuing');
    } else {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        const user = {
          firstName,
          lastName,
          phoneNumber: parseInt(phoneNumber),
          email,
          password,
        }

        // Put the created object in the database (Firebase)
        firebase.firestore().collection('users').add(user).then(() => {
          console.log('User added', user);
          Alert.alert('Registration successful!');
        }).catch((error) => {
          console.log('Error adding user');
          setError("An error occurred during your registration");
        });
        navigation.goBack()
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#fffcf2' />
      <Image source={require('../assets/logo.png')} style={{ width: '30%', height: '10%', marginBottom: 20 }} />
      <Text style={globalStyles.titleText}>Sign Up</Text>

      <Text style={globalStyles.text}>First Name:</Text>
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={globalStyles.input} />
      <Text style={globalStyles.text}>Last Name:</Text>
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={globalStyles.input} />
      <Text style={globalStyles.text}>Phone Number:</Text>
      <TextInput placeholder="Phone" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="numeric" style={globalStyles.input} />
      <Text style={globalStyles.text}>Email:</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={globalStyles.input} />
      <Text style={globalStyles.text}>Password:</Text>
      <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} style={globalStyles.input} />
      <Text style={globalStyles.text}>Confirm Password:</Text>
      <TextInput placeholder="Confirm password" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} style={globalStyles.input} />
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={globalStyles.button} onPress={handleSignUp}>
        <Text style={globalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffcf2',
  },
  errorText: {
    fontFamily: 'Bold',
    fontSize: 12,
    marginTop: 10,
    color: 'red'
  }
});
