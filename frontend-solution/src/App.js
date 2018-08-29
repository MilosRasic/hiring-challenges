import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import List from './components/List';
import Logo from './components/Logo';
import Ad from './components/Ad';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Logo />
				</header>

				<BrowserRouter>
					<Switch>
						<Route path="/" component={List} exact />
						<Route path="/:id" component={Ad} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
