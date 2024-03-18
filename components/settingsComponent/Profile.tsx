import {View, Button, Text, StyleSheet} from 'react-native';

const Profile = ({navigation}) => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderBottomWidth: 1, padding: 10}}>
        <Text style={styles.normalText}>Это настройки профиля</Text>
        <Button title="Зарегистрироваться" onPress={() => {
            navigation.navigate('Профиль');
        }}/>
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