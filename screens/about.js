import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "react-native";

export default function About() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#d59f21' />
            <ScrollView>
                <Text style={styles.title}>About Us!</Text>
                <View style={styles.container2}>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: 36.75040495074807,
                            longitude: 5.040788450890531,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}>
                        <Marker
                            coordinate={{ latitude: 36.75040495074807, longitude: 5.040788450890531 }}
                            title="Where We Are"
                            description="Restaurant Golden Experience, Bejaia"
                        />
                    </MapView>
                    {/* <View   >
                        <Image source={require('../assets/map.png')} style={{width:'100%',height:'100%'}} />
                    </View> */}
                    <Text style={styles.sousTitle}>Address</Text>
                    <Text style={styles.text}>11 Seekoei Street, Elandsfontein, Restaurant Golden Experience.</Text>

                    <Text style={styles.sousTitle}>Phone</Text>
                    <Text style={styles.text}>067 096 2825 / 081 488 0483</Text>

                    <Text style={styles.sousTitle}>Details About Our Restaurant</Text>

                    <Text style={styles.text}>Welcome to the Golden Experience restaurant, where culinary excellence meets exceptional service.
                        We take pride in offering our customers a unique and unforgettable gastronomic experience.</Text>
                    <Text style={styles.description}>Our talented team of chefs prepares enticing dishes using the freshest and finest ingredients,
                        ensuring that each plate is a masterpiece of flavors. From appetizing starters to delicious main courses and delectable desserts,
                        our menu is designed to satisfy the most discerning palates.</Text>
                    <Text style={styles.descr}>At the Golden Experience restaurant, we believe that a meal is not just about food; it's about creating lasting memories.
                        Our warm and welcoming ambiance, attentive staff, and attention to detail make each visit a special occasion.</Text>
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
        backgroundColor: '#d59f21',
    },
    container2: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fffcf2',
        width: '100%',
        height: '100%',
        marginTop: 30,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    title: {
        fontFamily: 'Bold',
        fontSize: 26,
        marginTop: 30,
        color: '#fffcf2',
        alignSelf: 'center',
        paddingBottom: 20
    },
    map: {
        width: '80%',
        height: 300,
        margin: 20,
        borderRadius: 50,
        alignSelf: 'center'
    },
    sousTitle: {
        fontFamily: 'Bold',
        fontSize: 18,
        marginLeft: 20
    },
    text: {
        fontFamily: 'Regular',
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 20
    },
    description: {
        fontFamily: 'Regular',
        marginLeft: 20,
        marginTop: 5
    },
    descr: {
        fontFamily: 'Regular',
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 20
    }
});
