import React, { PureComponent } from 'react';
import Select from "react-select";
import { Text, Box, Center } from "@chakra-ui/react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

const data = [
    { name: 'Tepat Waktu', value: 400 },
    { name: 'Tidak Tepat Waktu', value: 300 },
];

const newOptions = [
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" }
];

const RADIAN = Math.PI / 180;
const COLORS = ["#00205B", "#0D9FDB", "#E7ECFF", "#77DD77"];

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

export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

    render() {
        return (
            <ResponsiveContainer width="100%" height="95%">
                <div>
                    <Box >
                        <Box>
                            <Center>
                                <Text>
                                    Progresi Ketepatan Waktu Lulus Mahasiswa
                                </Text>
                            </Center>

                        </Box>
                        <Box width='100%' justifyContent='center' alignItems='center' display='flex'>
                            <Box width='100px'>
                                <Center>
                                    <Select
                                        width='100%'
                                        options={newOptions}
                                        styles={{
                                            option: (provided) => ({
                                                ...provided,
                                                color: 'black', // Set the font color to black
                                            })
                                        }}
                                    />
                                </Center>
                            </Box>
                        </Box>

                    </Box>

                </div>

                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabelFull}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={60} />

                </PieChart>
            </ResponsiveContainer>
        );
    }
}
