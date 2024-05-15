import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable, TouchableOpacity, Text, StyleSheet} from 'react-native';

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
    {discipline_id: discipline.discipline.id, student_id: 153}
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

  const buttonBack = () => {
    return (
      <TouchableOpacity onPress={() => {
        mainObject.setIsPaintDiscipline(false);
      }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Назад</Text>
        </View>
      </TouchableOpacity>
    )
  }

  if (isPaint) {
		return (
			<View style={styles.mainContainer}>

				{buttonBack()}

				<Text style={styles.normalText}>{discipline.discipline.name}</Text>
				<Text style={styles.normalText}>{discipline.teacher.FIO}</Text>
				<Text style={styles.normalText}>Всего пар: {disciplineData.count_lessons_in_discipline}</Text>
				<Text style={styles.normalText}>Прошло пар: {disciplineData.count_lessons_passed}</Text>
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
	mainContainer: { height: '100%', backgroundColor: '#10f0aa', padding: 10},
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
});
