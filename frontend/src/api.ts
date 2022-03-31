import { api } from 'jimmi-api-client/mod.ts';
import config from "./config.ts";

const apiConfig = api.createConfiguration({
  baseServer: new api.ServerConfiguration(config.apiBaseUrl),
});

const jimmiApi = new api.DefaultApi(apiConfig);

export default jimmiApi;
