import React, {Component, PureComponent, Suspense, lazy} from 'react';
import subscriber from 'subscriber';
import {UserService} from 'providers/App/services';
import {InteractionManager} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Root, Toast} from 'native-base';
const Dashboard = lazy(() => import('../../components/screens/Dashboard'));

class Index extends PureComponent {
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
        .catch(err => {
          let message = '';
          try {
            const messageOb = JSON.parse(err.message);
            if (messageOb.code === 404) message = messageOb.info;
            if (messageOb.code === 408) message = messageOb.info;
          } catch (error) {}

          Toast.show({
            text: message || 'Request Error',
            type: 'danger',
          });
        });
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
        <Root>
          <Dashboard
            userDetails={this.props.appstate.state.currentUser}
            organisationsData={
              this.props.appstate.state.currentUserOrganisations
            }
            getOrganisationsByUserId={this.getOrganisationsByUserId}
            props={this.props}
          />
        </Root>
      </Suspense>
    );
  }
}

export default subscriber(Index);
