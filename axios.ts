import Axios from "axios";

import * as data from "./localtunnel.json";
console.log((<any>data).url);
export const axios = Axios.create({
  baseURL: (<any>data).url,
});
