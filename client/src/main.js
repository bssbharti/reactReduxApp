import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


import Layout from "./components/Layout"
import Home from './components/home/home';
import Users from './components/users/userlist';
import UserProfile from './components/users/userprofile';
import UserProfileEdit from './components/users/editprofile';

import store from "./store/store"

const app = document.getElementById('react-app')

ReactDOM.render(<Provider store={store}>
     <Router history = {browserHistory}>
       <Route path = "/" component = {Layout}>
           <IndexRoute component = {Home} />
           <Route path = "/home" component = {Home} />
           <Route path = "/users" component = {Users} />
          <Route path = "/profile/:id" component = {UserProfile}  />
          <Route path = "/edit/:id" component = {UserProfileEdit} />
       </Route>
    </Router>
</Provider>, app);
