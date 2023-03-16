import {BrowserRouter, Link, Route, Routes, useLocation} from "react-router-dom";
import {Box, styled, Tab, Tabs} from "@mui/material";
import React from "react";
import {Overview} from "./tabs/Overview/Overview";
import {History} from "./tabs/History";

const StyledTab = styled(Tab<typeof Link>)(
    () => ({
        '&, &.Mui-selected': {
            fontSize: '20px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            padding: '20px 40px',
        },
    }),
);

function TabList() {
    const location = useLocation();
    const currentTab = location.pathname;

    return (
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={currentTab}>
                <StyledTab label="Overview" value="/" to="/" component={Link}/>
                <StyledTab label="History" value="/history" to="/history" component={Link}/>
            </Tabs>
        </Box>
    );
}

export function TabsRouter() {
    return (
        <BrowserRouter>
            <Box sx={{width: '100%'}}>
                <TabList/>
                <Routes>
                    <Route path="/" element={<Overview/>}/>
                    <Route path="/history" element={<History/>}/>
                </Routes>
            </Box>
        </BrowserRouter>
    );
}
