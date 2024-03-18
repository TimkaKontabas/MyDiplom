import {View, Button} from 'react-native';

const NavBar = ({navigation}) => {
    return (

    <View>
        <Button
          title="G"
          onPress={() =>
            navigation.navigate('Profile', {name: 'Jane'})
          }
        />
        <Button
          title="G"
          onPress={() =>
            navigation.navigate('Profile', {name: 'Jane'})
          }
        />
      </View>
    );
  };

export default NavBar;