import React, { Component } from 'react';
import axios from 'axios';
import Images from './Images';
import './App.css';

class Services extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
    };

  componentDidMount() {
    axios.get("http://193.10.202.78/AnnonsRestApi/api/Service").then(
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
      }
    );
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
      return (
        <div className="container-fluid">
          <div className="card-columns">
            {items.map(item => (
              <div className="card">
                <div className="card-body">

                { 
                  //Om det redan finns en bild sedan tidigare (ej placeholder) visas den annars hämtas en från flickr.
                  item.Picture == "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image10.jpg" ? (
                    <Images subcategory = {item.SubCategory.Titel}/>
                  ) : (   
                    <img class="card-img-top" src={item.Picture}/>
                )} 

                  <div className="card-header">
                    <h4 className="card-title title">{item.Title}</h4>
                    <p className="subtitle">{item.SubCategory.Titel}</p>
                    <text className="price">{item.Price} kr</text>&emsp;&emsp;
                  </div>
                  <p className="card-text description">{item.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Services;