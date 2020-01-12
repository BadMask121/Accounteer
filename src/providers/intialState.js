import {auth} from '../helpers/constants';
export const APP_STATE = {
  isLoading: false,
  loadingMessage: 'Loading...',
  submitting: false,
};

export const AUTH_STATE = {
  isLoggedIn: false,
  signup: {
    firstname: '',
    lastname: '',
    organisationname: '',
    email: '',
    password: '',
  },

  login: {
    email: '',
    password: '',
  },
};
