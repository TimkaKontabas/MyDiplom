import * as React from 'react';
import { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import Shedule from './components/Shedule';
import Settings from './components/Settings';
import TaskScreen from './components/TaskScreen';

import {MainContext} from './MainContext';


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
        screenOptions={{headerShown: false}}>
          <Tab.Screen
            name="Главная"
            component={HomeScreen}
          />
          <Tab.Screen
            name="Задания"
            component={TaskScreen}
          />
          <Tab.Screen
            name="Расписание"
            component={Shedule}
          />
          <Tab.Screen
            name="Настройки"
            component={Settings}
          />
          <Tab.Screen
            name="Профиль"
            component={ProfileScreen}
            options={{tabBarButton: () => null, headerShown: false}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MainContext.Provider>
  );
};

export default App;