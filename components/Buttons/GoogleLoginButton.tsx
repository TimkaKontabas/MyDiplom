import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, Button, Text, StyleSheet} from 'react-native';
import {MainContext} from "../../MainContext";

// google auth
import { GoogleLogin, GoogleSignin } from '../GoogleAuth/GoogleSignin';

const GoogleLoginButton = ({navigation}) => {
  const mainObject = useContext(MainContext);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;
      mainObject.setEmail(user.email);
      mainObject.setName(user.name);

      if (idToken) {
        const resp = await authAPI.validateToken({
          token: idToken,
          email: user.email,
        });
        await handlePostLoginData(resp.data);
      }
    } 
    catch (apiError) {
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong'
      );
    } 
    finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={handleGoogleLogin}><Text>Войти с помощью Google</Text></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    normalText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
});

export default GoogleLoginButton;