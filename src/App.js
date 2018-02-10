import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';
import CardList from './Card-list';
import logo from './t3chfy_cmyk.png';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      uploadValue: 0
    };
  }

  componentWillMount() {
    // Cada vez que el método 'onAuthStateChanged' se dispara, recibe un objeto (user)
    // Lo que hacemos es actualizar el estado con el contenido de ese objeto.
    // Si el usuario se ha autenticado, el objeto tiene información.
    // Si no, el usuario es 'null'
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }


  handleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout = () => {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    // Listener que se ocupa del estado de la carga del fichero
    task.on('state_changed', (snapshot) => {
      // Calculamos el porcentaje de tamaño transferido y actualizamos
      // el estado del componente con el valor
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      });
    }, (error) => {
      console.log(error.message);
    }, () => {
      // Subida completada
      // Obtenemos la URL del fichero almacenado en Firebase storage
      // Obtenemos la referencia a nuestra base de datos 'pictures'
      // Creamos un nuevo registro en ella
      // Guardamos la URL del enlace en la DB     
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      };

      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }

  renderLoginButton = () => {
    if (this.state.user) {
      const { displayName } = this.state.user;
      return (
        <div className="App-intro">
          <p className="App-intro">¡Hola, {displayName}!</p>

          <button onClick={this.handleLogout} className="App-btn">
            Salir
          </button>


          <FileUpload onUpload={this.handleUpload} uploadValue={this.state.uploadValue} />
          <CardList />
        </div>
      );
    }
    return (
      <button onClick={this.handleAuth} className="App-btn">
        Iniciar sesión con Google
      </button>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MemesFE {(new Date()).getFullYear()}</h2>
        </div>
        {this.renderLoginButton()}
      </div>
    );
  }
}

export default App;
