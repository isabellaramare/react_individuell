import React, { Component } from "react";
import axios from 'axios';
import './App.css';

const api_key = "1180a9ba87919db2d4242e826baf643f";
var pic_num = 1;

//https://i.imgur.com/YzVVX4t.jpg
//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1180a9ba87919db2d4242e826baf643f&tags=dog&format=rest

export default class Images extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  componentDidMount() {
    const search_criteria = this.props.subcategory;

    // Nedan skickas search_critera som i detta fall är subCategory (från annonser i Services.js) till flickrs API.
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${search_criteria}&format=json&nojsoncallback=1`).then(
      result => {
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
      
      // items innehåller:
      //id, owner, secret, server, farm, title, ispublic, isfriend och isfamily.

      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }); 
  }

  render() {
    
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ett fel uppstod: {error.message}</div>;
    } 
    else if (!isLoaded) {
      return <div>Laddar...</div>;
    } 
    else {
      pic_num = Math.floor(Math.random() * 20);
    
      // För att visa upp en specifik bild krävs en url som innehåller 
      //farm Id, server Id, bildens Id samt "secret" vilket hämtas nedan och läggs i en url som visar upp bilden.
      return (
        <div>
          <img className="card-img-top service-card-image"
            src={"https://farm" + 
            items.photos.photo[pic_num].farm + 
            ".staticflickr.com/" + 
            items.photos.photo[pic_num].server + 
            "/" + 
            items.photos.photo[pic_num].id + 
            "_" + 
            items.photos.photo[pic_num].secret + 
            ".jpg"}>
          </img>
        </div>
      );
    }
  }
}