import { call, put } from "redux-saga/effects";

import axios from "../../helpers/axios.helper";

export default function* (action) {
  const { reject, resolve, type, ...params } = action;

  yield put({ type: `${type}_REQUESTING` });

  try {
    const { data } = yield call(axios, params);

    yield put({ type: `${type}_SUCCESS`, data });
    if (resolve) resolve(data);
  } catch (error) {
    console.error(error);

    yield put({ type: `${type}_FAILURE`, error });
    if (reject) reject(error);
  }
}
