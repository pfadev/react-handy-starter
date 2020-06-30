import axios from "axios";

import config from "../config";

export default (params) => {
  const data = { ...params };

  if (config.apiUrl) data.baseURL = config.apiUrl;

  return axios(data);
};
