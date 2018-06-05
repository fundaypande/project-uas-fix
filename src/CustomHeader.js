import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert
} from "react-native";

import { Header, Body, Title, Content, Left, Icon, Right } from 'native-base'

const CustomHeader = props => (
  <Header>
      <Left><Icon name="ios-menu" onPress={() => props.onPress} /></Left>
      <Body>
          <Title>{props.title}</Title>
      </Body>
      <Right />
  </Header>
);

export default CustomHeader;
