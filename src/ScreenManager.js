import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import Beranda from './beranda';
import Sidebar from './Sidebar';
import Login from './view/Login.js';
import Signup from './view/Signup.js';
import Register from './view/Register.js';
import Profile from './view/Profile.js';
import Demo from './demo.js';
import EditProfile from './view/EditProfile.js';
import Maps from './view/maps.js';
import ListPrint from './view/ListPrint.js';
import ListItemInfo from './view/ListItemInfo.js';
import Print from './view/Print.js';
import Position from './view/CurentPosition.js';
import uasLogin from './uas/login.js';
import uasLupa from './uas/lupapassword.js';
import ListMahasiswa from './uas/uasList.js';


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
  ListPrint: {
    screen: ListPrint
  },
  ListItemInfo: {
    screen: ListItemInfo
  },
  Print: {
    screen: Print
  },
  Position: {
    screen: Position
  },
  uasLogin: {
    screen: uasLogin
  },
  uasLupa: {
    screen: uasLupa
  },
  ListMahasiswa: {
    screen: ListMahasiswa
  },
},
  {
    initialRouteName: 'uasLogin',
  },
  {
    contentComponent: props => <Sidebar {...props} />
  }
);

export default Screens;
