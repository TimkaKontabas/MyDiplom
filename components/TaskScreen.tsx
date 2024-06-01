import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet, FlatList} from 'react-native';

import {MainContext} from "../MainContext";


const RenderDiscipline = function({data}) {
  return (
    <View style={styles.rowContainer}>
      <Text style={[styles.normalText, {flex: 3}]}>{data[0]}</Text>
      <Text style={[styles.normalText, {flex: 2}]}>{data[1]}</Text>
      <Text style={[styles.normalText, {flex: 2}]}>{data[2]}</Text>
    </View>
  )
}

const TaskScreen = ({navigation}) => {
  const mainObject = useContext(MainContext);

  let tableData = [
    ["Дисциплина", "Средняя оценка", "Оценка преподавтеля"],
    ["Русский язык", 4.1, 4],
    ["Литература", 4.2, 4],
    ["Иностранный язык", 3.9, 4],
    ["История", 4.5, 5],
    ["Обществознание", 4.6, 5],
    ["Химия", 4.2, 4],
    ["Биология", 4.3, 5],
    ["Физическая культура", 3.6, 4],
    ["Основы безопасности жизнедеятельности", 4, 4],
    ["Математика", 4.7, 5],
    ["Информатика", 4.8, 5],
    ["Физика", 4.1, 4],
    ["Астрономия", 4.3, 4],
  ];

  
  return (
    <View style={{padding: 10}}>
      <Text style={styles.title}>Результаты учебы</Text>
      <FlatList
        data={tableData}
        renderItem={({item}) => <RenderDiscipline data={item} />}
        keyExtractor={item => item[0]}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tableData: {
    flexDirection: 'column',
    height: '100%'
  },
  text: { textAlign: 'center', color: "black" },
  title: {
    fontSize: 17,
    color: "black",
    textAlign: "center",
    marginBottom: 25
  },
  normalText: {
    fontSize: 15,
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