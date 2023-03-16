import {QueryClient, useQuery} from 'react-query';

export const queryClient = new QueryClient()

type UrlParams = {
    period: string,
    Precision: string,
    StartTime: string,
    EndTime: string,
}

const urlParams = {
    Identifier: "AAPL.XNAS",
    IdentifierType: "Symbol",
    AdjustmentMethod: "All",
    IncludeExtended: "False",
    period: "30",
    Precision: "Minutes",
    StartTime: "02/22/2023",
    EndTime: "03/01/2023%2023:59",
    _fields: "ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume"
}

const apiURL = process.env.REACT_APP_SUBSCRIBE_URL ?? 'https://test.fxempire.com/api/v1/en/stocks/chart/candles';
const withQueryParams = (url: string,params: Record<string, string>) => {
    const queryString = Object.entries(params).map(([key,value]) => `${key}=${value}`).join('&');
    return `${url}?${queryString}`;
};
const getData = (params: Partial<UrlParams>) => fetch(withQueryParams(apiURL, {...urlParams, ...params})).then(res =>
    res.json()
);

type CandlesProps = Array<{
    "StartDate": string;
    "StartTime": string;
    "Open": number;
    "High": number;
    "Low": number;
    "Close": number;
    "Volume": number;
    "Date": string;
}>

export const useCandles = (params: Partial<UrlParams>) => {
    return useQuery<CandlesProps>(['CANDLES', params], () => getData(params), {staleTime: 5, keepPreviousData: true})
}
