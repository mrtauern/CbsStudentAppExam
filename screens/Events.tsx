import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Profile from "../components/Profile";
import Notifications from "../components/Notifications";

const Events = () => {
    return (
        <View>
            <Text>Events</Text>

            <Profile />

            <Notifications />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Events;