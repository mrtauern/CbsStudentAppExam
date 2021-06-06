import User from "./User";

class EventResponse {

    constructor(public id: string, public user: User, public status: boolean)
    {
    }
}

export default EventResponse;