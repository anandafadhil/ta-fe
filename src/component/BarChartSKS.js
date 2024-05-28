"use client";

import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";
import { fetchDatawithIDYear, fetchDatawithYear } from '../api/fetch';

function BarChartSKS({ sksBar }) {
    const [chartData, setChartData] = useState([
        { name: 'Semester 1', sks: sksBar[0].avg_sks_sem1 },
        { name: 'Semester 2', sks: sksBar[0].avg_sks_sem2 },
        { name: 'Semester 3', sks: sksBar[0].avg_sks_sem3 },
        { name: 'Semester 4', sks: sksBar[0].avg_sks_sem4 },
        { name: 'Semester 5', sks: sksBar[0].avg_sks_sem5 },
        { name: 'Semester 6', sks: sksBar[0].avg_sks_sem6 },
        { name: 'Semester 7', sks: sksBar[0].avg_sks_sem7 },
        { name: 'Semester 8', sks: sksBar[0].avg_sks_sem8 },
    ]);


    return (
        <ResponsiveContainer width="100%" height="90%" >
            <div>
                <Box alignItems='center' justifyContent='center' display='flex'>
                    <Box width='70%' alignItems='center' justifyContent='center' display='flex'>
                        <Center>
                            <Text fontSize="22px" color="#545454" fontWeight="bold">
                                Rata-rata SKS yang Diambil oleh Mahasiswa yang Lulus Tepat Waktu
                            </Text>
                        </Center>
                    </Box>
                </Box>
                {/* Divider */}
                <Box mt="3" mb="4" height="4px" width="100%" bg="#EFF0F1"></Box>
            </div>
            <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                    top: 10,
                    right: 35,
                    bottom: 35,
                    left: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: 'black' }} />
                <YAxis tick={{ fill: 'black' }} />
                <Tooltip />
                <Bar dataKey="sks" fill="#82ca9d" name="Rata-Rata SKS" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartSKS;