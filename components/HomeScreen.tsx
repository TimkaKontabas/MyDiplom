import React, {useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';




const taskData = [
  {
    id: "1",
    name: "Подготовить документацию по диплому",
  },
  {
    id: "2",
    name: "Сделать страницу профиля",
  },
  {
    id: "3",
    name: "Расширить расписание",
  },
  {
    id: "4",
    name: "Добавить элементы в настройки",
  },
  {
    id: "5",
    name: "Повысить производительность приложения",
  },
  {
    id: "6",
    name: "Сесть за курсовую",
  },
]


const getUserList = (setData) =>  {
  fetch("https://functions.yandexcloud.net/d4egm43ahjlblbpdh9un/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        table: "User"
      })
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
    });
}

const HomeScreen = () => {
    const [selected, setSelected] = useState('');
    const [data, setData] = useState([]);

    getUserList(setData);

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
            data={taskData}
            renderItem={({item}) => <TaskItem task={item}/>}
          />
          <FlatList style={styles.userList}
            data={data}
            renderItem={({item}) => <UserItem user={item}/>}
          />
        </View>
        
      </View>
    );
  };

const TaskItem = ({task}) => {
    return (
      <View style={styles.taskItem}>
        <Text style={styles.normalText}>{task.name}</Text>
      </View>
    );
  };

const UserItem = ({user}) => {
    return (
      <View style={styles.userItem}>
        <Text style={styles.placeInRank}>{user.id}</Text>
        <Text style={styles.userName}>{user.name}</Text>
        <Image source={{uri: user.avatar}} style={{width: 64, height: 64}}/>
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