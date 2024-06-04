import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import {BarChart} from "react-native-gifted-charts";

import {getServerData, sendServerData} from './ServerAPI';
import {MainContext} from "../MainContext";


const MyBar = ({barData}) => {
  return (
    <View>
      <BarChart
        showFractionalValue
        showYAxisIndices
        hideRules
        noOfSections={5}
        xAxisLabelTextStyle={{color: 'black'}}
        yAxisTextStyle={{color: 'black'}}
        maxValue={500}
        data={barData}
        barWidth={40}
        sideWidth={15}
        side="right"
      />
    </View>
  )
}


const TaskScreen = ({navigation}) => {
  const mainObject = useContext(MainContext);
  const [countRequestsAll, setCountRequestsAll] = useState(0);
  const [countRequestsDay, setCountRequestsDay] = useState(0);
  const [countRequestsHour, setCountRequestsHour] = useState(0);
  const [sizeBD, setSizeBD] = useState("");

  const [barData, setBarData] = useState([]);
  const [barNeedUpdate, setBarNeedUpdate] = useState(true);
  const [reqData, setReqData] = useState({});
  const [reqNeedUpdate, setReqNeedUpdate] = useState(true);
  const [isPaint, setIsPaint] = useState(false);
  const [errorText, setErrorText] = useState("Данные загружаются, здесь должна быть гифка загрузки");
  const [dateBackup, setDateBackup] = useState("2024-05-26 18:41");

  const MyButton = (onPress, text) => {
    return (
      <TouchableOpacity onPress={() => {onPress()}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  getServerData(
    reqNeedUpdate, setReqNeedUpdate, setReqData, 'Stats', onError
  );

  useEffect(() => {
    setCountRequestsAll(reqData.main);
    setCountRequestsDay(reqData.today);
    setCountRequestsHour(reqData.hour);
    setBarData(reqData.barData);
    console.log(reqData.barData);
    setSizeBD(reqData.size);
    setDateBackup(reqData.dateBackup);
    setIsPaint(true);
  }, [reqData]);

  const onError = (error) => {
    setErrorText('Ошибка загрузки: ' + error);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setReqNeedUpdate(true);
      setErrorText("Данные загружаются, здесь должна быть гифка загрузки");
    });
    return unsubscribe;
  }, [navigation]);

  const saveBackupBD = () => {
    sendServerData(
      "SaveBakupDB",
      {a:1},
      (response) => {
        setReqNeedUpdate(true); 
        Alert.alert(response[0], response[1]);
      },
      ({response}) => {},
      mainObject
    )
  }

  
  if (isPaint)
  return (
    <View style={styles.container}>
      <Text style={styles.normalText}>Количество запросов к серверу всего: {countRequestsAll}</Text>
      <Text style={styles.normalText}>Количество запросов к серверу за сегодня: {countRequestsDay}</Text>
      <Text style={styles.normalText}>Количество запросов к серверу за последний час: {countRequestsHour}</Text>
      <Text style={styles.normalText}>Вес базы данных: {sizeBD}</Text>
      <Text style={styles.normalText}>Дата последней резервной копии: {dateBackup}</Text>
      <Text style={styles.normalText}></Text>
      {MyButton(saveBackupBD, "Сделать резервное сохранение БД")}

      <View style={{marginTop: 20, marginLeft: 25}}>
      <Text style={styles.normalText}>Статистика запросов за последние пять часов</Text>
      <MyBar barData={barData}/>
        
      </View>
      

    </View>
  );
  else
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>{errorText}</Text>
      </View>
    )
  
};


const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  normalText: {
    fontSize: 13,
    color: "black",
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    padding: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    borderRadius: 14,
    minWidth: 74,
  },
  buttonText: {textAlign: 'center', color: "black"},
})

export default TaskScreen;