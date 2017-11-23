

import React, { Component } from 'react';
import {
 Text,
  StyleSheet,
  View
} from 'react-native';
import { Header, Button, CardSection, Spinner } from './src/components/common/Index';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  state = ({ loggedIn: false })

  componentWillMount() { 
   firebase.initializeApp(
    {
      apiKey: 'AIzaSyCEcDamqE0XBou_9OnI4IgM-i1EJrpgO3w',
      authDomain: 'auth-975dd.firebaseapp.com',
      databaseURL: 'https://auth-975dd.firebaseio.com',
      projectId: 'auth-975dd',
      storageBucket: 'auth-975dd.appspot.com',
      messagingSenderId: '805704158893'
    });
    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
          this.setState({ loggedIn: true });
       } else {
         this.setState({ loggedIn: false });
       }
    });
  }

  onFormLogout() {
    return <LoginForm />
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
       return (
        <CardSection>
      <Button onPress={() => firebase.auth().signOut()}>
     Logout
      </Button>
      </CardSection>
      );
      case false:
      return <LoginForm />;
       default:
       return <Spinner size="large" />
    }
}
  render() {
    return (
   <View>
     <Header headerText="Auth" />

     {this.renderContent()}
   

   </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
   // flex: 2,
    fontSize: 50,
    //fontFamliy: 'heletica',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
