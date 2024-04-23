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


export {GoogleLogin, GoogleSignin};