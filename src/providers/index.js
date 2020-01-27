import AppState from './App';
import AuthState from './Auth';

// store all our unstated Containers
const store = [new AppState(), new AuthState()];
export {store};
