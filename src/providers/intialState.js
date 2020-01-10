import {auth} from '../helpers/constants';
export const APP_STATE = {
  isLoading: false,
  currentScreen: 'firstName',
  submitting: false,
};

export const AUTH_STATE = {
  isLoggedIn: false,
  signup: {
    firstName: '',
    lastName: '',
    sme_user_role: {
      name: auth.DEFAULT_ONBOARDING_ROLE.roleName,
      description: auth.DEFAULT_ONBOARDING_ROLE.roleDescription,
      sme_user_permission: [
        {
          code: auth.DEFAULT_PERMISSIONS.CREATE,
        },
      ],
    },
    sme: {
      name: '',
    },
    sme_user_auth: {
      email: '',
      password: '',
    },
  },

  login: {
    email: '',
    password: '',
  },
};
