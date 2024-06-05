import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";
import { fetchDatawithYear } from '../api/fetch';

const GeoChart = ({ defaultGeo }) => {
  const data = defaultGeo;
  // const convertedData = data.map(item => [item.provinsi_label, item.persentase]);
  // convertedData.unshift(['Provinces', 'Popularity']);
  const convertedData = data.map(item => [item.provinsi, item.persentase, `${item.provinsi_label} </br> ${Math.ceil(item.persentase*100)}%`]);
  // Header with roles specified for each column
  convertedData.unshift(['Provinces', 'Popularity', { role: 'tooltip', type: 'string', p: { html: true } }])

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
          tooltip: { isHtml: true }, 
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </ResponsiveContainer>
  );
};

export default GeoChart;