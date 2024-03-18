import {View, Button, Text} from 'react-native';
import {styles} from './styles';

const TaskScreen = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.normalText}>Это задания</Text>
      </View>
    );
};

export default TaskScreen;