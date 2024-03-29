import React, {useState} from "react";
import {useTimePeriodParams} from "./timePeriodParams.hook";
import {useCandles} from "../../api/api.hooks";
import {Box} from "@mui/material";
import {TimePeriodTabs} from "./TimePeriodTabs";
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

const rowNumberFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2});
const valueFormatter = (params: GridValueFormatterParams) => rowNumberFormat.format(params.value);

const rowDateTimeFormat = new Intl.DateTimeFormat('en-US', {dateStyle: 'medium', timeStyle: 'short'});
const valueDateFormatter = (params: GridValueFormatterParams) => rowDateTimeFormat.format(new Date(params.value));

const rowPercentFormat = new Intl.NumberFormat('en-US', {signDisplay: 'always', maximumFractionDigits: 2});

const columns: GridColDef[] = [
    {
        field: 'Date',
        width: 150,
        flex: 1,
        valueFormatter: valueDateFormatter
    },
    {
        field: 'High',
        type: 'number',
        width: 150,
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        valueFormatter,
    },
    {
        field: 'Low',
        type: 'number',
        width: 110,
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        valueFormatter,
    },
    {
        field: 'Open',
        type: 'number',
        width: 150,
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        valueFormatter,
    },
    {
        field: 'Close',
        type: 'number',
        width: 110,
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        valueFormatter,
    },
    {
        field: 'change',
        headerName: '% Change',
        width: 150,
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => {
            const percent = 100 - (100 / params.row.Open * params.row.Close);
            const value = rowPercentFormat.format(percent)
            return (<Box color={!percent ? undefined : percent > 0 ? '#388e3c' : 'rgb(217, 30, 24)'}>{value}%</Box>)
        },
    },
];
export const History = () => {
    const [tab, setTab] = useState("3");
    const params = useTimePeriodParams(+tab);
    const {data} = useCandles(params);
    const rows = data ?? [];
    return (
        <Box>
            <TimePeriodTabs value={tab} onChange={setTab}/>
            <Box width="100%" mt={2}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                        sorting: {
                            sortModel:[{field: 'Date', sort: 'desc'}]
                        },
                    }}
                    pageSizeOptions={[8, 20, 50, 100]}
                    getRowId={(row) => row.Date}
                    autoHeight
                />
            </Box>
        </Box>
    )
}
