import {ADD_RESPONSE, REMOVE_RESPONSE, FETCHED_EVENTS, HAS_RESPONDED} from '../EventActions';
// import from dummy data to access chat
import { EVENTS } from '../../data/dummy-data';
import Event from '../../models/Event';
import { Action } from './UserReducer';
import { tassign } from 'tassign';
import ChatRoom from "../../models/ChatRoom";
import ChatMessage from "../../models/ChatMessage";
import EventResponse from "../../models/EventResponse";

export interface EventState {
    events: Event[];
}

const initialState: EventState = {
    events: EVENTS,
    //...
}

const EventReducer = (state: EventState = initialState, action: Action) => {
    switch (action.type) {
        case FETCHED_EVENTS:
            return tassign(state, {events: action.payload});
            console.log("==reduser events==");
            console.log(this.state.events);

        case ADD_RESPONSE:
            const event = state.events
                .find(event => event.id === action.payload.eventId) as Event;
            const eventResponses: EventResponse[] = [...event.response];

            /*event.forEach(function (event1 : Event) {
                event1.response.forEach(function (response: EventResponse) {
                    if (response.user.id === action.payload.eventResponse.user.id) {
                        response.
                    }
                });
            });*/

            console.log("eventResponses");
            console.log(action.payload.eventResponse1);
            const responseIndex : number = eventResponses.findIndex(response => response.user.id === action.payload.eventResponse1.user.id)
            /*console.log("responseIndex");
            console.log(responseIndex);*/
            if(responseIndex >= 0) {
                eventResponses.splice(responseIndex, 1);
            }
            eventResponses.push(action.payload.eventResponse1);
            /*console.log("newResponse");
            console.log(newResponse);
            eventResponses = newResponse;*/
            /*console.log("eventResponses new");
            console.log(eventResponses);*/

            /*for (let i = 0; i < state.events.length; i++){
                if(state.events[i].id === event.id){
                    for(let j = 0; j < state.events[i].response.length; j++){
                        if(state.events[i].response[j].user.id === action.payload.eventResponse.user.id){
                            let newResponse = state.events[i].response;
                            newResponse.splice(j, 1);
                            state.events[i].response = newResponse;
                        }
                    }
                }
            }*/

            const newEvent: Event = { ...event };
            newEvent.response = eventResponses;

            console.log("newEvent.response");
            console.log(newEvent.response);

            const index: number = state.events.findIndex(event => event.id === action.payload.eventId);
            const eventArray: Event[] = [...state.events];
            eventArray.splice(index, 1, newEvent);



            return tassign(state, { events: eventArray });

        case REMOVE_RESPONSE:
            const event1 = state.events
                .find(event => event.id === action.payload.eventId) as Event;
            const eventResponses1: EventResponse[] = [...event1.response];

            /*event.forEach(function (event1 : Event) {
                event1.response.forEach(function (response: EventResponse) {
                    if (response.user.id === action.payload.eventResponse.user.id) {
                        response.
                    }
                });
            });*/

            /*console.log("eventResponses");
            console.log(eventResponses);*/
            const responseIndex1 : number = eventResponses1.findIndex(response => response.user.id === action.payload.userId);
            /*console.log("responseIndex1");
            console.log(responseIndex1);*/
            if(responseIndex1 >= 0) {
                eventResponses1.splice(responseIndex1, 1);
            }
            /*console.log("newResponse");
            console.log(newResponse);
            eventResponses = newResponse;*/
            /*console.log("eventResponses new");
            console.log(eventResponses);*/

            /*for (let i = 0; i < state.events.length; i++){
                if(state.events[i].id === event.id){
                    for(let j = 0; j < state.events[i].response.length; j++){
                        if(state.events[i].response[j].user.id === action.payload.eventResponse.user.id){
                            let newResponse = state.events[i].response;
                            newResponse.splice(j, 1);
                            state.events[i].response = newResponse;
                        }
                    }
                }
            }*/

            const newEvent1: Event = { ...event1 };
            newEvent1.response = eventResponses1;

            console.log("newEvent.response");
            console.log(newEvent1.response);

            const index1: number = state.events.findIndex(event => event.id === action.payload.eventId);
            const eventArray1: Event[] = [...state.events];
            eventArray1.splice(index1, 1, newEvent1);



            return tassign(state, { events: eventArray1 });

        case HAS_RESPONDED:
            const thisEvent = state.events
                .find(event => event.id === action.payload.eventId) as Event;

            const thisResponse = thisEvent.response.find(response => response.user.id === action.payload.userId) as EventResponse;

            if(thisResponse.status == true){
                return "going";
            } else if (thisResponse.status == false){
                return "interrested";
            } else {
                return "not going";
            }

        default:
            return state;
    }
}


export default EventReducer;