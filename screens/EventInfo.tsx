import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import ChatRoom from '../components/ChatRoom';
import { CHATROOM } from './../data/dummy-data';
import ChatMessage from './../components/ChatMessage'
import { useSelector, useDispatch } from 'react-redux';
import { addToTest, addToChats } from './../store/ChatActions';
import Event from "../models/Event";
import {signup} from "../store/UserActions";
import EventResponse from "../models/EventResponse";
import EventPost from "../components/EventPost";
import Ionicons from '@expo/vector-icons/Ionicons';

export interface Props {
    route : any
    event : Event
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
    const startDate = event.startDate;
    const endDate = event.endDate;
    const response = event.response;
    const description = event.description;
    const schedule = event.schedule;

    const test = useSelector(state => state.event.events);
    console.log("event");
    console.log(event);

    //console.log("response");
    //console.log(response);

    let interrested : number;
    interrested = 0;

    response.forEach(function (value : EventResponse) {
        if(value.status == false){
            interrested++;
        }
    });

    let going : number;
    going = 0;

    response.forEach(function (value : EventResponse) {
        if(value.status == true){
            going++;
        }
    });

    /*const handleSend = () => {
        console.log("value " + value);
        dispatch(addToChats(value, id));
    };*/

    const addInterrested = () => {

    };

    const addGoing = () => {

    };

    const goToChat = () => {

    };

    let date : string;

    if(startDate.getDate() == endDate.getDate() && startDate.getMonth() == endDate.getMonth() && startDate.getFullYear() == endDate.getFullYear()){
        date = startDate.getDate() + "/" + startDate.getMonth() + " kl. " + startDate.getHours() + ":" + startDate.getMinutes() + " - " + endDate.getHours() + ":" + endDate.getMinutes();
    } else {
        date = startDate.getDate() + "/" + startDate.getMonth() + " kl. " + startDate.getHours() + ":" + startDate.getMinutes() + " - " + startDate.getDate() + "/" + startDate.getMonth() + " kl. " + endDate.getHours() + ":" + endDate.getMinutes();
    }

    return (
        <View style={styles.container}>

            <View style={styles.infoBox}>

                <View style={styles.generalBox}>
                    <Text>{title}</Text>
                    <Text>{date}</Text>
                    <Text>{location}</Text>

                </View>

                <View style={styles.chatBox}>
                    <Text>{organisation}</Text>
                    <Text>View page</Text>
                    <Button
                        //title={"chat"}
                        buttonStyle={styles.chatButton}
                        onPress={goToChat}
                        icon={
                            <Ionicons
                                name="ios-chatbubbles-sharp"
                                size={20}
                                color="white"
                                style={styles.buttonIcon}
                            />
                        } />
                </View>

                <View style={styles.responseBox}>

                    <Button buttonStyle={[styles.responseButtons, styles.interrestedButton]} title={"Interrested"} onPress={addInterrested} type="outline"></Button>
                    <Button buttonStyle={[styles.responseButtons, styles.goingButton]} title={"Going"} onPress={addGoing}></Button>

                    <Text>{interrested + " Interrested"}</Text>
                    <Text>{going + " Going"}</Text>

                </View>
            </View>

            <View style={styles.descriptionBox}>
                <Text>{description}</Text>
            </View>

            <View style={styles.scheduleBox}>
                <FlatList
                    data={schedule}
                    renderItem={itemData => (
                        <Text>{itemData.item.time.getHours() + ":" + itemData.item.time.getMinutes() + "   " + itemData.item.item}</Text>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'lightgray',
    },
    infoBox: {
        flex: 1,
        //height: 40,
        //marginLeft: 10,
        borderRadius: 0,
        padding: 15,
        //marginRight: 10,
        marginBottom: 30,
        backgroundColor: 'white',
    },
    descriptionBox: {
        flex: 1,
        padding: 15,
        marginBottom: 30,
        backgroundColor: 'white',
    },
    scheduleBox: {
        flex: 1,
        padding: 15,
        marginBottom: 30,
        backgroundColor: 'white',
    },
    generalBox: {
        //flex: 1,
    },
    chatBox: {
        //flex: 1,
        borderRadius: 5,
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 8,
        marginTop: 15,
        marginBottom: 15
    },
    chatButton: {
        backgroundColor: '#5050A5',
        width: 45,
        height: 45,
    },
    responseBox: {
        //flex: 1,
    },
    buttonIcon: {
        marginRight: 5
    },
    responseButtons: {
        color: '#5050A5',
        backgroundColor: '#FFFFFF',
        borderColor: '#5050A5',
        borderWidth: 1,
    },
    goingButton: {

    },
    interrestedButton: {

    }
});

export default EventInfo;