export const initialState = {
  all: {
    loading: false,
  },
  detail: {
    loading: false,
  },
};

export default (state = initialState, { type, ...action }) => {
  switch (type) {
    case "LOAD_ALL_USERS_REQUESTING":
      return {
        ...state,
        all: { ...state.all, loading: true },
      };

    case "LOAD_ALL_USERS_SUCCESS":
      return {
        ...state,
        all: { ...state.all, loading: false, data: action.data },
      };

    case "LOAD_ALL_USERS_FAILURE":
      return {
        ...state,
        all: { ...state.all, loading: false, error: action.error },
      };
    case "LOAD_USER_REQUESTING":
      return {
        ...state,
        detail: { ...state.detail, loading: true },
      };

    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        detail: { ...state.detail, loading: false, data: action.data },
      };

    case "LOAD_USER_FAILURE":
      return {
        ...state,
        detail: { ...state.detail, loading: false, error: action.error },
      };

    default:
      return state;
  }
};
