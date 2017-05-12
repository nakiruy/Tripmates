import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';

import Header from './Header';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    }
    this.submitSignup = this.submitSignup.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
  }

  submitSignup(signup, e) {
   e.preventDefault();
   axios.post('/signup', {username: signup.username, password: signup.password})
     .then(({response}) => {
       //this line will take you to /profile
       this.props.checkUser(this.state.userInfo['username']);
       this.props.history.push('/profile');
     })
     .catch(err => {
       console.error("error in post entries", err);
     })
 }

  updateInputs(e) {
    var userInfo = this.state.userInfo;
    var name = e.target.name;
    var value = e.target.value;

    userInfo[name] = value;
    this.setState({userInfo});
  }

  render() {
    return (
      <div>
          <Header />
          <div id="content">
            <div id ="form_container">
              <h3>Sign up</h3>
              <form onSubmit={this.submitSignup.bind(this, this.state.userInfo)}>
                <div className="form_element">
                  <label>Username</label>
                    <input name="username" type="text" onChange={this.updateInputs}/>
                </div>

                <div className="form_element">
                  <label>Password</label>
                  <input name="password" type="password" onChange={this.updateInputs}/>
              </div>
              <button>Sign Up</button>
            </form>
            </div>
          </div>
      </div>
    )
  }
}

export default Signup;
