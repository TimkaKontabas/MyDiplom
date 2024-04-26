import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, FlatList, Text, StyleSheet} from 'react-native';

import {MainContext} from "../MainContext";
import {getServerData} from './getServerData';


const Schedule = ({navigation}) => {
  const mainObject = useContext(MainContext);
  const [scheduleData, setScheduleData] = useState([]);
  const [isPaint, setIsPaint] = useState(false);
  const [week, setWeek] = useState(0);
  const [needUpdate, setNeedUpdate] = useState(
    { 
      "getData/WeekSchedule": true
    }
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNeedUpdate({ 
        "getData/WeekSchedule": true
      });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    mainObject.scheduleData = JSON.stringify(scheduleData);
    setIsPaint(true);
  }, [scheduleData]);

  getServerData(needUpdate, setNeedUpdate, setScheduleData, "getData/WeekSchedule");

  if (isPaint)
    return (
      <View>
        <WeekChanger data={scheduleData} week={week}/>
        <ScheduleList data={scheduleData} week={week}/>
      </View>
    );
  else
    return (
      <View>
        <Text>123342</Text>
      </View>
    )

};

const WeekChanger = ({data, week}) => {
  return (
    <View>
      <Text style={styles.normalText}>{data.name}</Text>
    </View>
  )
};

const ScheduleList = (data, week) => {
  return (
    <FlatList style={styles.sheduleList}
      data={data.days}
      renderItem={({item}) => <DaySchedule dayData={item}/>}
    />
  );
};

const DaySchedule = (dayData) => {
  return (
    <View>
      <View>
        <Text>{dayData.name}</Text>
        <Text>{dayData.date}</Text>
      </View>
      <FlatList style={styles.scheduleItem}
        data={dayData.lessons}
        renderItem={({item}) => <TaskSchedule lesson={item}/>}
      />
    </View>
  );
};

const TaskSchedule = (lesson) => {
  return (
    <View style={styles.taskSchedule}>
      <Text style={styles.normalText}>{lesson.lesson_nomer}</Text>
      <Text style={styles.normalText}>{lesson.discipline.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sheduleList: {
    flex: 1,
    flexDirection: 'column'
  },
  taskSchedule: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  scheduleItem: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  normalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Schedule;
