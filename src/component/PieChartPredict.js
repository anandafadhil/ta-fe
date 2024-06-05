import React, { PureComponent } from 'react';
import Select from "react-select";
import { Text, Box, Center } from "@chakra-ui/react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ["#7ABD7E", "#FF6961", "#E7ECFF", "#7ABD7E"];

const renderCustomizedLabelFull = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            className="text-xl font-popins font-semibold"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default class PieChartPredict extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

    render() {
        const { dataPie } = this.props;
        console.log("pie", dataPie)
        const data = [
            { name: 'Tepat Waktu', value: dataPie?.avg_grad_time },
            { name: 'Tidak Tepat Waktu', value: (1 - dataPie?.avg_grad_time) },
        ];

        return (
            <ResponsiveContainer width="100%" height="95%" >
                <div>
                    <Box >
                        <Box>
                            <Center>
                                <Text mt='4px' mb='6px' fontSize="18px" color="#545454" fontWeight="bold">
                                    Persentase Ketepatan Waktu Lulus Prodi                               </Text>
                            </Center>
                        </Box>
                    </Box>
                    {/* Divider */}
                    <Box mt="6" mb="4" height="4px" width="100%" bg="#EFF0F1"></Box>

                </div>

                <PieChart width={400} height={400} >
                    <Pie
                        data={data}
                        cx="50%"
                        cy="40%"
                        labelLine={false}
                        label={renderCustomizedLabelFull}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                </PieChart>
            </ResponsiveContainer>
        );
    }
}
