import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import firebase from '../firebase';
import { StatusBar } from 'react-native';
import { globalStyles } from '../styles/global';

export default function EditProfile({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [num, setNum] = useState('');

  const user = firebase.auth().currentUser;

  const handleFormSubmit = () => {
    if (user) {
      // Update the user's information in the 'utilisateur' table in Firestore
      const userRef = firebase.firestore().collection('utilisateur');
      const query = userRef.where('email', '==', user.email);

      query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update({
              nom: nom,
              prenom: prenom,
              num: num,
            })
            .then(() => {
              // User information in Firestore updated successfully
              Alert.alert('User information updated successfully');
              console.log('User information in Firestore updated successfully');
              setNom('');
              setNum('');
              setPrenom('');
            })
            .catch((error) => {
              // An error occurred while updating user information in Firestore
              Alert.alert('Error', 'Failed to update user information');
              console.log('Failed to update user information in Firestore', error);
            });
        });
      }).catch((error) => {
        // An error occurred while fetching user information from Firestore
        Alert.alert('Error', 'Failed to fetch user information');
        console.log('Failed to fetch user information from Firestore', error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#d59f21' />
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.container2}>
        <Text style={styles.header}>Edit Profile</Text>

        <Text style={styles.subTitle}>Last Name</Text>
        <TextInput style={globalStyles.input} placeholder="Last Name" onChangeText={setNom} value={nom} />

        <Text style={styles.subTitle}>First Name</Text>
        <TextInput style={globalStyles.input} placeholder="First Name" onChangeText={setPrenom} value={prenom} />

        <Text style={styles.subTitle}>Phone Number</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Phone Number"
          onChangeText={setNum}
          value={num}
          keyboardType='numeric'
        />

        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={globalStyles.buttonText}>Edit Your Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#d59f21',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffcf2',
    width: '100%',
    height: '100%',
    marginTop: 50,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
  },
  button: {
    width: 310,
    height: 48,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080',
    borderRadius: 4,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Bol',
    fontSize: 26,
    marginTop: 30,
    color: '#fffcf2',
  },
  subTitle: {
    fontFamily: 'Reg',
    fontSize: 18,
    marginTop: 10,
  },
  header: {
    fontFamily: 'Bol',
    fontSize: 22,
    color: '#d59f21',
    marginBottom: 45,
  },
});
