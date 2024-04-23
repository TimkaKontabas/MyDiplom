import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, Text, FlatList, Image, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import {
  URL_SERVER
} from '@env';
console.log(URL_SERVER);
import {MainContext} from "../MainContext";


const getServerData = (needUpdate, setNeedUpdate, setData, path) =>  {
  if (needUpdate[path])
  fetch(URL_SERVER + path, {
    method: 'Get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    setData(data);
    console.log(data);
    console.log(needUpdate, "bef");
    needUpdate[path] = false;
    console.log(needUpdate, "aft");
    setNeedUpdate(needUpdate);
  });
}

const HomeScreen = ({navigation}) => {
    const [selected, setSelected] = useState('');
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(
      { 
        "getData/UserLiders": true,
        "getData/Task": true,
      }
    );

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setNeedUpdate({ 
          "getData/UserLiders": true,
          "getData/Task": true,
        });
      });
      return unsubscribe;
    }, [navigation]);

    getServerData(needUpdate, setNeedUpdate, setUsers, "getData/UserLiders");
    getServerData(needUpdate, setNeedUpdate, setTasks, "getData/Task");


    return (
      <View style={styles.mainContainer}>
        <Calendar style={styles.calendar}
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'blue', selectedTextColor: 'white'},
          }}
        />

        <View style={styles.dopContainer}>
          <FlatList style={styles.taskList}
            data={tasks}
            renderItem={({item}) => <TaskItem task={item} navigation={navigation} />}
          />
          <FlatList style={styles.userList}
            data={users}
            renderItem={({item}) => <UserItem user={item}/>}
          />
        </View>
        
      </View>
    );
  };

const TaskItem = ({task, navigation}) => {
  const mainObject = useContext(MainContext);

  const openTask = () => {
    console.log(mainObject.task);
    mainObject.setTask(task);
    navigation.navigate('Задания');
  };

  return (
    <View style={styles.taskItem}>
      <Pressable onPress={openTask}>
        <Text style={styles.normalText}>{task.name}</Text>
      </Pressable>
    </View>
  );
};

const UserItem = ({user}) => {
  return (
    <View style={styles.userItem}>
      <Text style={styles.placeInRank}>{user.total_points}</Text>
      <Text style={styles.userName}>{user.name}</Text>
      <Image source={user.avatar ? {uri: user.avatar} : require('../src/image/empty_profile.png')} style={{width: 64, height: 64}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  dopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  taskList: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 5
  },
  taskItem: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  userList: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 5
  },
  userItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  placeInRank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  calendar: {
    width: '100%'
  },
  normalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  }
})

export default HomeScreen;