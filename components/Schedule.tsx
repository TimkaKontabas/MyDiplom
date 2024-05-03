import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {MainContext} from "../MainContext";
import {getServerData} from './getServerData';
import ScheduleTable from './ScheduleTable';
import DisciplineScreen from './DisciplineScreen';


const Schedule = ({navigation}) => {
  const mainObject = useContext(MainContext);
  const [scheduleData, setScheduleData] = useState([]);
  const [isPaint, setIsPaint] = useState(false);
  const [week, setWeek] = useState(0);
  const [errorText, setErrorText] = useState("Данные загружаются, здесь должна быть гифка загрузки");
  const [sheduleNeedUpdate, setSheduleNeedUpdate] = useState(true);
  const [discipline, setDiscipline] = useState({});
  const [isPaintDiscipline, setIsPaintDiscipline] = useState(false);
  mainObject.setDiscipline = setDiscipline;
  mainObject.setIsPaintDiscipline = setIsPaintDiscipline;

  const onError = (error) => {
    setErrorText('Ошибка загрузки: ' + error);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSheduleNeedUpdate(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (scheduleData.length != 0)
      setIsPaint(true);
  }, [scheduleData]);

  getServerData(
    sheduleNeedUpdate, setSheduleNeedUpdate, setScheduleData, 'getData/WeekSchedule', onError
  );

  if (isPaint) {
    if (isPaintDiscipline)
      return (
        <DisciplineScreen navigation={navigation} discipline={discipline} />
      )
    else
      return (
        <View>
          <WeekChanger data={scheduleData} week={week} setWeek={setWeek} />
          <ScheduleTable data={scheduleData[week].days}/>
        </View>
      );
  }
  else
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>{errorText}</Text>
      </View>
    )

};

const WeekChanger = ({data, week, setWeek}) => {

  const handlerChangeWeek = (value) => {
    let newValue = week + value;
    if (newValue > -1 && newValue < 2)
      setWeek(newValue);
  }

  const buttonChangeWeek = (value) => {
    return (
      <TouchableOpacity onPress={() => handlerChangeWeek(value)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{value > 0 ? '>' : '<'}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  // Я конечно задумывался над чистотой кода, но это сильнее меня, простите

  return (
    <View style={[styles.weekChangerContainer, styles.centralText]}>
      {buttonChangeWeek(-1)}
      <Text style={styles.buttonText}>{data[week].name_week}</Text>
      {buttonChangeWeek(1)}
    </View>
  )
};

const ScheduleList = ({data, week}) => {
  const RenderDays = () => {
    return data[week].days.map(
      function(name, date, lessons) {
        return (
          <View key={date}>
            <DaySchedule data={name}/>
          </View>
        )
      }
    )
  }
  return (
    <View>
      {RenderDays()}
    </View>
  )
};


const styles = StyleSheet.create({
  weekChangerContainer: {
    paddingTop: 5,
    justifyContent: 'space-around',
    backgroundColor: '#f7e3a7', 
    flexDirection: 'row'
  },
  centralText: {
    textAlign: 'center'
  },
  button: {
    padding: 7,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff9',
    borderRadius: 10,
  },
  buttonText: {textAlign: 'center', color: "black"},
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  day_of_week: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black"
  },
  columnContainer: {
    flexDirection: 'column'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  score: {
    fontSize: 15,
    color: 'red'
  },
  sheduleList: {
    flex: 1,
    flexDirection: 'column'
  },
  taskSchedule: {
    flexDirection: 'column',
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
    fontSize: 13,
    color: "black",
  },
});

export default Schedule;