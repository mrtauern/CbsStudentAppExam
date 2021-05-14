import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
//import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './screens/Home';
import Discover from './screens/Discover';
import Chat from './screens/Chat';
import ChatMessages from './screens/ChatMessages';
import EventInfo from './screens/EventInfo';
import MenuScreen from './screens/MenuScreen';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider, useSelector } from 'react-redux';
import ChatReducer from './store/reducers/ChatReducer';
import EditProfileScreen from './screens/EditProfileScreen';
import Events from './screens/Events';
import UserReducer from './store/reducers/UserReducer';
import ReduxThunk from 'redux-thunk';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import NewChatroomScreen from './screens/NewChatroomScreen';
import EventReducer from "./store/reducers/EventReducer";


DefaultTheme.colors.background = '#FFFFFF'; // set background color globally


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Chat" component={Chat} options={{
          title: 'CHAT', 
        }}/>
        <Stack.Screen name="ChatMessages" component={ChatMessages} />
      </Stack.Navigator>
  );
}

function MenuStackNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} options={{
          title: 'Menu', 
        }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
  );
}

function DiscoverStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Discover" component={Discover} options={{
                title: 'Discover',
            }}/>
            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="EventInfo" component={EventInfo} />
        </Stack.Navigator>
    );
}

const rootReducer = combineReducers({
  chat: ChatReducer,
  user: UserReducer,
  event: EventReducer
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
// const store = createStore(rootReducer);


const UserAccess = () => {
  const isSignedIn = useSelector((state : any) => state.user.loggedInUser);

  return (
    <NavigationContainer>
    {isSignedIn ? (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home-sharp'
            : 'ios-home-sharp';
        } else if (route.name === 'Discover') {
          iconName = focused ? 'ios-search-sharp' : 'ios-search-sharp';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'ios-chatbubbles-sharp' : 'ios-chatbubbles-sharp';
        } else if (route.name === 'Menu') {
          iconName = focused ? 'ios-menu-sharp' : 'ios-menu-sharp';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#5050A5',
      inactiveTintColor: '#B7B7B7',
    }}
  >
    <Tab.Screen name="Home" component={SignupScreen} />
    <Tab.Screen name="Discover" component={DiscoverStackNavigator} />
    <Tab.Screen name="Chat" component={StackNavigator} />
    <Tab.Screen name="Menu" component={MenuStackNavigator} />
  </Tab.Navigator>
  ) : (
    <Stack.Navigator>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  ) }  
</NavigationContainer>
);
}







export default function App() {

  // redux store not accessible

  return (
    <Provider store={store}>
      <UserAccess />
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});
