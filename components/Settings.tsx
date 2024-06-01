import {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Profile from './settingsComponent/Profile';
import Notification from './settingsComponent/Notification';
import Privacy from './settingsComponent/Privacy';
import Theme from './settingsComponent/Theme';

import {MainContext} from "../MainContext";



const Settings = ({navigation}) => {
  const mainObject = useContext(MainContext);
  const [NEW_URL_SERVER, setNEW_URL_SERVER] = useState("");

  const MyButton = (onPress, text) => {
    return (
      <TouchableOpacity onPress={() => {onPress()}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const saveURL = () => {
    console.log("URL_SERVER: ", NEW_URL_SERVER)
    mainObject.setURL_SERVER(NEW_URL_SERVER);
  }

  return (
    <View style={{padding: 5}}>
      <Text style={styles.normalText}>Адрес сервера:</Text>
      <TextInput 
        editable
        maxLength={500}
        placeholder={'http://192.168.241.190:80/'}
        onChangeText={text => setNEW_URL_SERVER(text)}
        value={NEW_URL_SERVER}
        style={styles.textInput}
      />
      {MyButton(saveURL, "Сохранить")}
    </View>
  );
};

const styles = StyleSheet.create({
  normalText: {
    fontSize: 13,
    color: "black",
  },
  settingsList: {
      flex: 1,
      flexDirection: 'column'
  },
  textInput: {
    padding: 5,
    paddingLeft: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    color: 'black', 
    width: '80%', 
    borderRadius: 10,
    borderWidth: 2,
  },
  button: {backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: 5, padding: 5, borderRadius: 14},
  buttonText: {textAlign: 'center', color: "black"},
  
});

export default Settings;