import axios from "axios";

import config from "../config";

export default (params: any) => {
  const data = { ...params };

  if (config.apiUrl) data.baseUrl = config.apiUrl;

  return axios(data);
};
