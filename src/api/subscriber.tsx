import {PropsWithChildren, useContext, createContext, useEffect, useState, useCallback, useMemo} from "react";
const url = process.env.REACT_APP_SUBSCRIBE_URL ?? 'wss://wstest.fxempire.com?token=btctothemoon';

export const socket = new WebSocket(url);

const SocketContext = createContext(socket);
export const SocketProvider = ({children, client}: PropsWithChildren<{ client: WebSocket }>) => (
    <SocketContext.Provider value={client}>{children}</SocketContext.Provider>
)

type SubscriberInfo<T> = {data: Record<string, T | null>, pending: boolean};
export function useSubscriber<T>({instruments}: {instruments: string[]}): SubscriberInfo<T> {
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState<MessageEvent<string>>();
    const openHandler = useCallback(() => setConnected(true), []);
    const closeHandler = useCallback(() => setConnected(false), []);
    const client = useContext(SocketContext)
    const data = useMemo(() => {
        return Object.fromEntries(instruments.map(instrument => {
            const cachedValue = localStorage.getItem(instrument);
            return [instrument, cachedValue ? JSON.parse(cachedValue) : null]
        }));
    }, [instruments]);
    useEffect(() => {
        client.addEventListener('open', openHandler);
        client.addEventListener('close', closeHandler);
        return () => {
            client.removeEventListener('open', openHandler);
            client.removeEventListener('close', closeHandler);
        }
    }, [openHandler, closeHandler, client]);

    useEffect(() => {
        if(connected) {
            client.send(JSON.stringify({ type: "SUBSCRIBE", instruments }));
            return () => {
                client.send(JSON.stringify({ type: "UNSUBSCRIBE", instruments }));
            }
        }
    }, [connected, instruments, client]);

    client.addEventListener('message', (event: MessageEvent<string>) => {
        setMessage(event);
    });

    if (message) {
        const instrumentsMap = JSON.parse(message.data);
        Object.entries(instrumentsMap)
            .forEach(([instrument, data])=> localStorage.setItem(instrument, JSON.stringify(data)));
        return {pending: !connected, data: instrumentsMap};
    }

    return { pending: true, data };
}
