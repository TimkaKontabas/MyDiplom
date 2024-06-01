import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import {getServerData} from './ServerAPI';
import {MainContext} from "../MainContext";


const TeacherSchedule = ({navigation}) => {
  const mainObject = useContext(MainContext);

  const [errorText, setErrorText] = useState("Данные загружаются, здесь должна быть гифка загрузки");
  const [sheduleNeedUpdate, setSheduleNeedUpdate] = useState(true);
  const [isPaint, setIsPaint] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  getServerData(
    sheduleNeedUpdate, setSheduleNeedUpdate,
    setScheduleData, 'TeacherSchedule'
  );

  const onError = (error) => {
    setErrorText('Ошибка загрузки: ' + error);
  }

  useEffect(() => {
    if (scheduleData.length != 0) {
      setIsPaint(true);
    }
  }, [scheduleData]);

  if (isPaint) {
    return (
      <View style={{padding: 10}}>
        <Text style={styles.normalText}>Расписание учителя</Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>{errorText}</Text>
      </View>
    )
  }
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

export default TeacherSchedule;