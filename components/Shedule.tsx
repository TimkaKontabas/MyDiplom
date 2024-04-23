import {View, FlatList, Text, StyleSheet} from 'react-native';

const dataShedule = [
    {
        day: 1,
        tasks: [
            {
                id: 1,
                name: "Подготовить документацию по диплому"
            },
            {
                id: 2,
                name: "Сделать страницу профиля"
            },
            {
                id: 3,
                name: "Расширить расписание"
            },
        ]
    },
    {
        day: 2,
        tasks: [
            {
                id: 1,
                name: "Добавить элементы в настройки"
            },
            {
                id: 2,
                name: "Повысить производительность приложения"
            },
            {
                id: 3,
                name: "Сесть за курсовую"
            },
        ]
    },
    {
        day: 3,
        tasks: [
            {
                id: 1,
                name: "Добавить элементы в настройки"
            },
            {
                id: 2,
                name: "Повысить производительность приложения"
            },
            {
                id: 3,
                name: "Сесть за курсовую"
            },
        ]
    },
    {
        day: 4,
        tasks: [
            {
                id: 1,
                name: "Добавить элементы в настройки"
            },
            {
                id: 2,
                name: "Повысить производительность приложения"
            },
            {
                id: 3,
                name: "Сесть за курсовую"
            },
        ]
    },
    {
        day: 5,
        tasks: [
            {
                id: 1,
                name: "Добавить элементы в настройки"
            },
            {
                id: 2,
                name: "Повысить производительность приложения"
            },
            {
                id: 3,
                name: "Сесть за курсовую"
            },
        ]
    },
    {
        day: 6,
        tasks: [
            {
                id: 1,
                name: "Добавить элементы в настройки"
            },
            {
                id: 2,
                name: "Повысить производительность приложения"
            },
            {
                id: 3,
                name: "Сесть за курсовую"
            },
        ]
    }
]

const Shedule = () => {
    return (
      <SheduleList data={dataShedule} />
    );
};

const SheduleList = (data) => {
    return (
      <FlatList style={styles.sheduleList}
        data={data.data}
        renderItem={({item}) => <DayShedule dayData={item}/>}
      />
    );
};

const DayShedule = ({dayData}) => {
    return (
      <FlatList style={styles.sheduleItem}
        data={dayData.tasks}
        renderItem={({item}) => <TaskShedule task={item}/>}
      />
    );
};

const TaskShedule = ({task}) => {
    return (
      <View style={styles.taskShedule}>
        <Text style={styles.normalText}>{task.id}</Text>
        <Text style={styles.normalText}>{task.name}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  sheduleList: {
    flex: 1,
    flexDirection: 'column'
  },
  taskShedule: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  sheduleItem: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  normalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Shedule;
