'use strict';

import ServerActionCreators from '../actions/ServerActionCreators.jsx';
import { get, post } from './XhrUtils.jsx';

let baseUrl = window.location.host;
let SERVER_ENV;
let loggedInUserId;

export default {

  /**
   * Call to get the current user object.
   * This is called right after log in.
   */
  retrieveUserObject() {
    loggedInUserId = document.getElementById('userLoggedIn').getAttribute("userLoggedIn");
    SERVER_ENV = document.getElementById('userLoggedIn').getAttribute("server_env");
    const url = (SERVER_ENV == 'development') ? `http://${baseUrl}/api/users/${loggedInUserId}` : `https://${baseUrl}/api/users/${loggedInUserId}`;

    get(url).then((response) => {
      ServerActionCreators.receiveUserObject(response.data);
    }, (error) => {
      console.error("Failed to retrieve user data!", error);
    });
  },

  /**
   * Create a new savings goal with the given params.
   */
  addUserSavingsGoal(params) {
    const url = (SERVER_ENV == 'development') ? `http://${baseUrl}/api/createGoal` : `https://${baseUrl}/api/createGoal`;
    params.userId = loggedInUserId;
    console.log(params)

    post(url, params)
      .then((response) => {
        this.retrieveUserGoalsObject();
      }, (error) => {
        console.error("Failed to create new savings goal!", error);
      });
  },

  /**
   * Call to get the user goals list.
   */
  retrieveUserGoalsObject() {
    loggedInUserId = document.getElementById('userLoggedIn').getAttribute("userLoggedIn");
    SERVER_ENV = document.getElementById('userLoggedIn').getAttribute("server_env");
    const url = (SERVER_ENV == 'development') ? `http://${baseUrl}/api/goals/${loggedInUserId}` : `https://${baseUrl}/api/goals/${loggedInUserId}`;

    get(url).then((response) => {
      ServerActionCreators.receiveUserGoalsObject(response.data);
    }, (error) => {
      console.error("Failed to retrieve user goals data!", error);
    });
  }
};
