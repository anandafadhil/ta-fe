import Select from "react-select";
import { Text, Box, Center } from "@chakra-ui/react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import React, { useEffect, useState, PureComponent } from "react";

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
    const width = window.innerWidth;

    let fontSize;
    if (width < 600) {
        fontSize = '18px';
    } else if (width < 900) {
        fontSize = '20px';
    } else if (width < 1200) {
        fontSize = '24px';
    } else {
        fontSize = '30px';
    }
    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            className="font-popins font-semibold"
            style={{ fontSize }}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// export default class PieChartExample extends PureComponent {
//     static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

//     render() {
//         const { dataPie } = this.props;
//         const data = [
//             { name: 'Tepat Waktu', value: dataPie[0]?.tepat_grad },
//             { name: 'Tidak Tepat Waktu', value: dataPie[0]?.tidak_tepat_grad },
//         ];
const PieChartExample = ({ dataPie }) => {
    const [outerRadius, setOuterRadius] = useState(150);

    useEffect(() => {
        const updateOuterRadius = () => {
            const width = window.innerWidth;
            if (width < 600) {
                setOuterRadius(80);
            } else if (width < 900) {
                setOuterRadius(100);
            } else if (width < 1200) {
                setOuterRadius(120);
            } else {
                setOuterRadius(150);
            }
        };

        updateOuterRadius();
        window.addEventListener('resize', updateOuterRadius);

        return () => window.removeEventListener('resize', updateOuterRadius);
    }, []);

    const data = [
        { name: 'Tepat Waktu', value: dataPie[0]?.tepat_grad },
        { name: 'Tidak Tepat Waktu', value: dataPie[0]?.tidak_tepat_grad },
    ];

    return (
        <ResponsiveContainer width="100%" height="95%">
            <div>
                {/* Text */}
                <Box >
                    <Box>
                        <Center>
                            <Text mt='4px' mb='6px'
                                fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '16px', xl: '16px', '2xl': '22px' }}
                                textAlign={{ base: 'center', sm: 'center', md: 'justify' }}
                                color="#545454" fontWeight="bold">
                                Persentase Ketepatan Waktu Lulus
                            </Text>
                        </Center>
                    </Box>
                </Box>

                {/* Divider */}
                <Box mt="1" mb="4" height="4px" width="100%" bg="#EFF0F1"></Box>

            </div>

            <PieChart width={500} height={500}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="40%"
                    labelLine={false}
                    label={renderCustomizedLabelFull}
                    outerRadius={outerRadius}
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

export default PieChartExample;

