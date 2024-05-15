import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

import {MainContext} from "../MainContext";


const TaskScreen = ({navigation}) => {

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.normalText}>Тут формирование групп</Text>
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