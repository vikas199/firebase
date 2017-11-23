import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common/Index';

class LoginForm extends Component {
    state={ email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucess.bind(this))
      .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucess.bind(this))
          .catch(this.onLoginFail.bind(this));
        });
    }

 
onLoginSucess() {
  this.setState({
    email: '',
    password: '',
    loading: false,
    error: ''
  });
}
onLoginFail() {
  this.setState({ error: 'Authenticaion Failed ', loading: false });
 
}
randonButton() {
  if (this.state.loading) {
    return <Spinner />;
  } 
    return (<Button onPress={this.onButtonPress.bind(this)}>
    Login
  </Button>
    );
}
    render() {
        return (
           <Card>
             <CardSection>
                 <Input 
                  onChangeText={(email) => this.setState({ email })} 
                  value={this.state.email} 
                  label="Email"
                  placeholder="user@gmail.com"
                  />
             </CardSection>
             <CardSection>
                 <Input 
                  onChangeText={(password) => this.setState({ password })} 
                  value={this.state.password} 
                  label="Password"
                  placeholder="password"
                  secureTextEntry
                  />
              </CardSection>
              <Text style = {styles.failedStyle}>{this.state.error}</Text>
            <CardSection>
             {this.randonButton()}
            </CardSection>
           </Card>
        );
    }
}

const styles=StyleSheet.create({
  failedStyle: {
   fontSize: 20,
   color: 'red',
   alignSelf: 'center'
  }
});

export default LoginForm;