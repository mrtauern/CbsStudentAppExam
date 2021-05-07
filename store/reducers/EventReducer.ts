import { FETCHED_EVENTS } from '../EventActions';
// import from dummy data to access chat
import { EVENTS } from '../../data/dummy-data';
import Event from '../../models/Event';
import { Action } from './UserReducer';
import { tassign } from 'tassign';

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


        default:
            return state;
    }
}


export default EventReducer;