import React, {useState} from "react";
import {useTimePeriodParams} from "./timePeriodParams.hook";
import {useCandles} from "../../api/api.hooks";
import {Box} from "@mui/material";
import {TimePeriodTabs} from "./TimePeriodTabs";
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

const valueFormatter = (params: GridValueFormatterParams) => new Intl.NumberFormat('en-US', {minimumFractionDigits: 2}).format(params.value);
const valueDateFormatter = (params: GridValueFormatterParams) => new Intl.DateTimeFormat('en-US', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(params.value));

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
            const value = new Intl.NumberFormat('en-US', {signDisplay: 'always', maximumFractionDigits: 2}).format(percent)
            return (<Box color={!percent ? undefined : percent > 0 ? 'green' : 'red'}>{value}%</Box>)
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
