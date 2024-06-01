import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {BarChart} from "react-native-gifted-charts";

import {MainContext} from "../MainContext";


const TaskScreen = ({navigation}) => {
  const [countRequestsAll, setCountRequestsAll] = useState(2856);
  const [countRequestsDay, setCountRequestsDay] = useState(514);
  const [countRequestsHour, setCountRequestsHour] = useState(72);
  const [sizeBD, setSizeBD] = useState("156.3 KB");
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

  const saveBackupBD = () => {

  }

  const barData = [
    {
      value: 156,
      label: '16',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    },
    {
      value: 180,
      label: '17',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    },
    {
      value: 40,
      label: '18',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    },
    {
      value: 55,
      label: '19',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    },
    {
      value: 72,
      label: '20',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    }
  ]

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
        
      </View>
      

    </View>
  );
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