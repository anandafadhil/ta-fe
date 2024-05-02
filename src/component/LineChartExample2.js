import React, { PureComponent } from 'react';
import Select from "react-select";
import { Text, Box, Center } from "@chakra-ui/react";
import {
    ComposedChart,
    BarChart,
    Line,
    Area,
    Cell,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
];

const normalizedData = data.map(item => {
    const total = item.uv + item.pv;
    return {
        ...item,
        uvPercent: (item.uv / total) * 100,
        pvPercent: (item.pv / total) * 100
    };
});

const newOptions = [
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" }
];

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

    render() {
        return (
            <ResponsiveContainer width="100%" height="90%">
                <div>
                    <Box mb='40px' alignItems='center' justifyContent='center'>
                        <Box>
                            <Center>
                                <Text mt='4px' mb='6px' fontSize="18px" color="black" fontWeight="bold">
                                    Progresi Ketepatan Waktu Lulus Mahasiswa
                                </Text>
                            </Center>
                        </Box>


                    </Box>

                </div>
                <BarChart
                    width={500}
                    height={300}
                    data={normalizedData}
                    margin={{
                        top: 20,
                        right: 25,
                        bottom: 35,
                        left: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                    <Bar dataKey="pvPercent" stackId="a" fill="#8884d8" name="PV" />
                    <Bar dataKey="uvPercent" stackId="a" fill="#82ca9d" name="UV" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
