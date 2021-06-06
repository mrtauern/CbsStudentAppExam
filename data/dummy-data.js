import ChatMessage from "../models/ChatMessage";
import ChatRoom from "../models/ChatRoom";
import User from "../models/User";
import Event from "../models/Event";
import EventSchedule from "../models/EventSchedule";
import EventResponse from "../models/EventResponse";

export const USERS = [
    new User('1','felix@sandgren.dk', 'Felix Sandgren', '', 'MSc in Medicine', true),
    new User('2','hasan@haidari.dk', 'Hasan Haidari', '', 'MSc in Business', true)
];

export const CHATMESSAGES = [
    new ChatMessage('1',new Date(2021, 0, 1, 20, 10, 1), 'Hello anyone our there!', USERS[0]),
    new ChatMessage('2',new Date(2021, 0, 1, 20, 12, 1), 'Hello I am here', USERS[1]),
    new ChatMessage('3',new Date(2021, 0, 1, 20, 14, 1), 'Hello how are you!', USERS[0]),
    new ChatMessage('4',new Date(2021, 0, 1, 20, 15, 1), 'Hello looking at a React Native teacher right now..! and then some truncated text', USERS[1]),
];

export const CHATROOM = [
    new ChatRoom('1',new Date(2021, 0, 1, 2, 0, 0), 'CBS Surf', CHATMESSAGES),
    new ChatRoom('2',new Date(2021, 0, 1, 2, 1, 0), 'CBS Students', []),
    new ChatRoom('3',new Date(2021, 0, 1, 2, 2, 0), 'CBS Poker', [])
];

export const EVENTSCHEDULES = [
    new EventSchedule('1', new Date(2021, 7, 10, 10, 0, 0), 'Mødes uden for hovedindgangen'),
    new EventSchedule('2', new Date(2021, 7, 10, 10, 30, 0), 'Køber turpas'),
    new EventSchedule('3', new Date(2021, 7, 10, 11, 0, 0), 'Prøver forlystelser'),
    new EventSchedule('4', new Date(2021, 7, 10, 13, 0, 0), 'Frokost'),
    new EventSchedule('5', new Date(2021, 7, 10, 14, 0, 0), 'Forlystelser og øl'),
    new EventSchedule('6', new Date(2021, 7, 10, 15, 30, 0), 'Fælleds afslutning'),
];

export const EVENTRESPONSE =[
    new EventResponse('1', USERS[1], false),
    new EventResponse('2', USERS[0], true)
];

const baconIpsum = "Spicy jalapeno bacon ipsum dolor amet tail frankfurter ham hock, filet mignon biltong venison pork chop drumstick ground round. Shoulder salami porchetta flank buffalo. Fatback beef tenderloin porchetta. Strip steak porchetta short loin beef ribs pork venison cupim pork chop swine tri-tip biltong ball tip. Tongue chislic pork loin capicola hamburger strip steak. Short ribs chislic picanha, venison pork belly ground round bresaola.\n" +
    "\n" +
    "Tenderloin pork belly bacon beef buffalo pork loin, chislic pig doner shoulder porchetta kielbasa spare ribs. Jerky venison kevin flank meatloaf shank. Tongue hamburger short loin, sausage ribeye pork swine bresaola pork loin beef ribs landjaeger. Salami sausage capicola prosciutto hamburger. Leberkas spare ribs ham ground round turkey fatback shank tail swine. Meatloaf frankfurter filet mignon kevin, andouille cupim meatball salami rump hamburger pork belly landjaeger pork."

export const EVENTS = [
    new Event('1', 'Tur i Tivoli', baconIpsum, new Date(2021, 7, 10, 10, 0, 0), new Date(2021, 7, 10, 16, 0, 0), 'København', 'CBS students', '', EVENTSCHEDULES, EVENTRESPONSE),
    new Event('2', 'Tur til Barcelona', baconIpsum, new Date(2021, 7, 15, 10, 0, 0), new Date(2021, 7, 20, 14, 30, 0), 'København', 'CBS travel', '', [], []),
    new Event('3', 'Tur til stranden', baconIpsum, new Date(2021, 7, 5, 12, 0, 0), new Date(2021, 7, 5, 15, 30, 0), 'Amager strand', 'CBS surf', '', [], [])
]