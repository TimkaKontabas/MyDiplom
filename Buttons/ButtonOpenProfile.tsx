import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {MainContext} from "../../MainContext";


const ButtonOpenProfile = ({navigation}) => {

    const mainObject = useContext(MainContext);

    const email = mainObject.getEmail();

    return (
        <Button title={mainObject.getEmail() ? "Перейти в профиль" : "Зарегистрироваться"} onPress={() => {
            navigation.navigate('Профиль');
        }}/>
    );
};

const styles = StyleSheet.create({
    normalText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
});

export default ButtonOpenProfile;