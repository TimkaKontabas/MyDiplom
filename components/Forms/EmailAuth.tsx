import {useState, useEffect, useContext} from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {getServerData} from '../ServerAPI';

import {MainContext} from "../../MainContext";


const EmailAuth = () => {
  const mainObject = useContext(MainContext);
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorText, setErrorText] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [plugNeedUpdate, setPludNeedUpdate] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [authData, setAuthData] = useState({});

  const onError = (error) => {
    setErrorText('Ошибка загрузки: ' + error);
  }

  const MyButton = (onPress, text) => {
    return (
      <TouchableOpacity onPress={() => {onPress()}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const loginHandler = () => {
    setPludNeedUpdate(true);
  }

  useEffect(() => {
    setErrorInput(authData.isError ? authData.data[0] : "");
    setErrorText('');
    if (!authData.isError) {
      mainObject.setLogin(loginValue);
      mainObject.setUserID(authData.user_id);
      mainObject.setUserType(authData.user_type);
    }
  }, [authData]);

  getServerData(
    plugNeedUpdate, setPludNeedUpdate, 
    setAuthData, 'authtorizationUser', onError, 
    {login: loginValue, password: passwordValue}
  );

  if (!errorText)
    return (
      <View style={[styles.columnContainer, {height: '100%'}]}>
        <View style={styles.centerContainer}>
          <TextInput 
            editable
            maxLength={50}
            placeholder={'Логин'}
            onChangeText={text => setLoginValue(text)}
            value={loginValue}
            style={styles.textInput}
          />
        </View>
        { (errorInput == 'login') && <View style={styles.centerContainer}>
          <Text style={styles.normalText}>Ошибка, такой логин не найден</Text>
        </View>}
        <View style={styles.rowContainer}>
          <View style={[styles.centerContainer, {paddingLeft: 6,}]}>
            <TextInput 
              editable
              maxLength={50}
              placeholder={'Пароль'}
              secureTextEntry={hidePassword}
              onChangeText={text => setPasswordValue(text)}
              value={passwordValue}
              style={styles.textInput}
            />
          </View>
          <View style={[styles.columnContainer, {marginLeft: -15, marginRight: 5}]}>
            {MyButton(() => setHidePassword(!hidePassword), hidePassword ? "Показать":"Скрыть")}
          </View>
        </View>

        { (errorInput == 'password') && <View style={styles.centerContainer}>
          <Text style={styles.normalText}>Ошибка, неверный пароль</Text>
        </View>}
        
        <View style={styles.centerContainer}>
          {MyButton(loginHandler, "Войти")}
        </View>
        
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>{errorText}</Text>
      </View>
    )
};

const styles = StyleSheet.create({
  container: {},
  mainContainer: {
    backgroundColor: "black"
  },
  textInput: {
    padding: 5,
    paddingLeft: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    color: 'black', 
    width: '80%', 
    borderRadius: 10,
    borderWidth: 2,
  },
  centerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    paddingTop: 10,
  },
  columnContainer: {
    backgroundColor: 'rgb(170, 200, 250)',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  normalText: {
    fontSize: 13,
    color: "black",
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    padding: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    borderRadius: 14,
    minWidth: 74,
  },
  buttonText: {textAlign: 'center', color: "black"},
});

export default EmailAuth;