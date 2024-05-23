import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";
import { fetchDatawithYear } from '../api/fetch';

const newOptions = [
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" }
];


function GeoChartExample({ defaultGeo }) {

  const data = defaultGeo;
  const convertedData = data.map(item => [item.provinsi_label, item.persentase]);
  convertedData.unshift(['Provinces', 'Popularity']);


  return (
    <ResponsiveContainer>
      <Chart
        chartType="GeoChart"
        width={500}
        height={300}
        data={convertedData}
        // data={[
        //   ['Provinces', 'Popularity'],
        //   ['ID-SR', 700],
        //   ['ID-JK', 300],
        //   ['ID-LA', 400],
        // ]}
        options={{
          region: 'ID', // Asia,
          resolution: "provinces",
          colorAxis: { colors: ['red', 'green'] },
          backgroundColor: '#81d4fa',
          datalessRegionColor: '#f8bbd0',
          defaultColor: '#f5f5f5',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </ResponsiveContainer>
  );
}

export default GeoChartExample;
