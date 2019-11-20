
import { base } from '../base'
import firebase from 'firebase';
import { Component } from 'react';
const storage = firebase.storage().ref()

class Imagehandler extends Component{


    getHelp(){
        console.log("SEND HELP");
    }
    
    async getImage(image) {
        console.log(image);
        let temp = `${image}`;
        let string = "thumbelina/thumbelina1.jpg";
        console.log(string);
        let { state } = this
        storage.child(`${string}`).getDownloadURL().then((url) => {
        console.log("hej anna");
        console.log(url);
        return url;
        }).catch((error) => {
        // Handle any errors
        })
        return await state;
    }
}

// Export an instance of Model
const handler = new Imagehandler();
export default handler;