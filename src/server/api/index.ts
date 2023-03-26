import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { get } from "lodash";
import Mock_All from "src/mocks/mock-all";

const VIEW_MOCK: Record<string, any> =
  process.env.NODE_ENV === "production" ? {} : Mock_All;

const getMock = <T = any>(path?: string): T | null => {
  if (process.env.NODE_ENV === "production" || !VIEW_MOCK || !path) return null;
  return get(VIEW_MOCK, path);
};

const axios = Axios.create({
  baseURL: "/",
  responseType: "json",
});

declare module "axios" {
  export interface AxiosRequestConfig {
    mock?: string;
    query?: string;
  }
}

const _get = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | null> => {
  if (!url) return getMock<T>(config?.mock);

  return axios
    .get(url, config)
    .then((response: AxiosResponse<T>) => {
      const res = response.data;
      return res;
    })
    .catch((reason: AxiosError) => {
      console.log("Server get ", reason.message);
      return getMock<T>(config?.mock);
    });
};

const _post = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | null> => {
  if (!url) return getMock<T>(config?.mock);
  return axios
    .post<T>(url, config)
    .then((response) => {
      const res = response.data;
      return res;
    })
    .catch((reason: AxiosError) => {
      console.log("Server post ", reason.message);
      return getMock<T>(config?.mock);
    });
};

const sapi = {
  axios,
  get: _get,
  post: _post,
};

export default sapi;
