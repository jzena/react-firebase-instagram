import React, { Component } from 'react';
import firebase from 'firebase';

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      pictures: []
    };
  }
  componentWillMount() {
    firebase.database().ref('pictures').on('child_added', (snapshot) => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }


  render() {
    return (
      <div className="list-card">
        {
          this.state.pictures.map(picture => (
            <div className="App-card" key={Math.random()}>
              <figure className="App-card-image">
                <img width="320" src={picture.image} alt="" />
                <figcaption className="App-card-footer">
                  <img className="App-card-avatar" src={picture.photoURL} alt={picture.displayName} />
                  <span className="App-card-name">{picture.displayName}</span>
                </figcaption >
              </figure>
            </div>
          )).reverse()
        }
      </div>
    );
  }
}

export default CardList;
