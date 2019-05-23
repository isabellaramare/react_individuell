import React, { Component } from "react";
import axios from 'axios';

const api_key = "1180a9ba87919db2d4242e826baf643f";

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

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${search_criteria}&format=json&nojsoncallback=1`).then(
      result => {
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      
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
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
      return <div>Loading...</div>;
    } 
    else {
      return (
        <div>
          <img class="card-img-top"
            src={"https://farm" + 
            items.photos.photo[1].farm + 
            ".staticflickr.com/" + 
            items.photos.photo[1].server + 
            "/" + 
            items.photos.photo[1].id + 
            "_" + 
            items.photos.photo[1].secret + 
            ".jpg"}>
          </img>
        </div>
      );
    }
  }
}