import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
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
  const [isPaint, setIsPaint] = useState(true);
  const [errorText, setErrorText] = useState("Данные загружаются, здесь должна быть гифка загрузки");
  const [gradingNeedUpdate, setGradingNeedUpdate] = useState(false);
  const [head, setHead] = useState([]);
  const [FIOStudents, setFIOStudents] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [isChangedTableData, setIsChangedTableData] = useState(false);
  const [sendingData, setSendingData] = useState([]);

  const [disciplineID, setDisciplineID] = useState(0);
  const [gradingGroupNomer, setGradingGroupNomer] = useState(0);

  const [lessonID, setLessonID] = useState(0);
  const [lessonsID, setLessonsID] = useState([]);
  const [lessonIDNeedUpdate, setLessonIDNeedUpdate] = useState(true);

  const [disciplines, setDisciplines] = useState([]);
  const [disciplinesNeedUpdate, setDisciplinesNeedUpdate] = useState(true);

  const [isPaintTable, setIsPaintTable] = useState(false);
  const [isPaintItog, setIsPaintItog] = useState(false);

  const [myItogs, setItogs] = useState([]);
  const [myItogsNeedUpdate, setItogsNeedUpdate] = useState(false);

  const [groups, setGroups] = useState([]);
  const [groupsNeedUpdate, setGroupsNeedUpdate] = useState(true);

  const [sendingItogData, setSendingItogData] = useState({});

  const getSendingData = () => {return sendingData};

  const onError = (error ) => {
    setErrorText('Ошибка загрузки: ' + error);
  }

  const getTable = () => {
    setGradingNeedUpdate(true);
    setIsPaintItog(false);
  }

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setGradingNeedUpdate(true);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const sendData = () => {
    if (isPaintTable)
      sendServerData(
        "GradingData",
        [disciplineID, gradingGroupNomer, sendingData],
        (response) => {
          Alert.alert(response[0], response[1]);
        },
        ({response}) => {},
        mainObject
      );
    else
      sendServerData(
        "UpdateItog",
        [disciplineID, sendingItogData],
        (response) => {
          Alert.alert(response[1], response[0]);
        },
        ({response}) => {},
        mainObject
      );
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
    console.log(gradingData);
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

      setIsPaintTable(true);

      setSendingData([]);

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

  useEffect(() => {
    if (disciplines[0])
      setDisciplineID(disciplines[0].id);
  }, [disciplines]);

  useEffect(() => {
    if (groups[0])
      setGradingGroupNomer(groups[0][0]);
  }, [groups]);

  useEffect(() => {
    setLessonIDNeedUpdate(true);
  }, [gradingGroupNomer]);

  useEffect(() => {
    console.log(myItogs, 1919191919);
    if (myItogs.length != 0)
      setIsPaintItog(true);
  }, [myItogs]);


  getServerData(
    groupsNeedUpdate, setGroupsNeedUpdate, 
    setGroups, 'GroupsWithDiscipline', onError, 
    {discipline_id: disciplineID, teacher_id: mainObject.getUserID()}
  );
  
  getServerData(
    gradingNeedUpdate, setGradingNeedUpdate, 
    setGradingData, 'GradingData', onError, 
    {group_id: gradingGroupNomer, discipline_id: disciplineID, lesson_nomer: lessonID}
  );

  getServerData(
    disciplinesNeedUpdate, setDisciplinesNeedUpdate, 
    setDisciplines, 'TeacherDisciplines', onError, 
    {teacher_id: mainObject.getUserID()}
  );

  const handlerClickBtnItog = () => {
    setIsPaintTable(false);
    setItogsNeedUpdate(true);
    setSendingItogData({});
  }

  

  getServerData(
    myItogsNeedUpdate, setItogsNeedUpdate, 
    setItogs, 'ItogGrading', onError, 
    {discipline_id: disciplineID, group_id: gradingGroupNomer}
  );

  getServerData(
    lessonIDNeedUpdate, setLessonIDNeedUpdate, 
    setLessonsID, 'LessonsNomer', onError, 
    {group_id: gradingGroupNomer, discipline_id: disciplineID}
  );

  const scoreCell = (score, studentID, lessonID) => {
    return (
      <CellItem score={score} getSendingData={getSendingData} setSendingData={setSendingData} studentID={studentID} lessonID={lessonID} />
    )
  }

  const MyTable = () => {
    if (isPaintTable)
      return (
        <TableWithHeaders 
          tableHead={head} 
          recordData={recordData}
          tableData={tableData}
          headerHeight={headerHeight}
          leftColumnWidth={leftColumnWidth} />
      );
    else
      return (
        <View></View>
      )
  }

  const RowItog = (data) => {
    const [scoreText, setScoreText] = useState(data[1].toString());
    const onChangeScoreText = (text) => {
      sendingItogData[data[2]] = text;
      setScoreText(text);
      setSendingItogData(sendingItogData);
    }
    return (
      <View style={styles.rowContainer}>
        <Text style={{fontSize: 16, color: 'black', flex:3}}>{data[0]}</Text>
        <TextInput 
          editable
          maxLength={1}
          onChangeText={text => onChangeScoreText(text)}
          value={scoreText}
          style={{fontSize: 16, color: 'black', flex:1}}
        />
      </View>
    )

  }

  const ItogGrading = () => {

    if (isPaintItog){
          console.log(2222, myItogs);
    
          return (
            <ScrollView>
              {myItogs.map(
                function(itog) {
                  return(
                    <View key={itog[0]}>
                      {RowItog(itog)}
                    </View>
                  )
                }
              )}
            </ScrollView> 
          )}
    else
      return (
        <View></View>
      )
  }

  ////////////////////////////
  const headerHeight = 80;
  const leftColumnWidth = 120;
  ////////////////////////////
  const disciplinePickerRef = useRef<Picker>(null);
  const groupPickerRef = useRef<Picker>(null);
  const lessonIDPickerRef = useRef<Picker>(null);

  const handlerChangeDiscipline = (value) => {
    setDisciplineID(value);
    setGradingGroupNomer(0);
    setIsPaintTable(false);
  }
  const getNameDiscipline = () => {
    for (let i=0; i < disciplines.length; i++) {
      if (disciplines[i])
        if (disciplines[i].id == disciplineID)
          return disciplines[i].name;
    }
  }

  const getNomerGroup = () => {
    for (let i=0; i < groups.length; i++) {
      console.log(groups, gradingGroupNomer, "37628374728");
      if (groups[i])
        if (groups[i][0] == gradingGroupNomer)
          return groups[i][1];
    }
  }

  const getLessonName = () => {
    for (let i=0; i < lessonsID.length; i++) {
      if (lessonsID[i])
        if (lessonsID[i][1] == lessonID)
          return lessonsID[i][0] + " занятие " + lessonsID[i][1];
    }
  }

  const handlerChangeGroupNomer = (value) => {
    setGradingGroupNomer(value);
    setLessonIDNeedUpdate(true);
  } 

  if (isPaint) {
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.columnContainer, {marginBottom: 10}]} >
          <View style={[styles.rowContainer, {marginBottom: 10}]}>
          <View style={{widht:50, height: 50, flexDirection: 'row' }}>
            <Picker
              ref={disciplinePickerRef}
              selectedValue={disciplineID}
              mode={"dropdown"}
              onValueChange={handlerChangeDiscipline}
              style={{ display: null }}
            >
              {disciplines.map(
                function({id, name}) {
                  return(
                    <Picker.Item key={id} label={name} value={id} />
                  )
                }
              )}
            </Picker>

            <TouchableOpacity onPress={() => {disciplinePickerRef.current.focus()}}>
              <View style={{padding: 5, borderRadius: 14,}}>
                <Text style={{color: 'black', width: 50, height: 50, textAlign: 'center' }}>{getNameDiscipline()}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{widht:50, height: 50, flexDirection: 'row' }}>
            <Picker
              ref={groupPickerRef}
              selectedValue={gradingGroupNomer}
              mode={"dropdown"}
              onValueChange={handlerChangeGroupNomer}
              style={{ display: null }}
            >
              {groups.map(
                function(group) {
                  return(
                    <Picker.Item key={group[0]} label={group[1]} value={group[0]} />
                  )
                }
              )}
            </Picker>

            <TouchableOpacity onPress={() => {groupPickerRef.current.focus()}}>
              <View style={{padding: 5, borderRadius: 14}}>
                <Text style={{color: 'black', width: 50, height: 50, textAlign: 'center' }}>{getNomerGroup()}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{widht:70, height: 50, flexDirection: 'row' }}>
            <Picker
              ref={lessonIDPickerRef}
              selectedValue={lessonID}
              mode={"dropdown"}
              onValueChange={setLessonID}
              style={{ display: null }}
            >
              {lessonsID.map(
                function(lesson) {
                  return(
                    <Picker.Item key={lesson[1]} label={lesson[0] + " занятие " + lesson[1]} value={lesson[1]} />
                  )
                }
              )}
            </Picker>

            <TouchableOpacity onPress={() => {lessonIDPickerRef.current.focus()}}>
              <View style={{padding: 5, borderRadius: 14}}>
                <Text style={{color: 'black', width: 70, height: 50, textAlign: 'center' }}>{getLessonName(lessonID)}</Text>
              </View>
            </TouchableOpacity>
          </View>

          </View>
          <View style={styles.rowContainer}>
            {MyButton(() => {getTable()}, "Запросить")}
            {MyButton(sendData, "Сохранить")}
            {MyButton(handlerClickBtnItog, "Выставить итоговые оценки")}
          </View>
        </View>

        <MyTable />

        <ItogGrading />

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
