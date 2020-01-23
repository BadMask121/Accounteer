import React, {Component} from 'react';
import Dashboard from '../../components/screens/Dashboard';
import subscriber from 'subscriber';
import {UserService} from 'providers/App/services';
import AsyncStorage from '@react-native-community/async-storage';
import {auth} from 'helpers/constants';
class Index extends Component {
  userServ = new UserService();
  constructor(props: any) {
    super(props);
  }

  state = {
    userDetails: {},
  };

  componentDidMount = () => {
    this.userServ.getCurrentUserToken().then((id: any) => {
      this.userServ
        .getOrganisationsByUserId(id)
        .then(
          async res =>
            await this.props.appstate.setCurrentUserOrganisations(res, false),
        )
        .catch(err => console.log(err));
    });
  };

  render() {
    return (
      <Dashboard
        userDetails={this.props.appstate.state.currentUser}
        organisationsData={this.props.appstate.state.currentUserOrganisations}
        getOrganisationsByUserId={this.getOrganisationsByUserId}
        props={this.props}
      />
    );
  }
}

export default subscriber(Index);
