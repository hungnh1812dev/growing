import useSWR, { SWRResponse } from 'swr';
import Axios, { AxiosError } from 'axios';
import { get } from 'lodash';
import useSWRImmutable from 'swr/immutable';

const axios = Axios.create({
    baseURL: '/',
    responseType: 'json',
});

export interface ClientPagePropsCache {
    pageProps: any;
}

export interface FetcherDataType {
    url: string;
    query?: string;
    selector?: string;
}

let _cache: ClientPagePropsCache = { pageProps: undefined };
export const setPagePropCache = (pageProps: any) => {
    _cache = { ..._cache, pageProps: pageProps };
};

const fetchData = (config: FetcherDataType) => {
    if (config.query)
        return axios
            .post(config.url)
            .then((response) => (config.selector ? get(response.data, config.selector) : response.data))
            .catch((err: AxiosError) => err.message);
    return axios
        .get(config.url)
        .then((response) => (config.selector ? get(response.data, config.selector) : response.data))
        .catch((err: AxiosError) => err.message);
};

export const useClientData = <T = any>(key: string, options: FetcherDataType) => {
    return useSWR<T>(key, {
        fetcher: () => fetchData(options),
    });
};

export const useStaticClientData = <T = any>(key: string, options: FetcherDataType): SWRResponse<T, any> => {
    const cache = get(_cache.pageProps, key);

    return useSWRImmutable(key, {
        fetcher: () => fetchData(options),
        fallbackData: cache,
    });
};
