import React, { PureComponent } from 'react';
import Select from "react-select";
import { Text, Box, Center } from "@chakra-ui/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

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
                    {/* Text */}
                    <Box alignItems='center' justifyContent='center'>
                        <Box>
                            <Center>
                                <Text mt="1" fontSize="22px" color="#545454" fontWeight="bold">
                                    Progresi Ketepatan Waktu Lulus
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
                    data={normalizedData}
                    margin={{
                        top: 20,
                        right: 30,
                        bottom: 40,
                        left: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: 'black' }} />
                    <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: 'black' }} />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Bar dataKey="tepatWaktu" stackId="a" fill="#7ABD7E" name="Tepat Waktu" />
                    <Bar dataKey="tidakTepatWaktu" stackId="a" fill="#FF6961" name="Tidak Tepat Waktu" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
