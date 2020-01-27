import React from 'react';
import {Container} from 'unstated';
import {APP_STATE} from '../intialState';
export default class AppState extends Container<any | Object> {
  constructor(props) {
    super(props);
  }
  state = APP_STATE;

  resetState = async () => {
    await this.setState(APP_STATE);
    return;
  };

  setLoading = (condition: Boolean) => {
    this.setState({
      ...this.state,
      isLoading: condition,
    });
  };

  setCurrentScreen = async (screen: any) => {
    await this.setState({
      ...this.state,
      currentScreen: screen,
    });
  };

  // set active current user details
  setCurrentUser = async (details: any) => {
    await this.setState({
      ...this.state,
      currentUser: details,
    });

    return this.state.currentUser;
  };

  // set active current user organisation data
  setCurrentUserOrganisations = async (details: any, loading: Boolean) => {
    await this.setState({
      ...this.state,
      currentUserOrganisations: {
        loading,
        data: details,
      },
    });
    return this.state.currentUserOrganisations;
  };
  // set active organisation
  setSelectedOrganisation = async (details: any) => {
    await this.setState({
      ...this.state,
      selectedOrganisation: {
        ...details,
      },
    });
    return this.state.selectedOrganisation;
  };

  setSubmitting = async (condition: Boolean) => {
    await this.setState({
      ...this.state,
      isLoading: condition,
      submitting: condition,
    });

    return;
  };
}
