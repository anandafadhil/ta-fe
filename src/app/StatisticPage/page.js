"use client"
import Image from 'next/image';
import * as React from 'react';
import {
  Box, Container, Flex, Spacer,
  Input, Button
} from "@chakra-ui/react";
import Navbar from '@/src/component/navbar';
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
        <Box bg='red' h='500px'>

        </Box>
        <Box bg='green' h='10px'>

        </Box>
        <Box bg='yellow' h='50px'>

        </Box>
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
