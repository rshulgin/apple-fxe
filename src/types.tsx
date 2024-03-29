export type SubscriberMessageData = {
    change: number;
    changeExtended: number;
    close: number;
    date: string;
    dateExtended: string;
    enterpriseValue: string;
    enterpriseValueEbitda: string;
    extendedHoursType: string;
    high: string;
    high52Weeks: number;
    historicalClose: Record<string, number>;
    last: number;
    lastExtended: number;
    lastUpdate: string;
    lastUpdateExtended: string;
    low: number;
    low52Weeks: number;
    marketCap: number;
    marketCapFormatted: string;
    marketOpen: Boolean;
    open: number;
    percentChange: number;
    percentChangeExtended: number;
    previousClose: number;
    tickTime: string;
    time: string;
    timeExtended: string;
    utcOffset: number;
    volume: number;
};
