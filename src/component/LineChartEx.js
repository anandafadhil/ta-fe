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
    const dataSKSArray = dataSKST || [];
    const data = [
        {
            name: 'Sem 1',
            uv: dataSKSArray[0]?.avg_skst_sem1,
            pv: dataSKSArray[1]?.skst_sem1,
        },
        {
            name: 'Sem 2',
            uv: dataSKSArray[0]?.avg_skst_sem2,
            pv: dataSKSArray[1]?.skst_sem2,
        },
        {
            name: 'Sem 3',
            uv: dataSKSArray[0]?.avg_skst_sem3,
            pv: dataSKSArray[1]?.skst_sem3,
        },
        {
            name: 'Sem 4',
            uv: dataSKSArray[0]?.avg_skst_sem4,
            pv: dataSKSArray[1]?.skst_sem4,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <div>
            <Box>
                    <Center>
                        <Text fontSize="18px" color="#545454"  fontWeight="bold">
                            Perbandingan
                        </Text>
                    </Center>

                    <Center>
                        <Text fontSize="18px" color="#545454" fontWeight="bold">
                            Kenaikan SKS                        
                            </Text>
                    </Center>
                </Box>
                {/* Divider */}
                <Box mt="2" mb="4" height="4px" width="100%" bg="#EFF0F1"></Box>

            </div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 10,
                    right: 25,
                    bottom: 100,
                    left: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: 'black' }} padding={{ left: 30, right: 30 }} />
                <YAxis tick={{ fill: 'black' }} />
                <Tooltip />
                <Line type="monotone" dataKey="pv" stroke="#ffd400" activeDot={{ r: 8 }} strokeWidth={4} name="SKS Total Mahasiswa" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={4} name="Average SKS Total Prodi" />
                <Legend/>
            </LineChart>
        </ResponsiveContainer>
    );
}
export default LineChartEx;