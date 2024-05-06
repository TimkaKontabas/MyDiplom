import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import Schedule from './components/Schedule';
import Settings from './components/Settings';
import TaskScreen from './components/TaskScreen';
import GradingScreen from './components/GradingScreen';

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
  const getName = () => { return name};
  const [email, setEmail] = useState("");
  const getEmail = () => { return email};
  const [task, setTask] = useState(null);
  const getTask = () => { return task};

  let mainObject = {
    setName, getName, setEmail, getEmail, setTask, getTask
  };

  return (
    <MainContext.Provider value={mainObject}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{headerShown: false}}
        >
          <Tab.Screen
            name="Главная"
            component={HomeScreen}
          />
          <Tab.Screen
            name="Задания"
            component={TaskScreen}
            options={{tabBarButton: () => null}}
          />
          <Tab.Screen
            name="Выставление"
            component={GradingScreen}
          />
          <Tab.Screen
            name="Расписание"
            component={Schedule}
          />
          <Tab.Screen
            name="Настройки"
            component={Settings}
          />
          <Tab.Screen
            name="Профиль"
            component={ProfileScreen}
            options={{tabBarButton: () => null}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MainContext.Provider>
  );
};

export default App;