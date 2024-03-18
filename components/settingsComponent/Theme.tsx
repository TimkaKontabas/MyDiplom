import {View, Button, Text, StyleSheet} from 'react-native';

const Theme = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderBottomWidth: 1, padding: 10}}>
        <Text style={styles.normalText}>Настройки темы</Text>
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

export default Theme;