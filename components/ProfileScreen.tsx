import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';

import {MainContext} from "../MainContext";
import {styles} from './styles';
import LoginScreen from './LoginScreen';
import GoogleSignoutButton from './Buttons/GoogleSignoutButton';


const Profile = () => {
    const mainObject = useContext(MainContext);
    
    return(
        <View style={styles.container}>
            <Text style={styles.normalText}>{mainObject.getEmail()}   {mainObject.getName()}</Text>
            <GoogleSignoutButton />
        </View>
    )
};

const ProfileScreen = ({navigation}) => {
    const mainObject = useContext(MainContext);

    const email = mainObject.getEmail();

    console.log(email);

    if (email) 
        return ( <Profile></Profile> );
    else 
        return ( <LoginScreen /> );

};

export default ProfileScreen;