import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, Button, Text, StyleSheet} from 'react-native';
import {MainContext} from "../../MainContext";
import {styles} from '../styles';


// google auth
import { GoogleSignin } from '../GoogleAuth/GoogleSignin';


const GoogleSignoutButton = ({navigation}) => {
    const mainObject = useContext(MainContext);

    async function handleGoogleLogout() {
      try {
        await GoogleSignin.signOut();
        mainObject.setEmail("");
        // Perform additional cleanup and logout operations.
      } catch (error) {
        console.log('Google Sign-Out Error: ', error);
      }
    }
    return (
        <Pressable style={styles.container} onPress={handleGoogleLogout}>
            <Text style={styles.normalText}>Выйти из аккаунта</Text>
        </Pressable>
    );
};

export default GoogleSignoutButton;