import React from "react";
import {Divider, Paper, Toolbar, Typography} from "@mui/material";
import {useSubscriber} from "../../api/subscriber";
import {AaplInfo} from "./AaplInfo";
import {SubscriberMessageData} from "../../types";


const instruments = ["s-aapl"];
export const Header = () => {
    const {data} = useSubscriber<SubscriberMessageData>({instruments});
    const info = data?.["s-aapl"];
    return (
        <Paper elevation={3}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Apple Inc
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <AaplInfo
                    price={info?.last}
                    percentChange={info?.percentChange}
                    change={info?.change}
                    lastUpdate={info?.lastUpdate}
                />
            </Toolbar>
        </Paper>
    )
}
