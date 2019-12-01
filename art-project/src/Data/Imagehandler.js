
import { base } from '../base'
import firebase from 'firebase';
import { Component } from 'react';


class Imagehandler extends Component{


    async getImage(image) {
        console.log(image);
        let temp = `${image}`;
        let string = "thumbelina/thumbelina1.jpg";
        let grej = await firebase.storage().ref().child(`${string}`).getDownloadURL().then((url) => {
        console.log(url);
        return url;
        }).catch((error) => {
        // Handle any errors
        })

        let apan = await grej;
        return apan;
    }
}

// Export an instance of Model
const handler = new Imagehandler();
export default handler;
