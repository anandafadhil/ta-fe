"use client";
import Image from 'next/image';
import * as React from 'react';
import {
  Box, Container, Flex, Spacer,
  Input, Button
} from "@chakra-ui/react";
import Navbar from '@/src/component/navbar';
import { Chart } from 'react-google-charts'; // Import Chart component
import { useRouter } from 'next/navigation'

export default function StatisticPage() {
  const router = useRouter();

  const handleSearch = () => {
    router.push('/StatisticPage/University');
  };

  return (
    <div>
      <Navbar />

      <Container bg='purple'>
        {/* Header */}
        <Box bg='blue' p={4}>
          <Flex color='black'>
            <Box p='4' bg='red' width='200px' height='50px'>
              Statistic
            </Box>
          </Flex>
        </Box>

        {/* Add Google GeoChart */}
        <Chart
          width={'600px'}
          height={'300px'}
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

        {/* Univ Input */}
        <Box bg='green' p={4} top={10} color='white' height='100px' alignItems='center'>

          {/* Univ Name */}
          <Flex bg='blue' marginTop='20px'>
            <Box marginLeft='200px' p='4' bg='red' w='171px' >
              Universitas
            </Box>
            <Button marginLeft='10px' onClick={handleSearch}> Cari </Button>
          </Flex>
          <Flex bg='yellow'>
            <Box marginLeft='200px' p='4' bg='red'>
              <Input placeholder='Universitas' size='xs' />
            </Box>
          </Flex>
        </Box>
      </Container>
    </div>
  );
}
