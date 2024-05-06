import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper,Col, Row, Rows, Cols, Cell } from 'react-native-table-component';
import {MainContext} from "../MainContext";

const day_of_week = {
  0: "Понедельник",
  1: "Вторник",
  2: "Среда",
  3: "Четверг",
  4: "Пятница",
  5: "Суббота",
  6: "Воскресенье"
}

export default ScheduleTable = (data) => {
  const mainObject = useContext(MainContext);

	const DisciplineCell = (discipline, teacher) => {
		return (
			<TouchableOpacity onPress={() => {
				mainObject.setDiscipline({discipline, teacher})
				mainObject.setIsPaintDiscipline(true);
			}}>
	      <View style={styles.button}>
	        <Text style={styles.buttonText}>{discipline.name}</Text>
	      </View>
	    </TouchableOpacity>
		)
	}
	
	const valueToLabel = [
	  "",
	  "Н",
	  "2",
	  "3",
	  "4",
	  "5",
	]

	const tableElement = (day_name, date, row_data) => {
		let tableData = [];
		row_data.map(
	    function(lesson) {
	      tableData.push([lesson.cabinet, DisciplineCell(lesson.discipline, lesson.teacher), lesson.teacher.FIO, valueToLabel[lesson.score]])
	    }
	  )
		return (
			<Table style={styles.tableData} borderStyle={{borderColor: '#000', borderWidth: 1}}>
				<Row data={[day_of_week[day_name] + " " + date]} flexArr={[1, 2, 3, 1]} style={styles.title} textStyle={styles.titleText}></Row>
				<Rows data={tableData} flexArr={[1, 2, 3, 1]} textStyle={styles.text}/>
			</Table>
		)
	}

  const RenderDays = () => {
    return data.data.map(
      function(day) {
        return (
        	<View key={day.name}>
            {tableElement(day.name, day.date, day.lessons)}
          </View>
        )
      }
    )
  }
	const tableTitle = ["Кабинет", "Дисциплина", "Преподаватель", "Оценка"];
	return (
	  <View style={[styles.container, styles.mainColor]}>
	  	<Table style={styles.mainColor}>
        <Row data={tableTitle} flexArr={[3, 3, 4, 2]} style={styles.title} textStyle={styles.titleText}></Row>
      </Table>
      <ScrollView>
        {RenderDays()}
	    </ScrollView>
	  </View>
	)
}

const styles = StyleSheet.create({
  container: { padding: 5, paddingBottom: '25%', flexDirection: 'column', height: '100%' },
  tableData: {flexDirection: 'column', backgroundColor: '#f7e3a7'},
  title: { height: 40 },
  titleText: {textAlign:'center', color: "black" },
  text: { textAlign: 'center', color: "black" },
  mainColor: {backgroundColor: '#f7e3a7'},
  button: {},
  buttonText: {textAlign: 'center', color: "black"},
});