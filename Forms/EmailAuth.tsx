import {useState, useEffect, useContext} from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

import {styles} from '../styles';
import {MainContext} from "../../MainContext";


const EmailAuth = () => {
    const mainObject = useContext(MainContext);

  return (
    <View style={styles.container}>
      <Text style={styles.normalText}>1234</Text>
    </View>
  );
};


export default EmailAuth;