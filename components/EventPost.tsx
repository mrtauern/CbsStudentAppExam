import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Dimensions, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import Event from '../models/Event';
import React, {useState} from "react";
import {LinearGradient} from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import EventResponse from "../models/EventResponse";

export interface Props {
    event : Event;
}

const EventPost = ({event} : Props) => {
    const navigation = useNavigation();

    const userId = "1";

    const title = event.title;
    const organisation = event.organisation;
    const startDate = event.startDate;
    const endDate = event.endDate;
    const location = event.location;
    const response = event.response;

    const myResponse : EventResponse | undefined = response.find(response => response.user.id === userId);
    //console.log("myResponse");
    //console.log(myResponse);

    const [getNotGoing, setNotGoing] = useState(myResponse == undefined ? true : false);
    const [getInterested, setInterested] = useState(myResponse == undefined ? false : (myResponse.status ? false : true));
    const [getGoing, setGoing] = useState(myResponse == undefined ? false : (myResponse.status ? true : false));

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
        date = startDate.getDate() + ". " + monthNames[startDate.getMonth()] + " • " + startDate.getHours() + ":" + minutesInClock(startDate.getMinutes()) + " - " + endDate.getHours() + ":" + minutesInClock(endDate.getMinutes());
    } else {
        date = startDate.getDate() + ". " + monthNames[startDate.getMonth()] + " • " + startDate.getHours() + ":" + minutesInClock(startDate.getMinutes()) + " - " + startDate.getDate() + ". " + monthNames[startDate.getMonth()] + " • " + endDate.getHours() + ":" + minutesInClock(endDate.getMinutes());
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate("EventInfo", {id: event.id})}>
            <View style={styles.box}>
                <ImageBackground source={require('./../assets/holidayPicture.jpg')} imageStyle={{ borderRadius: 5}} style={styles.image}>

                    <LinearGradient colors={['#00000000', '#000000DD']} style={styles.textBox}>

                        { getInterested ? (
                            <View style={styles.myResponse}>
                                <Ionicons name="star" size={25} color="#FFFFFF" />
                            </View>
                        ) : null}

                        { getGoing ? (
                            <View style={styles.myResponse}>
                                <Ionicons name="checkbox-outline" size={25} color="#FFFFFF" />
                            </View>
                        ) : null}

                        <View style={getNotGoing ? styles.innerTextBoxNotGoing : styles.innerTextBoxGoing}>
                            <Text style={[styles.text, styles.title]}>{title}</Text>
                            <Text style={[styles.text, styles.organisation]}>{organisation}</Text>
                            <Text style={[styles.text, styles.date]}><Ionicons name="time" size={16} color="#FFFFFF" />   {date}</Text>
                            <Text style={[styles.text, styles.location]}><Ionicons name="location-sharp" size={16} color="#FFFFFF" />   {location}</Text>
                        </View>
                    </LinearGradient>

                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    box: {
        flex: 1,
        marginTop: 20,
        marginBottom: 0,

        height: 180,
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
        paddingTop: 0,
    },
    innerTextBoxGoing: {
        marginTop: 50,
    },
    innerTextBoxNotGoing: {
        marginTop: 90,
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

    },
    myResponse: {
        backgroundColor: "#5050A5",
        width: 40,
        height: 40,
        padding: 7,
        marginLeft: Dimensions.get('window').width - 115,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
});

export default EventPost;