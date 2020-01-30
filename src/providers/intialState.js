import {auth} from '../helpers/constants';
export const APP_STATE = {
  isLoading: false,
  loadingMessage: 'Loading...',
  submitting: false,
  currentUser: {},
  currentUserOrganisations: {
    loading: true,
    data: [],
  },
  selectedOrganisation: {},
};

export const AUTH_STATE = {
  isLoggedIn: false,
  signup: {
    firstname: '',
    lastname: '',
    organisationname: '',
    organisationlocation: '',
    email: '',
    password: '',
    currency: '',
  },

  login: {
    email: '',
    password: '',
  },
};
