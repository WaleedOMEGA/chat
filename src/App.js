import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Switch, Route, Link ,Redirect} from 'react-router-dom';
import auth from './store/reducers/authReducer';
import * as chatActions from './store/actions/chatActions';
import {
  connect
} from 'react-redux';
import Auth from './components/pages/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/swag.css';

class App extends React.Component {
  componentDidMount() {
    this.props.setupSocket();
  }
  render() {
    return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route path="/login" component={Auth} />
						<Route path="/signup" component={Auth} />
						<Route
							path="/"
              render={(props) => {
                if (!this.props.token) {
                  return (
                    <Redirect to='/login'/>
                  )
                } else {
                  return <h1>Root</h1>
                }
								
							}}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		);
  }
  
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
});

const mapDispatchToProps = dispatch => ({
  setupSocket: () => {
    dispatch(chatActions.setupSocket())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
