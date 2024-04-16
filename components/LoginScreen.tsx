import {useState, useEffect, useContext} from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';


import {MainContext} from "../MainContext";

// google auth
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GOOGLE_ANDROID_CLIENT_ID
} from '@env';

GoogleSignin.configure({
  androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  scopes: ['profile', 'email']
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};



const LoginScreen = () => {
  const mainObject = useContext(MainContext);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogout() {
  try {
    await GoogleSignin.signOut();
    // Perform additional cleanup and logout operations.
  } catch (error) {
    console.log('Google Sign-Out Error: ', error);
  }
}

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;
      mainObject.email = user.email;
      mainObject.name = user.name;

      if (idToken) {
        const resp = await authAPI.validateToken({
          token: idToken,
          email: user.email,
        });
        await handlePostLoginData(resp.data);
      }
    } catch (apiError) {
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={handleGoogleLogin}><Text>Continue with Google</Text></Pressable>
      <Pressable onPress={handleGoogleLogout}><Text>logout with Google</Text></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black"
    },
});

export default LoginScreen;