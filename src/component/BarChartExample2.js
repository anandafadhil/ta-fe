import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const newOptions = [
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" }
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="100%" height="90%">
        <div>
          <Box alignItems='center' justifyContent='center'>
            <Box >
              <Center>
                <Text mb='6px' fontSize="20px" color="black" fontWeight="bold">
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
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 25,
            bottom: 35,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
