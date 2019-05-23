import React, { Component } from 'react';
import axios from 'axios';
import Images from './Images';

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
            <ul className="list-unstyled">
                {items.map(item => (
                    <div className="row">
                        <div className="col-md-12">
                            <li key={item.Id} className="Service_list">
                            <h2 class="title">{item.Title}</h2>
                            <p class="description">{item.Description}</p>
                            <Images subcategory = {item.SubCategory.Titel}/>
                            </li>
                        </div>
                    </div>
                    
                ))}
            </ul>
           
          </div>
      );
    }
  }
}

export default Services;
