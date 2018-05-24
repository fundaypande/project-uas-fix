import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import Beranda from './home';
import Sidebar from './Sidebar';
import Login from './view/Login.js';
import Signup from './view/Signup.js';
import Register from './view/Register.js';
import Profile from './view/Profile.js';
import Demo from './demo.js';
import EditProfile from './view/EditProfile.js';
import Maps from './view/maps.js';


const Screens = DrawerNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Beranda: {
    screen: Beranda
  },
  Demo: {
    screen: Demo
  },
  Profile: {
    screen: Profile
  },
  Register: {
    screen: Register
  },
  EditProfile: {
    screen: EditProfile
  },
  Maps: {
    screen: Maps
  },
},
  // {
  //   initialRouteName: 'Maps',
  // },
  {
    contentComponent: props => <Sidebar {...props} />
  }
);

export default Screens;
