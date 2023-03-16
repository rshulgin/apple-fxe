import {useMemo} from "react";

const today = new Date();
const yesterday = new Date();
yesterday.setHours(yesterday.getHours() - 24);
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US').format(date);
const paramsMap = [
    {
        period: "1",
        Precision: "Minutes",
        StartTime: formatDate(yesterday),
        EndTime: `${formatDate(today)}%2023:59`,
    },
    {
        period: "5",
        Precision: "Minutes",
        StartTime: formatDate(yesterday),
        EndTime: `${formatDate(today)}%2023:59`,
    },
    {
        period: "1",
        Precision: "Hours",
        StartTime: formatDate(yesterday),
        EndTime: `${formatDate(today)}%2023:59`,
    },
    {
        period: `${24 * 7}`,
        Precision: "Hours",
        StartTime: formatDate(lastMonth),
        EndTime: `${formatDate(today)}%2023:59`,
    }
];
export const useTimePeriodParams = (tab: number) => {
    return useMemo(() => paramsMap[tab], [tab]);
}
