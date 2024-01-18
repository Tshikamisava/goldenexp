import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import firebase from '../firebase';
import { globalStyles } from "../styles/global";
import { StatusBar } from "react-native";

export default function Reservation() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [validationError, setValidationError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDatePress = (date) => {
    setDate(date);
    setSelectedDate(date);
  };
  const handleTimePress = (time) => {
    setTime(time);
  };
  const handleGuestsPress = (guests) => {
    setGuests(guests);
  };

  useEffect(() => {
    const fetchDates = async () => {
      const userRef = firebase.firestore().collection('date');
      const unsubscribeSnapshot = userRef.onSnapshot((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        const datesArray = Object.values(data[0]);
        setDates(datesArray);
      });
      return () => {
        unsubscribeSnapshot();
      };
    };
    fetchDates();
  }, []);

  const handleBooking = () => {
    const user = firebase.auth().currentUser;
    const email = user.email;
    // Create a new object containing the reservation information
    const booking = {
      date,
      time,
      guests: parseInt(guests),
      email,
    };

    // Put the created object in the database (Firebase)
    firebase.firestore().collection('bookings').add(booking).then(() => {
      console.log('Booking added', booking);
      Alert.alert('Reservation successful!');
      setSelectedDate('');
      setTime('');
      setGuests('');
    }).catch((error) => {
      console.log('Error adding the booking');
      setErrorMessage("An error occurred while adding the reservation");
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#fffcf2' />
      <Text style={styles.title}>Book your table</Text>
      <View style={styles.container2}>
        <View style={styles.section}>
          <Text style={styles.text}>Select a day</Text>
          <View style={styles.buttonContainer}>
            {dates.sort().map((date, index) => (
              <TouchableOpacity key={index} style={[styles.button, selectedDate === date && styles.buttonSelected]} onPress={() => handleDatePress(date)}>
                <Text style={styles.buttonText}>{date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Select a time</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, time === '10:00' && styles.buttonSelected]}
              onPress={() => handleTimePress('10:00')}
            >
              <Text style={styles.buttonText}>10:00 am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, time === '12:00' && styles.buttonSelected]}
              onPress={() => handleTimePress('12:00')}
            >
              <Text style={styles.buttonText}>12:00 am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, time === '14:00' && styles.buttonSelected]}
              onPress={() => handleTimePress('14:00')}
            >
              <Text style={styles.buttonText}>2:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, time === '18:00' && styles.buttonSelected]}
              onPress={() => handleTimePress('18:00')}
            >
              <Text style={styles.buttonText}>6:00 pm</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Number of guests</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, guests === '1' && styles.buttonSelected]}
              onPress={() => handleGuestsPress('1')}
            >
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, guests === '2' && styles.buttonSelected]}
              onPress={() => handleGuestsPress('2')}
            >
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, guests === '3' && styles.buttonSelected]}
              onPress={() => handleGuestsPress('3')}
            >
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, guests === '4' && styles.buttonSelected]}
              onPress={() => handleGuestsPress('4')}
            >
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
          </View>
        </View>

        {validationError ? <Text style={styles.valid}>{validationError}</Text> : null}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={globalStyles.buttonText}>Book</Text>
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
  title: {
    fontFamily: 'Bold',
    fontSize: 26,
    marginTop: 30,
    color: '#fffcf2',
  },
  text: {
    fontFamily: 'Regular',
    textAlign: 'center',
    margin: 25,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#d59f21',
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#d59f21',
  },
  buttonSelected: {
    backgroundColor: '#008080',
    borderColor: '#008080',
  },
  timeButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Regular',
    fontSize: 14,
  },
  bookButton: {
    width: 350,
    height: 48,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080',
    borderRadius: 4,
    marginBottom: 20,
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
  },
  error: {
    color: 'red',
    fontFamily: 'Regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  valid: {
    color: 'green',
    fontFamily: 'Regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
});
