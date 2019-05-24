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
      return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
      return <div>Loading...</div>;
    } 
    else {
      return (
        <div className="container-fluid">
          <div className="card-columns">
            {items.map(item => (
              <div className="card bg-light">
                <div className="card-body">

                  <img class="card-img-top" src={item.Picture}/>

                  <h4 className="card-title title">{item.Title}</h4>
                  <p className="card-text description">{item.Description}</p>
                  <a href="#" class="card-link">{item.CreatorID}</a>

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


//{ 
  // Om det redan finns en bild sedan tidigare visas den annars hämtas en från flickr.
  //item.Picture ? (
  //<img class="card-img-top" src={item.Picture}/>
//) : (   
  //<Images subcategory = {item.SubCategory.Titel}/>
//)}  