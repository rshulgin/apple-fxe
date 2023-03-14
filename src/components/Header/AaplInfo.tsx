import React, {memo} from "react";
import {Box, Typography} from "@mui/material";

const preformatDate = (dateString: string) => new Intl
    .DateTimeFormat('en-GB', {dateStyle: 'medium', timeStyle: 'long', timeZone: 'America/New_York'})
    .format(new Date(dateString))
type AaplInfoProps = {
    price?: number;
    change?: number;
    percentChange?: number;
    lastUpdate?: string;
}
export const AaplInfo = memo(({price, change, lastUpdate, percentChange}: AaplInfoProps) => (
    <Box ml={3}>
        <Box display={'flex'} alignItems={'end'} justifyContent={'space-between'}>
            <Typography fontSize={32} fontWeight={'bold'} lineHeight={1}>
                {price}
            </Typography>
            <Typography
                fontSize={18}
                color={change && change > 0 ? 'rgb(80, 126, 17)' : 'rgb(217, 30, 24)'}
            >
                {change} ({percentChange}%)
            </Typography>
        </Box>

        <Typography fontSize={12} color={'rgb(153, 153, 153)'}>
            <span>in: UDS</span>
            <span>&nbsp;•&nbsp;</span>
            <span>As of: {lastUpdate ? preformatDate(lastUpdate) : '-'}</span>
        </Typography>
    </Box>
))
