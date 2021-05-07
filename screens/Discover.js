import React from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import Profile from "../components/Profile";
import Notifications from "../components/Notifications";
import {useNavigation} from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Discover = props => {
    const navigation = useNavigation();

   return (
       <View style={styles.view}>
           <TextInput style={styles.textInput}/>

           <TouchableOpacity style={[styles.events, styles.box]} onPress={() => navigation.navigate("Events")}>
               <Text style={styles.text}>ALL EVENTS</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.organisations, styles.box]}>
               <Text style={styles.text}>ALL STUDENT ORGANISATIONS</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.posts, styles.box]}>
               <Text style={styles.text}>ALL POSTS</Text>
           </TouchableOpacity>

       </View>
   );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#F5F5F5"
    },
   events: {
       backgroundColor: "#863884"
   },
    organisations: {
        backgroundColor: "#58567A"
    },
    posts: {
        backgroundColor: "#31A282"
    },
    box: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 0,
        height: 130,
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        borderRadius: 5
    },
    text:{
       color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'center'
    },
    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 20
    },
});

export default Discover;