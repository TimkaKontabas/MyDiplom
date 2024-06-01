import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {MainContext} from "../MainContext";
import LoginScreen from './LoginScreen';
import GoogleSignoutButton from './Buttons/GoogleSignoutButton';


const logout = (mainObject) => {
  mainObject.setUserID('');
  mainObject.setUserType(0);
  mainObject.setLogin('');
  mainObject.setUserData({});
}

const StudentProfile = (userData) => {
  return (
  <View style={styles.mainContainer}>
    <Text style={styles.normalText}>Здравствуйте, {userData.FIO}</Text>
    <Text style={styles.normalText}>Группа {userData.group_id}</Text>   
    <Text style={styles.normalText}>Роль - Ученик</Text> 
  </View>
  )
}

const TeacherProfile = (userData) => {
  return (
  <View style={styles.mainContainer}>
    <Text style={styles.normalText}>Здравствуйте, {userData.FIO}</Text>
    <Text style={styles.normalText}>Роль - Преподаватель</Text>
      
  </View>
  )
}

const AdminProfile = (userData) => {
  return (
  <View style={styles.mainContainer}>
    <Text style={styles.normalText}>Добро пожаловать, Администратор</Text>
      
  </View>
  )
}

const Profile = () => {
  const mainObject = useContext(MainContext);

  const userData = mainObject.getUserData();
  const userType = mainObject.getUserType();
  const [newLogin, setNewLogin] = useState(mainObject.getLogin());
  const [newPassword, setNewPassword] = useState("");

  const ComponentChangeUserData = () => {
    const saveUserAuthData = () => {
      ////////////////////////////////////////////////////////////////////
    }
    return (
      <View style={{marginTop: 15,marginBottom: 15}}>
        <View style={[styles.rowContainer, {marginTop: 15}]}>
          <View style={styles.centerContainer}>
            <Text style={styles.userName}>Логин:</Text>
          </View>
          <TextInput 
            editable
            maxLength={50}
            onChangeText={text => setNewLogin(text)}
            value={newLogin}
            style={styles.textInput}
          />
        </View>
        <View style={[styles.rowContainer, {marginTop: 15}]}>
          <View style={styles.centerContainer}>
            <Text style={styles.userName}>Пароль:</Text>
          </View>
          <TextInput 
            editable
            maxLength={50}
            onChangeText={text => setNewPassword(text)}
            value={newPassword}
            style={styles.textInput}
          />
        </View>
        {MyButton(saveUserAuthData, "Сохранить")}
      </View>
    )
  }

  const MyButton = (onPress, text) => {
    return (
      <TouchableOpacity onPress={() => {onPress(mainObject)}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  let prof = AdminProfile;
  if (userType === 1)
    prof = StudentProfile;
  else if (userType === 2)
    prof = TeacherProfile;
  
  return (
    <View style={{padding: 10}}>
      {prof(userData)}
      {ComponentChangeUserData()}
      {MyButton(logout, "Выйти из аккаунта")}
    </View>
  )
    
};

const ProfileScreen = ({navigation}) => {
  const mainObject = useContext(MainContext);

  const userID = mainObject.getUserID();


  if (userID) 
      return ( <Profile></Profile> );
  else 
      return ( <LoginScreen /> );

};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 5,
    margin: 10,
    borderRadius: 14},
  buttonText: {textAlign: 'center', color: "black"},
  normalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  centerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default ProfileScreen;