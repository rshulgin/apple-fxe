import {useSubscriber} from "../../api/subscriber";
import {SubscriberMessageData} from "../../types";
import {instrumentsForList} from "../../data";
import {Box} from "@mui/material";
import React, {useMemo} from "react";

const rowNumberFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2});
const formatName = (name: string) => name.split('-').slice(1).map(str => str.toUpperCase()).join('/');
const formatPrice = (price?: number) => price && rowNumberFormat.format(price);
export function HeaderLine() {
    const {data} = useSubscriber<SubscriberMessageData>({instruments: instrumentsForList});
    const list = useMemo(() => Object.entries(data).filter(([_, item]) => item?.last), [data]);
    return (
        <Box overflow='auto' width='100%' mb='12px'>
            <Box height='30px' display='flex' flexWrap='nowrap'>
                {list.map(([name, item]) => (
                    <Box key={name} border='1px solid rgb(238, 238, 238)' padding='5px' whiteSpace='nowrap'>
                        <b>{formatName(name)}</b>: {formatPrice(item?.last)}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
