import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AllEvents = () => {
    const navigation = useNavigation();
    const loggedInUser = useSelector(state => state.user.loggedInUser);

    return (
        <View>
            <Button title="All Events" onPress={() => navigation.navigate("EditProfile")} />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default AllEvents;