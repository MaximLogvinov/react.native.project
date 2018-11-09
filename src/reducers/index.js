// outsource dependencies
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// local dependencies
import login from './login';
import tasks from './tasks';
import bestiary from './bestiary';
import { navReducer } from '../navigation/Navigator'

const reducers = {
    nav: navReducer,
    form: formReducer,
    login,
    tasks,
    bestiary
};
const allReducers = combineReducers(reducers);
export default allReducers;