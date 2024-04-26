import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import {MainContext} from "../MainContext";


const TaskScreen = ({navigation}) => {
  const mainObject = useContext(MainContext);
  const task = mainObject.getTask();

  const [selected, setSelected] = useState('');

  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        if (task) {
          setSelected(task.deadline);
        }
      });
      return unsubscribe;
    }, [navigation]);

  return (
    <View>
      <Text>{mainObject.scheduleData}</Text>
    </View>

  if (!task)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.normalText}>Это задания</Text>
      </View>
    );
  else
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.normalText}>{task.name}</Text>
        <Calendar style={styles.calendar}
          initialDate={task.deadline}
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true, 
              disableTouchEvent: true, 
              selectedColor: 'blue', 
              selectedTextColor: 'white'
            },
          }}
        />
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

export default TaskScreen;
