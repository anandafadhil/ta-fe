import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";
import { fetchDatawithYear } from '../api/fetch';

const GeoChart = ({ defaultGeo }) => {
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
        options={{
          region: 'ID', // Asia,
          resolution: "provinces",
          colorAxis: { colors: ['red', 'green'] },
          backgroundColor: '#81d4fa',
          datalessRegionColor: '#CCCCCC',
          defaultColor: '#f5f5f5',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </ResponsiveContainer>
  );
};

export default GeoChart;