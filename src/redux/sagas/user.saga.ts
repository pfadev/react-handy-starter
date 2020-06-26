import { takeLatest } from "redux-saga/effects";
import axiosMiddleware from "../middlewares/axios.middleware";

export default function* () {
  yield takeLatest("LOAD_ALL_USERS", axiosMiddleware);
  yield takeLatest("LOAD_USER", axiosMiddleware);
}
