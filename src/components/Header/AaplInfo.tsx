import React, {memo} from "react";
import {Box, Typography} from "@mui/material";

type AaplInfoProps = {
    price?: number;
    change?: number;
    percentChange?: number;
}
const changePreformat = new Intl.NumberFormat('en-US', {signDisplay: 'always'});
export const AaplInfo = memo(({price, change, percentChange}: AaplInfoProps) => (
        <Box>
            <Typography variant={"h3"} fontSize='4rem' lineHeight={1}>
                {price}
            </Typography>
            <Box display={'flex'} alignItems={'end'} justifyContent={'space-between'}
                color={change && change > 0 ? '#388e3c' : 'rgb(217, 30, 24)'}
            >
                <Typography variant={"h5"}>{change ? changePreformat.format(change) : '--.--'}</Typography>
                <Typography variant={"h5"}>({percentChange ? changePreformat.format(percentChange) : '--.--'}%)</Typography>
            </Box>
        </Box>
))
