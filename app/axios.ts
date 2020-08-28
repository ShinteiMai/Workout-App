import Axios from "axios";

import * as data from "./tools-buffer/localtunnel.json";

console.log(data);

export const axios = Axios.create({
  baseURL: (<any>data).url,
});
