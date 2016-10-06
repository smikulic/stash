'use strict';

import ServerActionCreators from '../actions/ServerActionCreators.jsx';
import { get, post, del } from './XhrUtils.jsx';

let baseUrl = window.location.host;
let SERVER_ENV;
let loggedInUserId;

export default {

  /**
   * Call to get the current user object.
   * This is called right after log in.
   */
  retrieveUserObject () {
    loggedInUserId = document.getElementById('userLoggedIn').getAttribute("userLoggedIn");
    SERVER_ENV = document.getElementById('userLoggedIn').getAttribute("server_env");
    const url = `http://${baseUrl}/api/users/${loggedInUserId}`;

    get(url).then((response) => {
      ServerActionCreators.receiveUserObject(response.data);
    }, (error) => {
      console.error("Failed to retrieve user data!", error);
    });
  },

  /**
   * Create a new savings goal with the given params.
   */
  addUserSavingsGoal (params) {
    const url = `http://${baseUrl}/api/createGoal`;
    params.userId = loggedInUserId;

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
  retrieveUserGoalsObject () {
    loggedInUserId = document.getElementById('userLoggedIn').getAttribute("userLoggedIn");
    const url = `http://${baseUrl}/api/goals/${loggedInUserId}`;

    get(url).then((response) => {
      ServerActionCreators.receiveUserGoalsObject(response.data);
    }, (error) => {
      console.error("Failed to retrieve user goals data!", error);
    });
  },

  /**
   * Create a new income with the given params.
   */
  addUserIncome (params) {
    const url = `http://${baseUrl}/api/createIncome`;
    params.userId = loggedInUserId;

    post(url, params)
      .then((response) => {
        this.retrieveUserIncomesObject();
      }, (error) => {
        console.error("Failed to create new income!", error);
      });
  },

  /**
   * Remove an income with the given params.
   */
  removeUserIncome (params) {
    const url = `http://${baseUrl}/api/removeIncome/${params}`;
    del(url, params)
      .then((response) => {
        this.retrieveUserIncomesObject();
      }, (error) => {
        console.error("Failed to remove income!", error);
      });
  },

  /**
   * Call to get the user incomes list.
   */
  retrieveUserIncomesObject () {
    loggedInUserId = document.getElementById('userLoggedIn').getAttribute("userLoggedIn");
    const url = `http://${baseUrl}/api/incomes/${loggedInUserId}`;

    get(url).then((response) => {
      ServerActionCreators.receiveUserIncomesObject(response.data);
    }, (error) => {
      console.error("Failed to retrieve user inocmes data!", error);
    });
  },
};
