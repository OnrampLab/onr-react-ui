import { reducers as authReducers } from '@onr/auth';
import { reducers as wrapperReducers } from '@onr/core';
import { reducers as accountReducers } from '@onr/plugin-account';
import { combineReducers } from 'redux';

export default combineReducers({
  ...wrapperReducers,
  ...accountReducers,
  ...authReducers,
});
