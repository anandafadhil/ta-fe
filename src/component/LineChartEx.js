import React, { PureComponent } from 'react';
import { Text, Box, Center } from "@chakra-ui/react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
function LineChartEx({ dataSKST }) {
    const data = [
        {
            name: 'Sem 1',
            uv: dataSKST[0].avg_skst_sem1,
            pv: dataSKST[1].skst_sem1,
        },
        {
            name: 'Sem 2',
            uv: dataSKST[0].avg_skst_sem2,
            pv: dataSKST[1].skst_sem2,
        },
        {
            name: 'Sem 3',
            uv: dataSKST[0].avg_skst_sem3,
            pv: dataSKST[1].skst_sem3,
        },
        {
            name: 'Sem 4',
            uv: dataSKST[0].avg_skst_sem4,
            pv: dataSKST[1].skst_sem4,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <div>
                <Box alignItems='center' justifyContent='center'>
                    <Center>
                        <Text mb='6px' fontSize="18px" color="white" fontWeight="bold">
                            Perbandingan Progresi Kenaikan SKS Total Mahasiswa x Avg Jurusan
                        </Text>
                    </Center>
                </Box>
            </div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 10,
                    right: 25,
                    bottom: 30,
                    left: 10,
                }}
            >                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: 'white' }} padding={{ left: 30, right: 30 }} />
                <YAxis tick={{ fill: 'white' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#ffd400" activeDot={{ r: 8 }} strokeWidth={4} name="SKS Total Mahasiswa" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={4} name="Average SKS Total Prodi" />
            </LineChart>
        </ResponsiveContainer>
    );
}
export default LineChartEx;