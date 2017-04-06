import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Button, Header, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
    apiKey: 'AIzaSyAyDLnmQe5Ar-ADwUR9-1V4sjyQdjzCAtM',
    authDomain: 'auth-d2154.firebaseapp.com',
    databaseURL: 'https://auth-d2154.firebaseio.com',
    projectId: 'auth-d2154',
    storageBucket: 'auth-d2154.appspot.com',
    messagingSenderId: '421743512769'
	});

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			this.setState({ loggedIn: true });
		} else {
			this.setState({ loggedIn: false });
		}
	});
 }

renderContent() {
	switch (this.state.loggedIn) {
		case true:
			return (
				<CardSection>
					<Button onPress={() => firebase.auth().signOut()}>
						Log out
					</Button>
				</CardSection>
			);
		case false:
			return <LoginForm />;
		default:
			return <Spinner size="large" />;
	}
}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
