export const initialState = {
  data: [],
  loading: true,
  error: null,
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
