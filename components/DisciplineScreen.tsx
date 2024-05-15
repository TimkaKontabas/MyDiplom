import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

import {MainContext} from "../MainContext";
import {getServerData} from './ServerAPI';


export default DisciplineScreen = ({navigation, discipline}) => {
  const mainObject = useContext(MainContext);
  const [disciplineData, setDisciplineData] = useState([]);
  const [isPaint, setIsPaint] = useState(false);
  const [errorText, setErrorText] = useState("Данные загружаются, здесь должна быть гифка загрузки");
  const [disciplineNeedUpdate, setDisciplineNeedUpdate] = useState(true);

  const onError = (error) => {
    setErrorText('Ошибка загрузки: ' + error);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDisciplineNeedUpdate(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (disciplineData.count_lessons_in_discipline)
      setIsPaint(true);
  }, [disciplineData]);

  getServerData(
    disciplineNeedUpdate, setDisciplineNeedUpdate, 
    setDisciplineData, 'DisciplineData', onError, 
    {discipline_id: discipline.discipline.id, student_id: mainObject.getUserID()}
  );

  const passedLessonessonElement = (lesson) => {
  	return (
  		<View style={{marginTop: 16}}>
  			<Text style={styles.normalText}>Дата: {lesson.date}, пара: {lesson.nomer }</Text>
  			<Text style={styles.normalText}>Оценка: {lesson.score}</Text>
			</View>
  	)
  }

  const RenderLessonsPassed = () => {
    return disciplineData.lessons_passed.map(
      function(lesson) {
        return (
        	<View key={lesson.id}>
            {passedLessonessonElement(lesson)}
          </View>
        )
      }
    )
  }

  const Square = (color, id) => {
    return (
      <View key={id} style={{backgroundColor: {color}}}>
        <Text> 1</Text>
      </View>
    )
  }

  const RenderLessonsProgress = () => {
    return (
      <View style={styles.centerContainer}>
        <Progress.Bar 
          progress={disciplineData.count_lessons_passed/disciplineData.count_lessons_in_discipline}
          width={200}
          height={20}
        />
        <Text style={styles.normalText}> {disciplineData.count_lessons_passed} из {disciplineData.count_lessons_in_discipline}</Text>
      </View>
    )
  }
  const buttonBack = () => {
    return (
      <TouchableOpacity onPress={() => {
        mainObject.setIsPaintDiscipline(false);
      }}>
        <View style={styles.button}>
          <Text style={[styles.buttonText]}>Назад</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const head = () => {
    return (
      <View style={[styles.rowContainer, {padding: 10, marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.3)'}]}>
        {buttonBack()}
        <Text style={[styles.normalText, {fontSize: 16}]}>{discipline.discipline.name}</Text>
      </View>
    )
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
  const teacherHandler = () => {
    console.log(123);
  }

  if (isPaint) {
		return (
			<View style={styles.mainContainer}>

        {head()}

				{MyButton(teacherHandler, discipline.teacher.FIO)}

        {RenderLessonsProgress()}

				<Text style={styles.normalText}>Осталось пар: {disciplineData.count_lessons_left}</Text>
				<Text style={styles.normalText}>Средняя оценка студента: {disciplineData.AVG_score_student}</Text>
				{RenderLessonsPassed()}
			</View>
		)
	}
	else
		return (
			<View style={styles.mainContainer}>

        {buttonBack()}
        
				<Text style={styles.normalText}>{errorText}</Text>
			</View>
		)
}


const styles = StyleSheet.create({
	mainContainer: { height: '100%', backgroundColor: '#10f0aa', paddingLeft: 5},
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
  square: {
    minWidth: 20,
    minHeught: 20,
  },
  
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    padding: 5, 
    paddingLeft: 10, 
    paddingRight: 10, 
    borderRadius: 14,
    minWidth: 74,
    marginRight: 5,
  },
  buttonText: {textAlign: 'center', color: "black"},
  centerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    paddingTop: 10,
  },
});