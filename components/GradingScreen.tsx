import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Table, TableWrapper,Col, Row, Rows, Cols, Cell } from 'react-native-table-component';
import {Picker} from '@react-native-picker/picker';

import {MainContext} from "../MainContext";
import {getServerData, sendServerData} from './ServerAPI';
import TableWithHeaders from './TableWithHeaders'


const valueToLabel = [
  "",
  "Н",
  "2",
  "3",
  "4",
  "5",
]

const CellItem = ({score, getSendingData, setSendingData, studentID, lessonID}) => {

  const [value, setValue] = useState(score);
  const pickerRef = useRef<Picker>(null);

  const onValueChange = (itemValue) => {
    console.log(getSendingData());
    console.log(studentID, lessonID, itemValue);
    setValue(itemValue);
    let SD = getSendingData();
    SD.push({studentID, lessonID, itemValue});
    setSendingData(SD);
  }

  return (
    <View style={{widht:50, height: 50, flexDirection: 'row' }}>
      <Picker
        ref={pickerRef}
        selectedValue={value}
        mode={"dropdown"}
        onValueChange={onValueChange}
        style={{ display: null }}
      >
        <Picker.Item label={"Ничего"} value={0} />
        <Picker.Item label={"н"} value={1} />
        <Picker.Item label={"2"} value={2} />
        <Picker.Item label={"3"} value={3} />
        <Picker.Item label={"4"} value={4} />
        <Picker.Item label={"5"} value={5} />
      </Picker>
      <TouchableOpacity onPress={() => {pickerRef.current.focus()}}>
        <View style={styles.button}>
          <Text style={{color: 'black', width: 50, height: 50, textAlign: 'center' }}>{valueToLabel[value]}</Text>
        </View>
      </TouchableOpacity>
      
    </View>
    
  )
}

export default GradingScreen = ({navigation}) => {
  const mainObject = useContext(MainContext);
  const [gradingData, setGradingData] = useState([]);
  const [isPaint, setIsPaint] = useState(false);
  const [errorText, setErrorText] = useState("Данные загружаются, здесь должна быть гифка загрузки");
  const [gradingNeedUpdate, setGradingNeedUpdate] = useState(true);
  const [disciplineID, setDisciplineID] = useState(7);
  const [head, setHead] = useState([]);
  const [FIOStudents, setFIOStudents] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [isChangedTableData, setIsChangedTableData] = useState(false);
  const [sendingData, setSendingData] = useState([]);
  const getSendingData = () => {return sendingData};

  const onError = (error ) => {
    setErrorText('Ошибка загрузки: ' + error);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setGradingNeedUpdate(true);
    });
    return unsubscribe;
  }, [navigation]);

  const sendData = () => {
    sendServerData("GradingData", [disciplineID, sendingData]);
  }

  const MyButton = (onPress, text) => {
    return (
      <TouchableOpacity onPress={() => {onPress()}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    if (gradingData.scores && gradingData.scores.length) {
      
      let newFIOStudents = [];
      gradingData.students.map(
        function(student) {
          newFIOStudents.push(student.FIO);
        }
      )
      setFIOStudents(newFIOStudents);

      setIsChangedTableData(true);

      const newRecordData = [];
      for (let i = 0; i < FIOStudents.length; i += 1) {
        const rowData = [];
        rowData.push(FIOStudents[i]);
        newRecordData.push(rowData);
      }
      setRecordData(newRecordData);

      setIsPaint(true);

    }
  }, [gradingData]);

  useEffect(() => {

    if (isChangedTableData) {
      setHead(gradingData.nomer_lessons);

      let scoreRows = [];
      for (let rowIndex = 0; rowIndex < gradingData.scores[0].length; rowIndex += 1) {
        let scoreCells = [];
        for (let colIndex = 0; colIndex < gradingData.scores.length; colIndex += 1) {
          scoreCells.push(scoreCell(gradingData.scores[colIndex][rowIndex], gradingData.students[rowIndex].id, head[colIndex]));
        }
        scoreRows.push(scoreCells);
      }
      setTableData(scoreRows);
      setIsChangedTableData(false);
    }

  }, [isChangedTableData]);

  getServerData(
    gradingNeedUpdate, setGradingNeedUpdate, 
    setGradingData, 'getData/GradingData', onError, 
    {group_id: 1, discipline_id: 7}
  );

  const scoreCell = (score, studentID, lessonID) => {
    return (
      <CellItem score={score} getSendingData={getSendingData} setSendingData={setSendingData} studentID={studentID} lessonID={lessonID} />
    )
  }

  ////////////////////////////
  const headerHeight = 80;
  const leftColumnWidth = 120;
  ////////////////////////////

  if (isPaint) {
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.rowContainer, {marginBottom: 10}]}>
          <Text>{}</Text>
          {MyButton(sendData, "Сохранить")}
          {MyButton(sendData, "Добавить занятие")}
        </View>

        <TableWithHeaders 
          tableHead={head} 
          recordData={recordData}
          tableData={tableData}
          headerHeight={headerHeight}
          leftColumnWidth={leftColumnWidth} />

      </View>
    )
  }
  else
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.normalText}>{errorText}</Text>
      </View>
    )
}


const styles = StyleSheet.create({
  mainContainer: { height: '100%', backgroundColor: '#e5e5dd', padding: 10},
  mainColor: {backgroundColor: '#e5e5dd'},
  columnContainer: {
    flexDirection: 'column'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  normalText: {
    fontSize: 13,
    color: "black",
  },
  button: {backgroundColor: 'rgba(250, 250, 250, 0.3)', padding: 5, borderRadius: 14},
  buttonText: {textAlign: 'center', color: "black"},
  tableData: {backgroundColor: '#e5e5dd'},
  title: { height: 50 },
  titleText: {textAlign:'center', color: "black", width: 80, height: 50, fontSize: 12 },
  text: { textAlign: 'center', color: "black" },
  dropdown: { backgroundColor: '#37bcee', color: 'black'},
  dropdownItem: { backgroundColor: '#37bcff', color: 'black', marginTop: 5 },
});