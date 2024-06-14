"use client";

import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";
import { fetchDatawithYear } from '../api/fetch';
import '../app/styles.css';

function BarChartExample2({ defaultBar, selectYear }) {
  const [formData, setFormData] = useState({});
  const [optionsProdi, setOptionsProdi] = useState([]);
  const [chartData, setChartData] = useState([
    { name: '3.5', jumlahMahasiswa: defaultBar[0]?.jml_mhs_lulus35 },
    { name: '4.0', jumlahMahasiswa: defaultBar[0]?.jml_mhs_lulus40 },
    { name: '4.5', jumlahMahasiswa: defaultBar[0]?.jml_mhs_lulus45 },
    { name: '5.0', jumlahMahasiswa: defaultBar[0]?.jml_mhs_lulus50 },
    { name: '5.5', jumlahMahasiswa: defaultBar[0]?.jml_mhs_lulus55 },
    { name: '6.0', jumlahMahasiswa: defaultBar[0]?.jml_mhs_lulus60 },
  ]);

  useEffect(() => {
    const newYear = selectYear.map(item => ({
      value: item.value_tahun,
      label: item.tahun_angkatan
    }));
    setOptionsProdi(newYear);
  }, []);
  const handleChangeYear = async (selectedOption, fieldName) => {
    const newData = await fetchDatawithYear({
      endpoint: `/grad-distribution`,
      selectedYear: selectedOption.value,
    })

    if (newData) {
      const formattedData = [
        { name: '3.5', jumlahMahasiswa: newData[0]?.jml_mhs_lulus35 },
        { name: '4.0', jumlahMahasiswa: newData[0]?.jml_mhs_lulus40 },
        { name: '4.5', jumlahMahasiswa: newData[0]?.jml_mhs_lulus45 },
        { name: '5.0', jumlahMahasiswa: newData[0]?.jml_mhs_lulus50 },
        { name: '5.5', jumlahMahasiswa: newData[0]?.jml_mhs_lulus55 },
        { name: '6.0', jumlahMahasiswa: newData[0]?.jml_mhs_lulus60 },
      ];

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
        <Box
          alignItems='center'
          justifyContent='center'
          display={{ base: 'column', sm: 'column', md: 'flex' }}
        >
          {/* Text */}
          <Box
            width='70%'
            alignItems='center'
            justifyContent='center'
            display='flex'
          >
            <Text
              fontSize={{ base: '14px', sm: '14px', md: '18px', lg: '20px', xl: '22px' }}
              textAlign={{ base: 'center', sm: 'center', md: 'justify' }}
              color="#545454" fontWeight="bold">
              Distribusi Waktu Kelulusan
            </Text>
          </Box>

          {/* Normal Select */}
          <Box
            width='30%'
            justifyContent='center'
            alignItems='center'
            display={{ base: 'none', xl: 'flex' }}
          >
            <Box width='150px'>
              <Center>
                <Select
                  color='black'
                  width='100%'
                  name="yearSelected"
                  value={formData.yearSelected}
                  onChange={(option) => handleChangeYear(option, { name: 'yearSelected' })}
                  options={optionsProdi}
                  placeholder={formData.yearSelected ? formData.yearSelected : 'All Time'}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: 'black',
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: 'black',
                    })
                  }}
                />
              </Center>
            </Box>
          </Box>

          {/* Small Select */}
          <Box width='30%' justifyContent='center' alignItems='center'
            display={{ base: 'column', sm: 'column', md: 'none' }}
          >
            <Box width='150px' justifyContent='center' alignItems='center'
            display={{ base: 'flex', sm: 'flex', md: 'none' }}>
              <Center>
                <Select
                  color='black'
                  width='100%'
                  name="yearSelected"
                  value={formData.yearSelected}
                  onChange={(option) => handleChangeYear(option, { name: 'yearSelected' })}
                  options={optionsProdi}
                  placeholder={formData.yearSelected ? formData.yearSelected : 'All Time'}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: 'black',
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: 'black',
                    })
                  }}
                />
              </Center>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Box mt="3" mb="4" height="4px" width="100%" bg="#EFF0F1"></Box>
      </div>

      {/* Chart */}
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          bottom: 40,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: 'black' }} />
        <YAxis tick={{ fill: 'black' }} />
        <Tooltip />
        <Bar dataKey="jumlahMahasiswa" fill="#7ABD7E" name="Jumlah Mahasiswa" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartExample2;