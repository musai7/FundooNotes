import {SET_USER_NAME, FETCH_LABELS} from './actions';

const initialState = {
  name: '',
  labelData: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
    case FETCH_LABELS:
      return {...state, labelData: action.payload};

    default:
      return state;
  }
}

export default userReducer;
