import React, {memo} from "react";
import {Box, Typography} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

type AaplInfoProps = {
    price?: number;
    change?: number;
    percentChange?: number;
}
const changePreformat = new Intl.NumberFormat('en-US', {signDisplay: 'always'});
const iconStyles = {
    fontSize: "4rem",
    marginLeft: '-1rem',
}
export const AaplInfo = memo(({price, change, percentChange}: AaplInfoProps) => {
    const isUp = change && change >= 0;
    return (
        <Box>
            <Box display="flex">
                <Typography color={ isUp ? '#388e3c' : 'rgb(217, 30, 24)'} width="2rem" lineHeight={1}>
                    {isUp ? <ArrowDropUpIcon sx={iconStyles} /> : <ArrowDropDownIcon sx={iconStyles}/>}
                </Typography>
                <Typography variant={"h3"} fontSize='4rem' lineHeight={1}>
                    {price}
                </Typography>
            </Box>

            <Box display={'flex'} alignItems={'end'} justifyContent={'space-between'}
                 color={ isUp ? '#388e3c' : 'rgb(217, 30, 24)'}
            >
                <Typography variant={"h5"}>{change ? changePreformat.format(change) : '--.--'}</Typography>
                <Typography variant={"h5"}>({percentChange ? changePreformat.format(percentChange) : '--.--'}%)</Typography>
            </Box>
        </Box>
    );
})
