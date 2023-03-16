import React, {memo, useCallback} from 'react';
import {
    Area,
    ComposedChart, Label,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';



type ChartProps = {
    data: Array<{
        value: number;
        date: Date;
    }>,
};


export const Chart = memo(({data}: ChartProps) => {

    const tickFormatter = useCallback((date: Date) => {
        return new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(date);
    }, []);

    return (
        <ResponsiveContainer width={'100%'} height={600}>
            <ComposedChart
                data={data}
                margin={{
                    top: 50,
                }}
            >
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgb(100, 171, 248)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="rgb(100, 171, 248)" stopOpacity={0}/>
                    </linearGradient>
                    <filter x="-0.1" y="0" width="2" height="1" id="solid">
                        <feFlood floodColor="#388e3c" result="bg" />
                        <feMerge>
                            <feMergeNode in="bg"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <XAxis dataKey="date" tickFormatter={tickFormatter}/>
                <YAxis orientation="right" domain={['auto', 'auto']} tickCount={8}/>
                <Area dataKey="value" fillOpacity={1} fill="url(#color)"/>
                <Tooltip />
                <ReferenceLine
                    y={data.at(-1)?.value}
                    stroke="#388e3c"
                    strokeDasharray="3 3"
                >
                    <Label
                        value={data.at(-1)?.value}
                        offset={5}
                        position="right"
                        fill="white"
                        filter="url(#solid)"
                    />
                </ReferenceLine>
            </ComposedChart>
        </ResponsiveContainer>
    );
})
