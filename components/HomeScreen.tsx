import {View, Button, Text} from 'react-native';
import {styles} from './styles';

const HomeScreen = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.normalText}>Это главная страница</Text>
      </View>
    );
  };

export default HomeScreen;