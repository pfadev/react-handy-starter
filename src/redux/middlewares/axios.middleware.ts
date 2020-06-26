import { call, put } from "redux-saga/effects";

import axios from "../../helpers/axiosHelper";

export default function* (action) {
  const { type, ...params } = action;

  yield put({ type: `${type}_REQUESTING` });

  try {
    const { data } = yield call(axios, params);

    yield put({ type: `${type}_SUCCESS`, data });
  } catch (error) {
    yield put({ type: `${type}_FAILURE`, error });

    console.error(error);
  }
}
