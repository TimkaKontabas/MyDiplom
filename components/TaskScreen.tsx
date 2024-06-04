import React, {useState, useEffect, useContext} from 'react';
import {View, Button, Text, StyleSheet, FlatList} from 'react-native';

import {MainContext} from "../MainContext";
import {getServerData} from './ServerAPI';


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

  const [isPaint, setIsPaint] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [errorText, setErrorText] = useState("Данные загружаются, здесь должна быть гифка загрузки");
  const [NeedUpdate, setNeedUpdate] = useState(true);

  useEffect(() => {
    console.log(tableData);
    if (tableData.length != 0)
      setIsPaint(true);
  }, [tableData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNeedUpdate(true);
    });
    return unsubscribe;
  }, [navigation]);

  const onError = (error) => {
    setErrorText('Ошибка загрузки: ' + error);
  }

  getServerData(
    NeedUpdate, setNeedUpdate, 
    setTableData, 'ResultLearn', onError, 
    [mainObject.getUserID()]
  );

  if (isPaint) {
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
  }
  else
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>{errorText}</Text>
      </View>
    )
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