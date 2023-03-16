import React, {useMemo, useState} from "react";
import {Box, styled, Tab, Tabs} from "@mui/material";
import {Chart} from "./Chart";
import {useCandles} from "../../../api/api.hooks";

const StyledTab = styled(Tab)(
    () => ({
        '&, &.Mui-selected': {
            fontSize: '18px',
            color: 'black',
            textTransform: 'capitalize',
        },
    }),
);

const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: 'black',
    }
});

const today = new Date();
const prevHour = new Date();
prevHour.setHours(prevHour.getHours() - 1);
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
        period: "1",
        Precision: "Hours",
        StartTime: formatDate(lastMonth),
        EndTime: `${formatDate(today)}%2023:59`,
    }
];

export const Overview = () => {
    const [tab, setTab] = useState("3");
    const params = useMemo(() => paramsMap[+tab], [tab]);
    const {data} = useCandles(params);
    const dataList = (data ?? []).map(row => ({value: row.Close, date: new Date(row.Date) }));
    return (
        <Box>
            <Box mt={1}>
                <StyledTabs value={tab} onChange={(e, v) => setTab(v)}>
                    <StyledTab label="1 Minute" value="0" />
                    <StyledTab label="5 Minutes" value="1"/>
                    <StyledTab label="1 Hour" value="2"/>
                    <StyledTab label="1 Week" value="3"/>
                </StyledTabs>
            </Box>
            <Chart data={dataList}/>
        </Box>
    )
}
