import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Table, TableWrapper,Col, Row, Rows, Cols, Cell } from 'react-native-table-component';
import { DropDown } from '@hashiprobr/react-native-paper-dropdown';

import {MainContext} from "../MainContext";
import {getServerData} from './getServerData';
import {sendServerData} from './sendServerData';


const CellItem = ({score, addTableData, nomer_lesson, student_id}) => {

    const dropData = [
      {label: "", value: 0},
      {label: "Н", value: 1},
      {label: "2", value: 2},
      {label: "3", value: 3},
      {label: "4", value: 4},
      {label: "5", value: 5}
    ];
    // <DropDown
    //   label={"gb"}
    //   mode={'outlined'}
    //   onFocus={() => setIsFocus(true)}
    //   onBlur={() => setIsFocus(false)}
    //   value={value}
    //   onChangeValue={setValue}
    //   list={dropData}
    // />
    if (!score)
      score = "";
    const [value, setValue] = useState(String(score));
    const handlerChange = (text) => {
      if (text)
        addTableData({
          value: text,
          nomer_lesson,
          student_id
        });
      setValue(text);
    }

    return (
      <View>
        <TextInput editable value={value} onChangeText={handlerChange} keyboardType="numeric"/>
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
  const [colsData, setColsData] = useState([]);
  const [tableData, setTableData] = useState([]);

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
    sendServerData("sendData/Grading", tableData);
  }

  const saveButton = () => {
    return (
      <TouchableOpacity onPress={() => {sendData()}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    if (gradingData.scores && gradingData.scores.length) {
      newHead = gradingData.nomer_lessons;
      if (typeof(newHead[0]) == 'number'){ 
        newHead.unshift(saveButton());
        setHead(newHead);
      }
      let newFIOStudents = [];
      gradingData.students.map(
        function(student) {
          newFIOStudents.push(student.FIO);
        }
      )
      let scoreCols = [];
      let index_nomer_lessons = 0;
      gradingData.scores.map(
        function(scoreList) {
          let scoreCells = [];
          let i = 0;
          scoreList.map(
            function(score) {
              // scoreCells.push(scoreCell(score, gradingData.nomer_lessons[index_nomer_lessons], gradingData.students[i].id));
              scoreCells.push(score);

              i++;
            }
          );
          scoreCols.push(scoreCells);
          index_nomer_lessons++;
        }
      )
      let union = [... new Set([...newFIOStudents, ...scoreCols])];
      setColsData(union);
      setIsPaint(true);

    }
  }, [gradingData]);

  getServerData(
    gradingNeedUpdate, setGradingNeedUpdate, 
    setGradingData, 'getData/GradingData', onError, 
    {group_id: 1, discipline_id: 7}
  );
  // const [isFocus, setIsFocus] = useState(false);

  const addTableData = (data) => {
    console.log(data);
    console.log(tableData);
    setTableData([... new Set([tableData, [data]])]);
  }

  const scoreCell = (score, nomer_lesson, student_id) => {
    return (
      <View>
        <CellItem score={score} addTableData={addTableData} nomer_lesson={nomer_lesson} student_id={student_id}/>
      </View>
      
    )
  }

  if (isPaint) {
    return (
      <View style={styles.mainContainer}>

        <ScrollView>
          <Table style={styles.tableData} borderStyle={{borderColor: '#000', borderWidth: 1}}>
            <Row data={head} style={styles.title} textStyle={styles.titleText}></Row>
            <Cols data={colsData} textStyle={styles.titleText}></Cols>
            
          </Table>
        </ScrollView>

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
  mainContainer: { height: '100%', backgroundColor: '#34afee', padding: 10},
  mainColor: {backgroundColor: '#34afee'},
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
  button: {},
  buttonText: {textAlign: 'center', color: "black"},
  tableData: {flexDirection: 'column', backgroundColor: '#34afee'},
  title: { height: 40 },
  titleText: {textAlign:'center', color: "black" },
  text: { textAlign: 'center', color: "black" },
  dropdown: { backgroundColor: '#37bcee', color: 'black'},
  dropdownItem: { backgroundColor: '#37bcff', color: 'black', marginTop: 5 },
});