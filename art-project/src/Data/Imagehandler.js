
import { base } from '../base'
import firebase from 'firebase';
import { Component } from 'react';
const storage = firebase.storage().ref()

class Imagehandler extends Component{


    getHelp(){
        console.log("SEND HELP");
    }
    
    getImage(image) {
        let { state } = this
        storage.child(`${image}1.jpg`).getDownloadURL().then((url) => {
        state[image] = url
        this.setState(state)
        }).catch((error) => {
        // Handle any errors
        })
    }
}

// Export an instance of Model
const handler = new Imagehandler();
export default handler;