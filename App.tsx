import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import Schedule from './components/Schedule';
import TeacherSchedule from './components/TeacherSchedule';
import Settings from './components/Settings';
import TaskScreen from './components/TaskScreen';
import GradingScreen from './components/GradingScreen';
import Stats from './components/Stats';

import {MainContext} from './MainContext';


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(155, 90, 100)',
  },
}

const Tab = createBottomTabNavigator();


const App = () => {
  const [name, setName] = useState("");
  const getName = () => { return name };
  const [email, setEmail] = useState("");
  const getEmail = () => { return email };
  const [task, setTask] = useState(null);
  const getTask = () => { return task };

  const [login, setLogin] = useState('');
  const getLogin = () => { return login };
  const [userID, setUserID] = useState('');
  const getUserID = () => { return userID };
  const [userType, setUserType] = useState(0);
  const getUserType = () => { return userType };
  const [userData, setUserData] = useState({});
  const getUserData = () => { return userData };
  const [URL_SERVER, setURL_SERVER] = useState("");
  const getURL_SERVER = () => { return URL_SERVER };

  let mainObject = {
    setName, getName, setEmail, getEmail, 
    setTask, getTask, setLogin, getLogin, 
    setUserID, getUserID, setUserType, getUserType,
    setUserData, getUserData, setURL_SERVER, getURL_SERVER
  };
  const checkUserType = (vals, icon) => {
    if (vals[0] === 0) 
      return {tabBarIcon: ({ color, size }) => (
        <Image source={icon} 
        style={{width: 30, height: 30}}/>
      )}
    return vals.includes(userType) ? {tabBarIcon: ({ color, size }) => (
        <Image source={icon} 
        style={{width: 30, height: 30}}/>
      )} : {
      tabBarButton: () => null,
    }
  }

  return (
    <MainContext.Provider value={mainObject}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
          }}
        >
          <Tab.Screen
            name="Главная"
            component={HomeScreen}
            options={checkUserType([0], require('./src/icons/book.png'))}
          />
          <Tab.Screen
            name="Результаты"
            component={TaskScreen}
            options={checkUserType([1], require('./src/icons/results.png'))}
          />
          <Tab.Screen
            name="Расписание"
            component={Schedule}
            options={checkUserType([1], require('./src/icons/schedule.png'))}
          />
          <Tab.Screen
            name="Выставление"
            component={GradingScreen}
            options={checkUserType([2], require('./src/icons/scores.png'))}
          />
          <Tab.Screen
            name="Расписание "
            component={TeacherSchedule}
            options={checkUserType([2], require('./src/icons/schedule.png'))}
          />
          <Tab.Screen
            name="Статистика"
            component={Stats}
            options={checkUserType([3], require('./src/icons/report.png'))}
          />
          <Tab.Screen
            name="Настройки"
            component={Settings}
            options={checkUserType([0], require('./src/icons/control.png'))}
          />
          <Tab.Screen
            name="Профиль"
            component={ProfileScreen}
            options={checkUserType([0], require('./src/icons/profile.png'))}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MainContext.Provider>
  );
};

export default App;