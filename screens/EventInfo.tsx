import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import ChatRoom from '../components/ChatRoom';
import { CHATROOM } from './../data/dummy-data';
import ChatMessage from './../components/ChatMessage'
import { useSelector, useDispatch } from 'react-redux';
import { addToTest, addToChats } from './../store/ChatActions';
import Event from "../models/Event";

export interface Props {
    route : any
}

const EventInfo = ({route} : Props) => {
    const dispatch = useDispatch();
    const { id } = route.params;
    console.log("id: "+id);
    const [value, onChangeText] = useState('Write message');


    const event = useSelector(state => state.event.events).find(eventInfo => eventInfo.id === id);

    const title = event.title;
    const organisation = event.organisation;
    const location = event.location;

    const test = useSelector(state => state.event.events);
    console.log("event");
    console.log(event);

    /*const handleSend = () => {
        console.log("value " + value);
        dispatch(addToChats(value, id));
    };*/

    return (
        <View style={styles.container}>

            <View style={styles.inputView}>

                <Text>{title}</Text>
                <Text>{organisation}</Text>
                <Text>{location}</Text>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    messages: {
        flex: 1
    },
    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: 'lightgray',
        marginLeft: 10,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginBottom: 10
    },
    inputView: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 5,

    },
    tinyLogo: {

        marginTop: -5
    },
});

export default EventInfo;