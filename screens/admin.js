import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, StatusBar, TextInput, Alert } from 'react-native';
import firebase from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../styles/global';

export default function Admin({ navigation }) {
    const [selectImage, setSelectImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const menuItemsRef = firebase.firestore().collection('menu');

    const [day1, setDay1] = useState('');
    const [day2, setDay2] = useState('');
    const [day3, setDay3] = useState('');
    const [day4, setDay4] = useState('');

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setSelectImage(result.assets[0].uri);
        }
    }
    const modify = () => {
        navigation.navigate('Modify')
    }
    const uploadImage = async () => {
        const response = await fetch(selectImage);
        const blob = await response.blob();
        const filename = name;
        var ref = firebase.storage().ref().child(`menu/${filename}`).put(blob);
        try {
            await ref;
        } catch (e) {
            console.log(e)
        }

        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`menu/${filename}`);
        imageRef.getDownloadURL()
            .then((url) => { console.log('Download URL:', url); })
            .catch((error) => {
                console.error('Error getting download URL:', error);
            });
        setSelectImage('');
    }
    const handleAddItem = async () => {
        try {
            await uploadImage();
            // Create the menu item object
            const newItem = {
                name: name,
                price: price,
                imageUri: imageUrl,
            };
            // Upload the menu item object to Firestore
            await menuItemsRef.add(newItem);
            Alert.alert('Item added successfully');
            setName('');
            setPrice('');
        } catch (error) {
            console.error('Error adding menu item:', error);
            Alert.alert(error);
        }
    };

    const dates = {
        day1,
        day2,
        day3,
        day4
    }
    const handleSaveToFirebase = () => {
        firebase.firestore().collection('date').add(dates).then(() => {
            console.log('Dates modified', dates);
            Alert.alert('Dates modified successfully');
            setDay1('')
            setDay2('')
            setDay3('')
            setDay4('')
        }).catch((error) => {
            console.log('Error during addition');
            setErrorMessage("An error occurred during addition");
            Alert.alert(error)
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#fffcf2' />
            <ScrollView>
                <View style={styles.modify}>
                    <Text style={styles.title}>Modify the menu</Text>
                    <View style={styles.add}>
                        <Text style={styles.text}>Add an item to the menu:</Text>
                        <TouchableOpacity style={styles.btn} onPress={imagePicker}>
                            <Text style={styles.btnText}>Choose an image</Text>
                        </TouchableOpacity>
                        {selectImage && <Image source={{ uri: selectImage }} style={{ width: 200, height: 200, borderRadius: 16 }} />}
                        <TextInput style={globalStyles.input} placeholder="Product name" onChangeText={setName} value={name} />
                        <TextInput style={globalStyles.input} placeholder="Price" onChangeText={setPrice} value={price} keyboardType="numeric" />
                        <TouchableOpacity style={globalStyles.button} onPress={handleAddItem}>
                            <Text style={globalStyles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.button} onPress={modify}>
                            <Text style={globalStyles.buttonText}>Modify/Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.modify}>
                    <Text style={styles.title}>Modify reservations</Text>
                    <View style={styles.add}>
                        <Text style={styles.text}>Modify dates:</Text>
                        <TextInput style={globalStyles.input} placeholder="Day 1: DD-MM" value={day1} onChangeText={setDay1} keyboardType="numeric" />
                        <TextInput style={globalStyles.input} placeholder="Day 2: DD-MM" value={day2} onChangeText={setDay2} keyboardType="numeric" />
                        <TextInput style={globalStyles.input} placeholder="Day 3: DD-MM" value={day3} onChangeText={setDay3} keyboardType="numeric" />
                        <TextInput style={globalStyles.input} placeholder="Day 4: DD-MM" value={day4} onChangeText={setDay4} keyboardType="numeric" />
                        <TouchableOpacity style={globalStyles.button} onPress={handleSaveToFirebase}>
                            <Text style={globalStyles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffcf2'
    },
    title: {
        fontFamily: 'Bold',
        textAlign: 'center',
        margin: 25,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#c69214',
        borderRadius: 10,
        padding: 10
    },
    add: {
        width: '100%',
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#D5A021',
        borderWidth: 2,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 4,
    },
    btn: {
        width: '80%',
        height: 48,
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#D5A021',
        borderWidth: 2,
        borderRadius: 4,
    },
    btnText: {
        color: '#D5A021',
        fontFamily: 'Bold',
        fontSize: 16,
    },
    modify: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Bold',
        fontSize: 18,
        marginTop: 10
    }

});
