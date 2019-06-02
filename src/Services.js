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

    //Hämtar annonser från vår webbtjänst
  componentDidMount() {
    axios.get("http://193.10.202.78/AnnonsRestApi/api/Service").then(
      result => {
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
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
      // Listan med annonser loopas igenom och visas upp i bootstrap-cards
      return (
        <div className="container-fluid">
          <div className="card-columns">
            {items.map(item => (
              <div className="card">
                <div className="card-body">

                { 
                  //Om bilden i annonsen är en placeholder-bild hämtas en ny bild från flickr baserat på vilken kategori annonsen har. 
                  item.Picture === "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image10.jpg" ? (
                    <Images subcategory = {item.SubCategory.Titel}/>
                  ) : (  
                  // Om det redan finns en bild visas den. 
                    <img class="card-img-top" alt="annonsbild" src={item.Picture}/>
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