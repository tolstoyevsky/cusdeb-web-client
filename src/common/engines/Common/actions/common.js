import { createAction } from "redux-actions";
import { FETCH_DEVICE_LIST, SET_DEVICE_LIST } from "../constants/common";

export const fetchDeviceList = createAction(FETCH_DEVICE_LIST);

export const setDeviceList = createAction(SET_DEVICE_LIST);
