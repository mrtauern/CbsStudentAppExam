import Event from '../models/Event';

import { FIREBASE } from "./../data/keys";
import ChatRoom from "../models/ChatRoom";
import User from "../models/User";
import ChatMessage from "../models/ChatMessage";
import EventResponse from "../models/EventResponse";
import {USERS} from "../data/dummy-data";

export const FETCHED_EVENTS = 'FETCHED_EVENTS';
export const NEW_EVENT = 'NEW_EVENT';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const HAS_RESPONDED = 'HAS_RESPONDED';

export const addToChats = (text: any, chatroomId: any) => {
    const tempUser = new User('1','Felix Sandgren', '1234', 'felix@sandgren.dk', '', 'MSc in Medicine', true);
    const message = new ChatMessage(Math.random().toString(), new Date(), text, tempUser);

    return {type: NEW_EVENT, payload: {message, chatroomId }};
};

export const addResponse = (eventId: number, responseType: boolean) => {
    const tempUser = new User('1','felix@sandgren.dk', 'Felix Sandgren', '', 'MSc in Medicine', true);
    const eventResponse = new EventResponse(Math.random().toString(), tempUser, responseType)

    return {type: ADD_RESPONSE, payload: {eventResponse, eventId}};
}

export const hasResponded = (eventId: number, userId: number) => {

    return {type: HAS_RESPONDED, payload: {eventId, userId}};
}

export const fetchEvents = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().event.idToken;

        const response = await fetch(
            'https://cbsstudents-38267-default-rtdb.firebaseio.com/events.json?auth=' + FIREBASE, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            let events: Event[] = [];
            // Add code here to create a chatmessages array and save that right
            for (const key in data) {
                events.push(new Event(key, key, key, new Date(data[key].startDate), new Date(data[key].endDate), key, key, key, data[key].eventSchedule, data[key].eventResponse)); /*HERE! instead of []*/
            }

            console.log("events");
            console.log(events);


            dispatch({type: FETCHED_EVENTS, payload: events });
        }
    };

    // return { type: NEW_CHATROOM, payload: chatroomName };
};

export const createEvent = (eventTitle: string, eventDescription: string, eventLocation: string, eventOrganisation: string) => {
    return async (dispatch: any, getState: any) => {

        let event = new Event('', eventTitle, eventDescription, new Date(), new Date(), eventLocation, eventOrganisation, '', [], []);
        const token = getState().event.idToken;
        console.log("token");
        console.log(token);

        const response = await fetch(
            // get url from your! firebase realtime database.

            // to save a chat message in a chat room:
            //'https://cbsstudents-38267-default-rtdb.firebaseio.com/chatrooms/<chatroom_id>/chatMessages.json?auth=' + token, {
            'https://cbsstudents-38267-default-rtdb.firebaseio.com/events/<event_id>.json?auth=' + FIREBASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ //javascript to json
                    //key value pairs of data you want to send to server
                    // ...
                    title: event.title,
                    description: event.description,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    location: event.location,
                    organisation: event.organisation,
                    thumbnail: event.thumbnail,
                    schedule: event.schedule,
                    response: event.response
                })
            });

        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            chatroom.id = data.name;
            dispatch({type: NEW_EVENT, payload: chatroom });
        }
    };

    // return { type: NEW_CHATROOM, payload: chatroomName };
};