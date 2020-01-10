import React from 'react';
import {Container} from 'unstated';
import {APP_STATE} from '../intialState';
export default class AppState extends Container {
  constructor(props) {
    super(props);
  }
  state = APP_STATE;

  setLoading = condition => {
    this.setState({
      isLoading: condition,
    });
  };

  setCurrentScreen = async screen => {
    await this.setState({
      currentScreen: screen,
    });
  };

  setSubmitting = condition => {
    this.setState({
      isLoading: condition,
      submitting: condition,
    });
  };
}
