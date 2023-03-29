import React from "react";
import {Box, Paper, Typography} from "@mui/material";
import {useSubscriber} from "../../api/subscriber";
import {AaplInfo} from "./AaplInfo";
import {SubscriberMessageData} from "../../types";
import {instruments} from "../../data";
import {HeaderLine} from "./HeaderLine";


const preformatDate = new Intl
    .DateTimeFormat('en-GB', {dateStyle: 'medium', timeStyle: 'long', timeZone: 'UTC'});

export const Header = () => {
    const {data} = useSubscriber<SubscriberMessageData>({instruments});
    const info = data?.["s-aapl"];
    const lastUpdate = info?.lastUpdate ? preformatDate.format(new Date(info?.lastUpdate)) : '----';
    return (
        <Box mt={5} mb={1}>
            <HeaderLine/>
            <Paper elevation={2}>
                <Box px={5} py={2} display='flex'>
                    <Box flexGrow={1}>
                        <Typography variant="h3" component="div">
                            Apple Inc
                        </Typography>
                        <Typography color={'rgb(153, 153, 153)'} fontWeight='600'>
                            <span>As of: {lastUpdate}</span>
                        </Typography>
                    </Box>
                    <AaplInfo
                        price={info?.last}
                        percentChange={info?.percentChange}
                        change={info?.change}
                    />
                </Box>
            </Paper>
        </Box>
    )
}
