import React, {useState} from "react";
import {Box} from "@mui/material";
import {Chart} from "./Chart";
import {useCandles} from "../../../api/api.hooks";
import {TimePeriodTabs} from "../TimePeriodTabs";
import {useTimePeriodParams} from "../timePeriodParams.hook";

export const Overview = () => {
    const [tab, setTab] = useState("3");
    const params = useTimePeriodParams(+tab);
    const {data} = useCandles(params);
    const dataList = (data ?? []).map(row => ({value: row.Close, date: new Date(row.Date) }));
    return (
        <Box>
            <TimePeriodTabs value={tab} onChange={setTab}/>
            <Chart data={dataList}/>
        </Box>
    )
}
