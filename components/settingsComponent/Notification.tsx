import {View, Button, Text, StyleSheet, Switch} from 'react-native';
import React, {useState} from 'react';

const Notification = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const [isNotificationOnNewTask, setIsNotificationOnNewTask] = useState(false);
  const [isNotifictionOnEmail, setIsNotifictionOnEmail] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2 = () => setIsNotificationOnNewTask(previousState => !previousState);
  const toggleSwitch3 = () => setIsNotifictionOnEmail(previousState => !previousState);

  

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderBottomWidth: 1, padding: 10, paddingLeft: 20, paddingRight: 20}}>
        <Text style={styles.normalText}>Настройка уведомлений</Text>
        <View style={styles.flexRow}>
          <Text style={styles.switchText}>Включить уведомления</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled}/>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.switchText}>Уведомлять о новых заданиях</Text>
          <Switch disabled={!isEnabled} onValueChange={toggleSwitch2} value={isNotificationOnNewTask}/>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.switchText}>Отправлять уведомления на электронную почту</Text>
          <Switch disabled={!isEnabled} onValueChange={toggleSwitch3} value={isNotifictionOnEmail}/>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    enabled: {
      display: 'flex',
    },
    disabled: {
      display: 'none',
    },
    normalText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    switchText: {
        fontSize: 16,
        color: "black",
        paddingRight: 10,
        maxWidth: '90%',
    }
});

export default Notification;