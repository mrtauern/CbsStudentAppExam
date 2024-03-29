import EventSchedule from "./EventSchedule";
import EventResponse from "./EventResponse";

class Event {
    /*id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    organisation: string;
    thumbnail: string;
    schedule: EventSchedule[];
    response: EventResponse[];*/

    constructor(public id: string, public title: string, public description: string, public startDate: Date, public endDate: Date,
                public location: string, public organisation: string, public thumbnail: string, public schedule: EventSchedule[], public response: EventResponse[]) {
        /*this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.organisation = organisation;
        this.thumbnail = thumbnail;
        this.schedule = schedule;
        this.response = response;*/
    }
}

export default Event;