import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, Text, FlatList, Image, StyleSheet, SectionList} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import {MainContext} from "../MainContext";
import {getServerData} from './ServerAPI';


const DATA = [
  {
    title: "О программе",
    data: ["все норм", "ыва"]
  },
  {
    title: "Об авторе",
    data: ["все норм", "ыва"]
  },
  {
    title: "Инструкция",
    data: ["все норм", "ыва"]
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