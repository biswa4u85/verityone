'use strict';
import React, { Component } from "react";
import { WebView } from 'react-native'

export default class CustomPage extends Component {
  constructor(props) {
    super(props);
    this.state = { html: '' };
    this.fetchPage = this.fetchPage.bind(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <WebView html={this.state.html} />
    )
  }
}
