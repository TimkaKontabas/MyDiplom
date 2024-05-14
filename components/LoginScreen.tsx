import {useState, useEffect, useContext} from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

import {MainContext} from "../MainContext";
import GoogleLoginButton from './Buttons/GoogleLoginButton';
import EmailAuth from './Forms/EmailAuth';


const LoginScreen = () => {
  const mainObject = useContext(MainContext);

  return (
    <View style={styles.mainContainer}>
      <EmailAuth />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "black"
    color: 'black'
  },
});

export default LoginScreen;