import {View, Button, Text, StyleSheet} from 'react-native';
import ButtonOpenProfile from '../Buttons/ButtonOpenProfile';

const Profile = ({navigation}) => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderBottomWidth: 1, padding: 10}}>
        <Text style={styles.normalText}>Настройки профиля</Text>
        <ButtonOpenProfile navigation={navigation} />
      </View>
    );
};

const styles = StyleSheet.create({
    normalText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
});

export default Profile;