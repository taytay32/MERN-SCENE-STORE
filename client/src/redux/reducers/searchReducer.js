const SEARCH = "SEARCH";

export const searchAction = (query) => (dispatch) => {
  dispatch({
    type: SEARCH,
    payload: query,
  });
};

export const searchReducer = (state = "", action) => {
  switch (action.type) {
    case SEARCH:
      return action.payload;
    default:
      return state;
  }
};
