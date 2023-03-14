import {BrowserRouter, Link, Route, Routes, useLocation} from "react-router-dom";
import {Box, Tab, Tabs} from "@mui/material";
import React from "react";
import {Overview} from "./tabs/Overview/Overview";
import {History} from "./tabs/History";

function TabList() {
    const location = useLocation();
    const currentTab = location.pathname;

    return (
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={currentTab}>
                <Tab label="Overview" value="/" to="/" component={Link}/>
                <Tab label="History" value="/history" to="/history" component={Link}/>
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
