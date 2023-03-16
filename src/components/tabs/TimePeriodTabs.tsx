import {Box, styled, Tab, Tabs} from "@mui/material";
import React from "react";

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

export function TimePeriodTabs({onChange, value}: { value: string, onChange: (v: string) => void }) {
    return <Box mt={1}>
        <StyledTabs value={value} onChange={(e, v) => onChange(v)}>
            <StyledTab label="1 Minute" value="0"/>
            <StyledTab label="5 Minutes" value="1"/>
            <StyledTab label="1 Hour" value="2"/>
            <StyledTab label="1 Week" value="3"/>
        </StyledTabs>
    </Box>;
}
