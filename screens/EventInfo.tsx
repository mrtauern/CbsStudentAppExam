import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Image,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
//import { Button } from 'react-native-elements';
import { Button } from 'react-native-paper';
import ChatRoom from '../components/ChatRoom';
import { CHATROOM } from './../data/dummy-data';
import ChatMessage from './../components/ChatMessage'
import { useSelector, useDispatch } from 'react-redux';
import { addResponse, removeResponse } from './../store/EventActions';
import Event from "../models/Event";
import {signup} from "../store/UserActions";
import EventResponse from "../models/EventResponse";
import EventPost from "../components/EventPost";
import Ionicons from '@expo/vector-icons/Ionicons';
//import IconActionSheet from 'react-native-icon-action-sheet';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
//import Any = jasmine.Any;


export interface Props {
    route : any
    event : Event
}

const EventInfo = ({route} : Props) => {
    const dispatch = useDispatch();
    const { id } = route.params;
    console.log("id: "+id);
    const [value, onChangeText] = useState('Write message');



    const userId = "1";

    const event = useSelector(state => state.event.events).find(eventInfo => eventInfo.id === id);

    const eventId = event.id;
    const title = event.title;
    const organisation = event.organisation;
    const location = event.location;
    const startDate = event.startDate;
    const endDate = event.endDate;
    const response = event.response;
    const description = event.description;
    const schedule = event.schedule;

    //const test = useSelector(state => state.event.events);
    /*console.log("schedule");
    console.log(schedule);*/

    const myResponse : EventResponse | undefined = response.find(response => response.user.id === userId);
    console.log("myResponse");
    console.log(myResponse);

    const [getNotGoing, setNotGoing] = useState(myResponse == undefined ? true : false);
    const [getInterested, setInterested] = useState(myResponse == undefined ? false : (myResponse.status ? false : true));
    const [getGoing, setGoing] = useState(myResponse == undefined ? false : (myResponse.status ? true : false));

    const options = [
        <Text style={getInterested ? styles.actionSheetSelected : styles.actionSheetNotSelected}><Ionicons name="star" size={20} color={getInterested ? "#5050A5" : "#000000"} /> Interested</Text>,
        <Text style={getGoing ? styles.actionSheetSelected : styles.actionSheetNotSelected}><Ionicons name="checkbox-outline" size={20} color={getGoing ? "#5050A5" : "#000000"} /> Going</Text>,
        <Text style={getNotGoing ? styles.actionSheetSelected : styles.actionSheetNotSelected}><Ionicons name="close-circle" size={20} color={getNotGoing ? "#5050A5" : "#000000"} /> Not going</Text>,
    ]

   /*switch (myResponse.status){
        case true: // Going
            setNotGoing(false);
            setGoing(true);
            setInterrested(false);
            break;

        case false: // Interrested
            setNotGoing(false);
            setGoing(false);
            setInterrested(true);
            break;

        default: // Not going
            setNotGoing(true);
            setGoing(false);
            setInterrested(false);

    }*/

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

    const addInterested = () => {
        console.log("eventId: " + eventId);
        dispatch(addResponse(eventId, false));

        setNotGoing(false);
        setGoing(false);
        setInterested(true);
    };

    const addGoing = () => {
        console.log("eventId: " + eventId);
        dispatch(addResponse(eventId, true));

        setNotGoing(false);
        setGoing(true);
        setInterested(false);
    };

    const showActionSheet = () => {
        this.ActionSheet.show()
    };

    const removeMyResponse = () => {
        console.log("eventId: " + eventId);
        dispatch(removeResponse(eventId));

        setNotGoing(true);
        setGoing(false);
        setInterested(false);
    }

    const goToChat = () => {

    };

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
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={styles.container}>

                <View>
                    <Image
                        style={styles.image}
                        source={require('./../assets/holidayPicture.jpg')}/>
                </View>

                <View style={styles.infoBox}>


                    <View style={styles.generalBox}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.date}><Ionicons name="time" size={16} color="black" />   {date}</Text>
                        <Text style={styles.location}><Ionicons name="location-sharp" size={16} color="black" />   {location}</Text>

                    </View>

                    <View style={styles.chatBox}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('./../assets/ac99082f65d5c636e14e70785817899e.png')}/>
                        <View style={styles.chatInfo}>
                            <Text style={styles.chatInfoName}>{organisation}</Text>
                            <Text style={styles.chatInfoView}>View page</Text>
                        </View>
                        <Button
                            icon={() => (<Ionicons name="chatbubbles" size={30} color="#FFFFFF" />)}
                            style={styles.chatButton}
                            onPress={goToChat}
                            color="#5050A5"
                            mode="contained"
                        ></Button>
                    </View>

                    <View style={styles.responseBox}>

                        { getNotGoing ? (
                            <View style={styles.responseButtonsBox}>
                                <Button icon={() => (<Ionicons name="star-outline" size={20} color="#5050A5"/>)}
                                        style={[styles.responseButtons, styles.interestedButton]}
                                        onPress={addInterested} color="#5050A5" mode="outlined">Interested</Button>
                                <Button icon={() => (<Ionicons name="checkbox-outline" size={20} color="#5050A5" />)} style={[styles.responseButtons, styles.goingButton]} onPress={addGoing} color="#5050A5" mode="outlined">Going</Button>
                            </View>
                        ) : null}
                        { getInterested ? (
                            <View style={styles.responseButtonsBox}>
                                <Button icon={() => (<Ionicons name="star" size={20} color="#FFFFFF" />)} style={styles.responseFullButtons} onPress={showActionSheet} color="#5050A5" mode="contained">Interested</Button>
                            </View>
                        ) : null}
                        { getGoing ? (
                            <View style={styles.responseButtonsBox}>
                                <Button icon={() => (<Ionicons name="checkbox" size={20} color="#FFFFFF" />)} style={styles.responseFullButtons} onPress={showActionSheet} color="#5050A5" mode="contained">Going</Button>
                            </View>
                        ) : null}

                        <View style={styles.responseOverviewBox}>
                            <Text style={styles.responseOverviewText}><Ionicons name="star" size={18} color="#000000" />  {interrested + " Interrested"}</Text>
                            <Text style={styles.responseOverviewText}>•</Text>
                            <Text style={styles.responseOverviewText}><Ionicons name="checkbox-outline" size={18} color="#000000" />  {going + " Going"}</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.descriptionBox}>
                    <Text>{description}</Text>
                </View>

                <View style={styles.scheduleBox}>
                    <Text style={styles.scheduleHeadline}>SCHEDULE</Text>
                    <FlatList
                        data={schedule}
                        renderItem={itemData => (
                            <View style={styles.scheduleItem}>
                                <Text style={styles.scheduleText}>{itemData.item.time.getHours() + ":" + minutesInClock(itemData.item.time.getMinutes()) + "   " + itemData.item.item}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>

            </ScrollView>

            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={<Text style={{color: '#000', fontSize: 18}}>Event response</Text>}
                options={options}
                //cancelButtonIndex={4}
                //destructiveButtonIndex={4}
                onPress={(index) => {
                    switch (index){
                        case 0:
                            addInterested();
                            break;
                        case 1:
                            addGoing();
                            break;
                        case 2:
                            removeMyResponse();
                            break;
                        default:
                            //Do nothing
                            break;
                    }
                }}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    container: {
        //flex: 1,
        //justifyContent: 'space-between',
        backgroundColor: 'lightgray',
        //marginHorizontal: 20,
    },
    image: {
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: 180,
    },
    infoBox: {
        //flex: 1,
        //height: 40,
        //marginLeft: 10,
        borderRadius: 0,
        padding: 15,
        //marginRight: 10,
        marginBottom: 30,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 15,
    },
    date: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    location: {
        fontSize: 16,
    },
    descriptionBox: {
        //flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 35,
        marginBottom: 30,
        backgroundColor: 'white',
    },
    scheduleBox: {
        //flex: 1,
        padding: 20,
        marginBottom: 30,
        backgroundColor: 'white',
    },
    scheduleHeadline: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 10,
    },
    scheduleItem: {
        paddingVertical: 13,
        paddingHorizontal: 40,
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
    },
    scheduleText: {

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
        marginBottom: 15,
        flexDirection: "row",
    },
    chatInfo: {
        marginVertical: 7,
        width: Dimensions.get('window').width - 170,
    },
    chatInfoName: {
        fontWeight: "bold",
    },
    chatInfoView: {
        color: "#999999",
    },
    chatButton: {
        backgroundColor: '#5050A5',
        justifyContent: "center",
        paddingVertical: 3,
        marginVertical: 5,
        width: 40,
        height: 40,
    },
    responseBox: {
        //flex: 1,
    },
    responseButtonsBox: {
        flexDirection: "row",
    },
    buttonIcon: {
        marginRight: 5
    },
    responseButtons: {
        borderWidth: 1,
        borderColor: '#5050A5',
        width: (Dimensions.get('window').width / 2) - 25,
    },
    goingButton: {

    },
    interestedButton: {
        marginRight: 20,
    },
    responseFullButtons: {
        width: Dimensions.get('window').width - 30,
    },
    responseOverviewBox: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
        marginBottom: 15,
    },
    responseOverviewText: {
        fontWeight: "bold",
        marginHorizontal: 8,
    },
    actionSheetSelected: {
        color: '#5050A5',
        fontWeight: "bold",
        fontSize: 18,
    },
    actionSheetNotSelected: {
        color: '#000000',
        fontWeight: "bold",
        fontSize: 18,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

export default EventInfo;