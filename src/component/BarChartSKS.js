"use client";

import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";
import { fetchDatawithIDYear, fetchDatawithYear } from '../api/fetch';

function BarChartSKS({ sksBar }) {
    const [chartData, setChartData] = useState([
        { name: '1', sks: sksBar[0].avg_sks_sem1 },
        { name: '2', sks: sksBar[0].avg_sks_sem2 },
        { name: '3', sks: sksBar[0].avg_sks_sem3 },
        { name: '4', sks: sksBar[0].avg_sks_sem4 },
        { name: '5', sks: sksBar[0].avg_sks_sem5 },
        { name: '6', sks: sksBar[0].avg_sks_sem6 },
        { name: '7', sks: sksBar[0].avg_sks_sem7 },
        { name: '8', sks: sksBar[0].avg_sks_sem8 },
    ]);


    return (
        <ResponsiveContainer width="100%" height="90%">
            <div>
                <Box alignItems='center' justifyContent='center'>
                    <Box>
                        <Center>
                            <Text mb='6px' fontSize="18px" color="white" fontWeight="bold">
                                Average SKS yang diperoleh per sem
                            </Text>
                        </Center>
                    </Box>
                </Box>
            </div>
            <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                    top: 20,
                    right: 25,
                    bottom: 35,
                    left: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: 'white' }}/>
                <YAxis tick={{ fill: 'white' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sks" fill="#82ca9d" name="Rata-Rata SKS"/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartSKS;