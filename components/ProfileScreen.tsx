import {useEffect, useContext} from 'react';


import {MainContext} from "../MainContext";


const ProfileScreen = ({navigation}) => {
    const mainObject = useContext(MainContext);

    if (!mainObject.email) {
        navigation.navigate("Авторизация");
    } else {
        navigation.navigate("Профиль");
    }

    

    
};

export default ProfileScreen;