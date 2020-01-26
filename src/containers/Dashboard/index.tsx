import React, {Component, PureComponent, Suspense, lazy} from 'react';
import subscriber from 'subscriber';
import {UserService} from 'providers/App/services';
import {InteractionManager} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const Dashboard = lazy(() => import('../../components/screens/Dashboard'));

class Index extends PureComponent {
  userServ = new UserService();
  constructor(props: any) {
    super(props);
  }

  state = {
    userDetails: {},
  };

  componentDidUpdate = () => {
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
      <Suspense
        fallback={
          <Spinner
            visible={true}
            textContent={''}
            textStyle={{color: '#fff'}}
          />
        }>
        <Dashboard
          userDetails={this.props.appstate.state.currentUser}
          organisationsData={this.props.appstate.state.currentUserOrganisations}
          getOrganisationsByUserId={this.getOrganisationsByUserId}
          props={this.props}
        />
      </Suspense>
    );
  }
}

export default subscriber(Index);
