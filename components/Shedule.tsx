import {View, Button, Text} from 'react-native';
import {styles} from './styles';

const Shedule = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.normalText}>Это расписание</Text>
      </View>
    );
  };

export default Shedule;