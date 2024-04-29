import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";

const newOptions = [
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" }
];

export default class GeoChartExample extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <div>
          <Box alignItems='center' justifyContent='center'>
            <Box >
              <Center>
                <Text mb='6px' fontSize="30px" color="black" fontWeight="bold">
                  Persentase Ketepatan Waktu Lulus per Provinsi
                </Text>
              </Center>

            </Box>
            <Box mb='20px' width='100%' justifyContent='center' alignItems='center' display='flex'>
              <Box width='100px' >
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
        <Chart
          chartType="GeoChart"
          data={[
            ['Provinces', 'Popularity'],
            ['ID-YO', 600],
            ['ID-JK', 300],
            ['West Sumatra', 400],
            // Add more provinces here as needed
          ]}
          options={{
            region: 'ID', // Asia,
            resolution: "provinces",
            colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
            backgroundColor: '#81d4fa',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </ResponsiveContainer>
    );
  }
}
