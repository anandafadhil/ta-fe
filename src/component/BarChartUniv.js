"use client";

import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";
import { fetchDatawithIDYear, fetchDatawithYear } from '../api/fetch';

function BarChartUniv({ defaultBar }) {
  const [formData, setFormData] = useState({});
  const [optionsProdi, setOptionsProdi] = useState([]);
  const [chartData, setChartData] = useState([
    { name: '3.5', uv: defaultBar[0].jml_mhs_lulus_35 },
    { name: '4.0', uv: defaultBar[0].jml_mhs_lulus_40 },
    { name: '4.5', uv: defaultBar[0].jml_mhs_lulus_45 },
    { name: '5.0', uv: defaultBar[0].jml_mhs_lulus_50 },
    { name: '5.5', uv: defaultBar[0].jml_mhs_lulus_55 },
    { name: '6.0', uv: defaultBar[0].jml_mhs_lulus_60 },
  ]);

  const idUnivStat = typeof window !== 'undefined' ? localStorage.getItem("IDUNIVSTAT") : undefined;
  const parsId = JSON.parse(idUnivStat)
  useEffect(() => {
    const selectYear = [
      { value: "2011", label: "2011" },
      { value: "2012", label: "2012" },
      { value: "2013", label: "2013" },
      { value: "2014", label: "2014" },
      { value: "2015", label: "2015" },
      { value: "2016", label: "2016" },
      { value: "All", label: "All Time" }
    ];
    setOptionsProdi(selectYear);
  }, []);
  const handleChangeYear = async (selectedOption, fieldName) => {
    const newData = await fetchDatawithIDYear({
      endpoint: `/get-dist-grad-univ-filter`,
      selectedIDUniv : parsId,
      selectedYear: selectedOption.value,
    })
    // if (newData && newData.data) {
    //   setChartData(newData.data.map(item => ({
    //     name: item.name,
    //     uv: item.value,
    //   })));
    // }

    if (newData) {
      const formattedData = [
        { name: '3.5', uv: newData[0].jml_mhs_lulus_35 },
        { name: '4.0', uv: newData[0].jml_mhs_lulus_40 },
        { name: '4.5', uv: newData[0].jml_mhs_lulus_45 },
        { name: '5.0', uv: newData[0].jml_mhs_lulus_50 },
        { name: '5.5', uv: newData[0].jml_mhs_lulus_55 },
        { name: '6.0', uv: newData[0].jml_mhs_lulus_60 },
      ];
      console.log('format', formattedData)
      setChartData(formattedData);
    }

    if (selectedOption) {
      const { value } = selectedOption;
      setFormData({
        ...formData,
        [`${fieldName.name}Value`]: value
      });
    } else {
      setFormData({
        ...formData,
        [`${fieldName.name}Value`]: ''
      });
    }
  };

  return (
    <ResponsiveContainer width="100%" height="90%">
      <div>
        <Box alignItems='center' justifyContent='center'>
          <Box>
            <Center>
              <Text mb='6px' fontSize="18px" color="white" fontWeight="bold">
                Distribusi Waktu Kelulusan
              </Text>
            </Center>
          </Box>
          <Box width='100%' justifyContent='center' alignItems='center' display='flex'>
            <Box width='100px'>
              <Center>
                <Select
                  width='100%'
                  name="yearSelected"
                  value={formData.yearSelected}
                  onChange={(option) => handleChangeYear(option, { name: 'yearSelected' })}
                  options={optionsProdi}
                  placeholder={formData.yearSelected ? formData.yearSelected : 'All Time'}
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
        data={chartData}
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
        <Bar dataKey="uv" fill="#7ABD7E" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartUniv;