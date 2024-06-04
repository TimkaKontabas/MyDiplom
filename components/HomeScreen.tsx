import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, Text, FlatList, Image, StyleSheet, SectionList} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import {MainContext} from "../MainContext";
import {getServerData} from './ServerAPI';

// «»
const DATA = [
  {
    title: "О программе",
    data: ["Программа разработана в рамках дипломной работы учащимся 431 группы Конторваевым Тимуром Сериковичем"]
  },
  {
    title: "Инструкция",
    data: [
      "Для того чтобы выполнять какие-либо действия в программе Вам необходимо авторизоваться на вкладке «Профиль».",
      "Вкладка «Настройки» предназначена для изменения адреса сервера.",
      "Вкладка «Результаты» показывает итоговые оценки учащегося.",
      "Вкладка «Расписание» показывает расписание преподавателя или учащегося. Учащийся может нажать на дисциплину и посмотреть свои результаты по ней.",
      "Вкладка «Выставление» позволяет преподавателю выставлять оценки.",
      "Вкладка «Статистика» показывает администратору статистику использования сервера и базы данных.",
    ]
  },
  {
    title: "Ошибки",
    data: [
      "В случае ошибки «Ошибка загрузки: TypeError: Network request failed» проверьте подключение к сети интернет. Также Вы можете связаться с администратором чтобы уточнить адрес сервера и при необходимости заменить его.",
    ]
  },
]

const SectItem = ({item}) => {
  return (
  <View style={styles.itemContainer}>
    <Text style={styles.normalText}>{item}</Text>
  </View>
  )
}

const SectHeader = ({section: {title}}) => {
  return (
  <Text style={styles.title}>{title}</Text>
  )
}

const HomeScreen = ({navigation}) => {
    
    return (
      <View style={styles.mainContainer}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={SectItem}
          renderSectionHeader={SectHeader}
        />     
      </View>
    );
  };
const styles = StyleSheet.create({
  mainContainer: {
    padding: 5
  },
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
  itemContainer: {
    padding: 5,
  },
})

export default HomeScreen;