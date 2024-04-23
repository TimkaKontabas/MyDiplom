import {useEffect, useContext} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Profile from './settingsComponent/Profile';
import Notification from './settingsComponent/Notification';
import Privacy from './settingsComponent/Privacy';
import Theme from './settingsComponent/Theme';


import {MainContext} from "../MainContext";

const settingsData = [
  {
    id: "1",
    name: "Профиль",
    component: Profile
  },
  {
    id: "2",
    name: "Уведомления",
    component: Notification
  },
  {
    id: "3",
    name: "Приватность",
    component: Privacy
  },
  {
    id: "4",
    name: "Тема",
    component: Theme
  },
]

const Settings = ({navigation}) => {
  const mainObject = useContext(MainContext);

    return (
      <FlatList style={styles.settingsList}
        data={settingsData}
        renderItem={({item}) => <item.component navigation={navigation} />}
        keyExtractor={item => item.id}
        />
    );
};

const styles = StyleSheet.create({
    normalText: {
        fontSize: 20
    },
    settingsList: {
        flex: 1,
        flexDirection: 'column'
    }
});

export default Settings;