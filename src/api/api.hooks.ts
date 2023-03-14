import {QueryClient, useQuery} from 'react-query';

export const queryClient = new QueryClient()

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
const getData = () => fetch(withQueryParams(apiURL, urlParams)).then(res =>
    res.json()
);

export const useCandles = () => {
    return useQuery('CANDLES', getData)
}
