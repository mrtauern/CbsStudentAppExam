import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import EventPost from './../components/EventPost';
// import { CHATROOM } from './../data/dummy-data';
import { useSelector, useDispatch } from 'react-redux';
import {createChatroom, toggleHappy} from './../store/ChatActions';
import ChatRoom from "../components/ChatRoom";
import {createEvent} from './../store/EventActions';


const Events = () => {
    const dispatch = useDispatch();

    const events = useSelector(state => state.event.events); // selecting from redux store

    //console.log("==events==");
    //console.log(events);

    return (
        <View style={styles.container}>

            <FlatList style={styles.flatlist}
                data={events}
                renderItem={itemData => (
                    <EventPost event={itemData.item}></EventPost>
                )}
                keyExtractor={item => item.id}
            />

            {/*<View>
                <Button title="Create event" onPress={() => { dispatch(createEvent(events[2])) }} />
            </View>*/}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        paddingHorizontal: 20,
    },
    flatlist: {
        width: "100%",
    },
});

export default Events;