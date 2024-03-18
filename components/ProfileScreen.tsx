import {View, Text} from 'react-native';
import {styles} from './styles';

const ProfileScreen = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.title}>Тут регистрация </Text>
        </View>
    );
};

export default ProfileScreen;