"use client";

import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";
import useStore from '@/src/store';
import { fetchDatawithIDYear, fetchDatawithYear } from '../api/fetch';

function BarChartUniv({ defaultBar, selectYear }) {
  const [formData, setFormData] = useState({});
  const [optionsProdi, setOptionsProdi] = useState([]);
  const [chartData, setChartData] = useState([
    { name: '3.5', jumlahMahasiswa: defaultBar[0].jml_mhs_lulus_35 },
    { name: '4.0', jumlahMahasiswa: defaultBar[0].jml_mhs_lulus_40 },
    { name: '4.5', jumlahMahasiswa: defaultBar[0].jml_mhs_lulus_45 },
    { name: '5.0', jumlahMahasiswa: defaultBar[0].jml_mhs_lulus_50 },
    { name: '5.5', jumlahMahasiswa: defaultBar[0].jml_mhs_lulus_55 },
    { name: '6.0', jumlahMahasiswa: defaultBar[0].jml_mhs_lulus_60 },
  ]);
  const parsId = useStore((state) => state.univID);

  useEffect(() => {
    const newYear = selectYear.map(item => ({
      value: item.value_tahun,
      label: item.tahun_angkatan
    }));
    setOptionsProdi(newYear);
  }, []);

  const handleChangeYear = async (selectedOption, fieldName) => {
    const newData = await fetchDatawithIDYear({
      endpoint: `/grad-time-distribution-univ`,
      selectedIDUniv: parsId,
      selectedYear: selectedOption.value,
    })

    if (newData) {
      const formattedData = [
        { name: '3.5', jumlahMahasiswa: newData[0].jml_mhs_lulus_35.toLocaleString() },
        { name: '4.0', jumlahMahasiswa: newData[0].jml_mhs_lulus_40.toLocaleString() },
        { name: '4.5', jumlahMahasiswa: newData[0].jml_mhs_lulus_45.toLocaleString() },
        { name: '5.0', jumlahMahasiswa: newData[0].jml_mhs_lulus_50.toLocaleString() },
        { name: '5.5', jumlahMahasiswa: newData[0].jml_mhs_lulus_55.toLocaleString() },
        { name: '6.0', jumlahMahasiswa: newData[0].jml_mhs_lulus_60.toLocaleString() },
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
        <Box alignItems='center' justifyContent='center'
          display={{ base: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'flex' }}
        >
          {/* Text */}
          <Box alignItems='center' justifyContent='center'>
            <Text
              fontSize={{ base: '14px', sm: '14px', md: '16px', lg: '16px', xl: '16px', '2xl': '22px' }}
              textAlign={{ base: 'center', lg: 'center', xl: 'justify' }}
              color="#545454" fontWeight="bold">
              Distribusi Waktu Kelulusan
            </Text>
          </Box>

          {/* Normal Select */}
          <Box width='30%' justifyContent='center' alignItems='center'
            display={{ base: 'none', lg: 'none', xl: 'flex' }}
          >
            <Box width='150px'>
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
          <Box
            width="100%"
            justifyContent='center' alignItems='center'
            display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'flex', xl: 'none' }}
          >
            <Box
              width="40%"
              maxWidth="200px"
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <Center>
                <Select
                  width='100%'
                  name="yearSelected"
                  value={formData.yearSelected}
                  onChange={(option) => handleChangeYear(option, { name: 'yearSelected' })}
                  options={optionsProdi}
                  placeholder={formData.yearSelected ? formData.yearSelected : 'All Time'}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      color: 'black',
                      minHeight: '30px',
                      fontSize: '12px',
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      fontSize: '12px',
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: 'black',
                      fontSize: '12px',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: 'black',
                      fontSize: '12px',
                    }),
                    option: (provided) => ({
                      ...provided,
                      color: 'black',
                      fontSize: '12px',
                    }),
                  }}
                />
              </Center>
            </Box>
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

export default BarChartUniv;