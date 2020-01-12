import React from 'react';
import {Container} from 'unstated';
import {APP_STATE} from '../intialState';
export default class AppState extends Container<any | Object> {
  constructor(props) {
    super(props);
  }
  state = APP_STATE;

  setLoading = condition => {
    this.setState({
      ...this.state,
      isLoading: condition,
    });
  };

  setCurrentScreen = async screen => {
    await this.setState({
      currentScreen: screen,
    });
  };

  setSubmitting = (condition: Boolean) => {
    this.setState({
      ...this.state,
      isLoading: condition,
      submitting: condition,
    });
  };
}
