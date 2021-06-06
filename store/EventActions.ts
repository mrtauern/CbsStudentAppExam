import Event from '../models/Event';

import { FIREBASE } from "./../data/keys";
import ChatRoom from "../models/ChatRoom";
import User from "../models/User";
import ChatMessage from "../models/ChatMessage";
import EventResponse from "../models/EventResponse";
import {USERS} from "../data/dummy-data";
import EventSchedule from "../models/EventSchedule";
import {useSelector} from "react-redux";

export const FETCHED_EVENTS = 'FETCHED_EVENTS';
export const NEW_EVENT = 'NEW_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const REMOVE_RESPONSE = 'REMOVE_RESPONSE';
export const HAS_RESPONDED = 'HAS_RESPONDED';

export const addToChats = (text: any, chatroomId: any) => {
    const tempUser = new User('1','Felix Sandgren', '1234', 'felix@sandgren.dk', '', 'MSc in Medicine', true);
    const message = new ChatMessage(Math.random().toString(), new Date(), text, tempUser);

    return {type: NEW_EVENT, payload: {message, chatroomId }};
};

export const addResponse = (eventId: number, responseType: boolean) => {
    return async (dispatch: any, getState: any) => {
        const tempUser = new User('1', 'felix@sandgren.dk', 'Felix Sandgren', '', 'MSc in Medicine', true);
        const eventResponse1 = new EventResponse(Math.random().toString(), tempUser, responseType)

        //const result
        /*console.log("==Result==")
        console.log(result)*/

        const result = {type: ADD_RESPONSE, payload: {eventResponse1, eventId}};
        dispatch(fetchEvents()).then(() => {
            dispatch(result);
            const event: Event = getState().event.events.find(thisEvent => thisEvent.id === eventId);
            dispatch(updateEvent(event));

            return dispatch(result);
        });

        /*console.log("==Action event==");
        console.log(event);*/
    }
}

export const removeResponse = (eventId: number) => {
    return async (dispatch: any, getState: any) => {
        const userId = "1";


        const result = {type: REMOVE_RESPONSE, payload: {userId, eventId}};
        dispatch(fetchEvents()).then(() => {
            dispatch(result);
            const event: Event = getState().event.events.find(thisEvent => thisEvent.id === eventId);
            dispatch(updateEvent(event));

            return dispatch(result);
        });
    }
}

export const hasResponded = (eventId: number, userId: number) => {

    return {type: HAS_RESPONDED, payload: {eventId, userId}};
}

export const fetchEvents = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://cbsstudentapp-9f805-default-rtdb.firebaseio.com/events.json?auth=' + token, {
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
                let schedules : EventSchedule[] = [];
                if(data[key].schedule != undefined) {
                    data[key].schedule.forEach(function (s: EventSchedule) {
                        schedules.push(new EventSchedule(s.id, new Date(s.time), s.item));
                    });
                }

                let responses : EventResponse[] = [];
                if(data[key].response != undefined) {
                    data[key].response.forEach(function (r: EventResponse) {
                        const u = r.user;
                        let rUser: User = new User(u.id, u.email, u.name, u.image, u.title, u.chatNotification);

                        responses.push(new EventResponse(r.id, rUser, r.status));
                    });
                }

                events.push(new Event(
                    key,
                    data[key].title,
                    data[key].description,
                    new Date(data[key].startDate),
                    new Date(data[key].endDate),
                    data[key].location,
                    data[key].organisation,
                    data[key].thumbnail,
                    data[key].schedule == undefined ? [] as EventSchedule[] : schedules as EventSchedule[],
                    data[key].response == undefined ? [] as EventResponse[] : responses as EventResponse[])); /*HERE! instead of []*/
            }

            //console.log("//events//");
            //console.log(events);


            dispatch({type: FETCHED_EVENTS, payload: events });
        }
    };

    // return { type: NEW_CHATROOM, payload: chatroomName };
};

//export const createEvent = (eventTitle: string, eventDescription: string, eventLocation: string, eventOrganisation: string, thumbnail: string, schedule: EventSchedule[], responsey: EventResponse[]) => {
export const createEvent = (event: Event) => {
    return async (dispatch: any, getState: any) => {

        //let event = new Event('', eventTitle, eventDescription, new Date(), new Date(), eventLocation, eventOrganisation, thumbnail, schedule, responsey);
        //let event = new Event('', 'MyEvent', eventDescription, new Date(), new Date(), eventLocation, eventOrganisation, '', [], []);
        const token = getState().user.idToken;
        console.log("token");
        console.log(token);

        const response = await fetch(
            // get url from your! firebase realtime database.

            // to save a chat message in a chat room:
            //'https://cbsstudents-38267-default-rtdb.firebaseio.com/chatrooms/<chatroom_id>/chatMessages.json?auth=' + token, {
            'https://cbsstudentapp-9f805-default-rtdb.firebaseio.com/events.json?auth=' + token, {
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
            event.id = data.name;
            dispatch({type: NEW_EVENT, payload: event });
        }
    };

    // return { type: NEW_CHATROOM, payload: chatroomName };
};

export const updateEvent = (event: Event) => {
    return async (dispatch: any, getState: any) => {

        //let event = new Event('', eventTitle, eventDescription, new Date(), new Date(), eventLocation, eventOrganisation, thumbnail, schedule, responsey);
        //let event = new Event('', 'MyEvent', eventDescription, new Date(), new Date(), eventLocation, eventOrganisation, '', [], []);
        const token = getState().user.idToken;
        console.log("token");
        console.log(token);
        const id = event.id;

        const response = await fetch(
            // get url from your! firebase realtime database.

            // to save a chat message in a chat room:
            //'https://cbsstudents-38267-default-rtdb.firebaseio.com/chatrooms/<chatroom_id>/chatMessages.json?auth=' + token, {
            'https://cbsstudentapp-9f805-default-rtdb.firebaseio.com/events/' + id + '.json?auth=' + token, {
                method: 'PUT',
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
            event.id = data.name;
            dispatch({type: UPDATE_EVENT, payload: event });
        }
    };
};