import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import Shedule from './components/Shedule';
import Settings from './components/Settings';
import TaskScreen from './components/TaskScreen';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
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
  );
};

export default App;