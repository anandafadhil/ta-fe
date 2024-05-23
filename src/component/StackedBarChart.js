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

const newOptions = [
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" }
];

export default class StackedBarChart extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

    render() {
        const { dataStacked } = this.props;
        const data = dataStacked.map(item => ({
            name: item.selected_year,
            tepatWaktu: item.tepat_grad,
            tidakTepatWaktu: item.tidak_tepat_grad,
        }));
        const normalizedData = data.map(item => {
            const total = item.tepatWaktu + item.tidakTepatWaktu;
            return {
                ...item,
                tepatWaktu: (item.tepatWaktu / total) * 100,
                tidakTepatWaktu: (item.tidakTepatWaktu / total) * 100
            };
        });
        return (
            <ResponsiveContainer width="100%" height="90%">
                <div>
                    <Box mb='40px' alignItems='center' justifyContent='center'>
                        <Box>
                            <Center>
                                <Text mt='4px' mb='6px' fontSize="18px" color="white" fontWeight="bold">
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
                    <XAxis dataKey="name" tick={{ fill: 'white' }}/>
                    <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: 'white' }} />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend wrapperStyle={{ color: 'white' }} />
                    <Bar dataKey="tepatWaktu" stackId="a" fill="#7ABD7E" name="Tepat Waktu" />
                    <Bar dataKey="tidakTepatWaktu" stackId="a" fill="#FF6961" name="Tidak Tepat Waktu" />
                </BarChart>
            </ResponsiveContainer>
        );  
    }
}
