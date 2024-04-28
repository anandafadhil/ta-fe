import React, { PureComponent } from 'react';
import Select from "react-select";
import { Text, Box, Center } from "@chakra-ui/react";
import {
    ComposedChart,
    Line,
    Area,
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
        name: '2020',
        uv: 590,
    },
    {
        name: '2021',
        uv: 868,
    },
    {
        name: '2022',
        uv: 868,
    },
];

const newOptions = [
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" }
];

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/composed-chart-of-same-data-i67zd';

    render() {
        return (
            <ResponsiveContainer width="100%" height="90%">
                <div>
                    <Box  mb='40px' alignItems='center' justifyContent='center'>
                        <Box>
                            <Center>
                                <Text>
                                Progresi Ketepatan Waktu Lulus Mahasiswa
                                </Text>
                            </Center>
                        </Box>
                     

                    </Box>

                </div>
                <ComposedChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name"  />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="uv" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        );
    }
}
