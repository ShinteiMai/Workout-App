import Axios from "axios";

import * as data from "./localtunnel.json";

export const axios = Axios.create({
  baseURL: (<any>data).url,
});
