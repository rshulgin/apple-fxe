import React from 'react';
import {QueryClientProvider} from "react-query";

import {Header} from "./components/Header/Header";
import {socket, SocketProvider} from "./api/subscriber";
import {queryClient} from "./api/api.hooks";
import {TabsRouter} from "./components/TabsRouter";

function App() {
  return (
    <div>
        <SocketProvider client={socket}>
            <Header />
        </SocketProvider>
        <QueryClientProvider client={queryClient}>
            <TabsRouter />
        </QueryClientProvider>
    </div>
  );
}

export default App;
