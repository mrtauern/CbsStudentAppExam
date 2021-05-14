import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Image, StyleSheet, Text, View} from "react-native";
import Event from '../models/Event';
import React from "react";

export interface Props {
    event : Event;
}

const EventPost = ({event} : Props) => {
    const navigation = useNavigation();

    const title = event.title;
    const organisation = event.organisation;
    const startDate = event.startDate;
    const endDate = event.endDate;
    const location = event.location;

    /*const lastPos = props.chatroom.chatMessages.length-1;
    let lastMessageText = '';
    let displayTime = '';
    if (lastPos > -1) {
        lastMessageText = props.chatroom.chatMessages[props.chatroom.chatMessages.length-1].message;
        const lastTime = props.chatroom.chatMessages[props.chatroom.chatMessages.length-1].createdDate;

        // Should only do this if on the same date as today...
        displayTime = lastTime.getHours() + ":" +lastTime.getMinutes();
    }*/

    let date : string;

    if(startDate.getDate() == endDate.getDate() && startDate.getMonth() == endDate.getMonth() && startDate.getFullYear() == endDate.getFullYear()){
        date = startDate.getDate() + "/" + startDate.getMonth() + " kl. " + startDate.getHours() + ":" + startDate.getMinutes() + " - " + endDate.getHours() + ":" + endDate.getMinutes();
    } else {
        date = startDate.getDate() + "/" + startDate.getMonth() + " kl. " + startDate.getHours() + ":" + startDate.getMinutes() + " - " + startDate.getDate() + "/" + startDate.getMonth() + " kl. " + endDate.getHours() + ":" + endDate.getMinutes();
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate("EventInfo", {id: event.id})}>
            <View style={styles.box}>

                <View style={styles.textBox}>

                    <Text style={[styles.text, styles.title]}>{title}</Text>
                    <Text style={[styles.text, styles.organisation]}>{organisation}</Text>
                    <Text style={[styles.text, styles.date]}>{date}</Text>
                    <Text style={[styles.text, styles.location]}>{location}</Text>
                </View>

                {/* <Button title="Navigate somewhere"
                    onPress={() => navigation.navigate("nameOfNavigationRouteEgMenu")} /> */}

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    box: {
        flexDirection: 'row',
        //marginLeft: 20,
        //marginRight: 20,
        marginTop: 20,
        marginBottom: 0,
        height: 130,
        //justifyContent: 'center', //Centered vertically
        //alignItems: 'center', // Centered horizontally
        borderRadius: 5,
        backgroundColor: "#AAAAAA"
    },
    textBox:{
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'left'
    },
    text:{
        color: '#FFFFFF',
        fontSize: 13,
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
    },
    organisation:{
        fontSize: 12,
        fontWeight: "bold",
    },
    date:{
        fontWeight: "bold",
    },
    location:{

    }
});

export default EventPost;