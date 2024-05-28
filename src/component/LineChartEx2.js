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
    console.log("datasss", dataSKST)
    const data = [
        {
            name: 'Sem 1',
            uv: dataSKST[0].avg_ipk_sem1,
            pv: dataSKST[1].ipk_sem1,
        },
        {
            name: 'Sem 2',
            uv: dataSKST[0].avg_ipk_sem2,
            pv: dataSKST[1].ipk_sem2,
        },
        {
            name: 'Sem 3',
            uv: dataSKST[0].avg_ipk_sem3,
            pv: dataSKST[1].ipk_sem3,
        },
        {
            name: 'Sem 4',
            uv: dataSKST[0].avg_ipk_sem4,
            pv: dataSKST[1].ipk_sem4,
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
                            Kenaikan IPK                        
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
                <Line type="monotone" dataKey="pv" stroke="#ffd400" activeDot={{ r: 8 }} strokeWidth={4} name="IPK Mahasiswa" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={4} name="Average IPK Prodi" />
            </LineChart>
        </ResponsiveContainer>
    );
}
export default LineChartEx;