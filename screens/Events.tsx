import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
//import EventPost from './../components/EventPost';
// import { CHATROOM } from './../data/dummy-data';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHappy } from './../store/ChatActions';

const Chat = () => {
    const dispatch = useDispatch();

    const events = useSelector(state => state.event.events); // selecting from redux store

    console.log(events);

    return (
        <View style={styles.container}>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Chat;