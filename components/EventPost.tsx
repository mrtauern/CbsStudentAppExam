import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import Event from '../models/Event';
import React from "react";
//import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';

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

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const minutesInClock = (minutes : number) => {
        if(minutes < 10){
            return "0" + minutes
        } else {
            return minutes
        }
    }

    if(startDate.getDate() == endDate.getDate() && startDate.getMonth() == endDate.getMonth() && startDate.getFullYear() == endDate.getFullYear()){
        date = startDate.getDate() + ". " + monthNames[startDate.getMonth()] + " kl. " + startDate.getHours() + ":" + minutesInClock(startDate.getMinutes()) + " - " + endDate.getHours() + ":" + minutesInClock(endDate.getMinutes());
    } else {
        date = startDate.getDate() + ". " + monthNames[startDate.getMonth()] + " kl. " + startDate.getHours() + ":" + minutesInClock(startDate.getMinutes()) + " - " + startDate.getDate() + ". " + monthNames[startDate.getMonth()] + " kl. " + endDate.getHours() + ":" + minutesInClock(endDate.getMinutes());
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate("EventInfo", {id: event.id})}>
            <View style={styles.box}>
                <ImageBackground source={require('./../assets/holidayPicture.jpg')} imageStyle={{ borderRadius: 5}} style={styles.image}>

                    <LinearGradient colors={['#00000000', '#000000DD']} style={styles.textBox}>

                        <View style={styles.innerTextBox}>
                            <Text style={[styles.text, styles.title]}>{title}</Text>
                            <Text style={[styles.text, styles.organisation]}>{organisation}</Text>
                            <Text style={[styles.text, styles.date]}>{date}</Text>
                            <Text style={[styles.text, styles.location]}>{location}</Text>
                        </View>
                    </LinearGradient>

                    {/* <Button title="Navigate somewhere"
                        onPress={() => navigation.navigate("nameOfNavigationRouteEgMenu")} /> */}

                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    box: {
        //flexDirection: 'row',
        flex: 1,
        //marginLeft: 20,
        //marginRight: 20,
        marginTop: 20,
        marginBottom: 0,

        height: 150,
        //justifyContent: 'center', //Centered vertically
        //alignItems: 'center', // Centered horizontally
        borderRadius: 5,
        backgroundColor: "#AAAAAA",
        width: '100%',

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        borderRadius: 5,
    },
    textBox:{
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'left',
        width: '100%',
        height: '100%',
        //backgroundColor: "#AAAAAAAA",
        borderRadius: 5,
        padding: 15,
    },
    innerTextBox: {
        marginTop: 50,
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