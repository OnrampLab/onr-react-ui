import { combineReducers } from 'redux';

import { reducers as wrapperReducers } from '@onr-react-ui/nextjs-core';

export default combineReducers({
  ...wrapperReducers,
});
