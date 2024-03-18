import {View, Button, Text} from 'react-native';
import {styles} from './styles';

const NewsScreen = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.normalText}>Это настройки</Text>
      </View>
    );
};

export default NewsScreen;