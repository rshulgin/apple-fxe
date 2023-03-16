import React from 'react';
import {QueryClientProvider} from "react-query";

import {Header} from "./components/Header/Header";
import {socket, SocketProvider} from "./api/subscriber";
import {queryClient} from "./api/api.hooks";
import {TabsRouter} from "./components/TabsRouter";
import {Container} from "@mui/material";

function App() {
  return (
    <Container maxWidth="lg">
        <SocketProvider client={socket}>
          <Header />
        </SocketProvider>
        <QueryClientProvider client={queryClient}>
          <TabsRouter />
        </QueryClientProvider>
    </Container>
  );
}

export default App;
