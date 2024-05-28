"use client";

import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, InputSelect,
} from "@chakra-ui/react";
import Select from "react-select";
// import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import '../styles.css';
import Footer from "@/src/component/footer";
import { fetchData, postData } from "../../api/fetch";

export default function PageComponent(props) {
    const { data } = props;
    const [optionsProdi, setOptionsProdi] = useState([])
    const router = useRouter();

    const [formData, setFormData] = useState({
        univInput: '',
        univInputID: '',
        prodiInput: '',
        prodiInputID: '',
    });

    const optionsUni = data.distinct_universities.map(([id, name]) => ({
        value: id,
        label: name
    }));


    const handleChangeUniv = async (selectedOption, fieldName) => {
        const selected_id_univ = selectedOption.value;
        const dataProdi = await fetchData(`/prodi/${selected_id_univ}`);

        const optionsProdi = dataProdi.prodi.map(([id, name]) => ({
            value: id,
            label: name
        }));
        setOptionsProdi(optionsProdi);

        if (selectedOption) {
            const { label, value } = selectedOption;
            setFormData({
                ...formData,
                [`${fieldName.name}`]: label,
                [`${fieldName.name}ID`]: value
            });
        } else {
            setFormData({
                ...formData,
                [`${fieldName.name}`]: '',
                [`${fieldName.name}ID`]: ''
            });
        }
    };

    const handleChangeProdi = async (selectedOption, fieldName) => {
        const selected_id_univ = selectedOption.value;
        if (selectedOption) {
            const { label, value } = selectedOption;
            setFormData({
                ...formData,
                [`${fieldName.name}`]: label,
                [`${fieldName.name}ID`]: value
            });
        } else {
            setFormData({
                ...formData,
                [`${fieldName.name}`]: '',
                [`${fieldName.name}ID`]: ''
            });
        }

    };

    const handleSearchClick = async () => {
        console.log('Form submitted:', formData);
        localStorage.setItem('formData', JSON.stringify(formData));
        router.push('/PredictSingular/PredictForm');
    };

    const handleBulkPredict = async () => {
        router.push('/PredictBulk');
    };



    return (
        <ChakraProvider resetCSS={false}>
            <div>
                <Navbar />
                <Container
                    bg='#EFF0F1'
                    margin={0}
                    maxWidth='100vw'
                    w='100%'
                    h='89vh'>

                    {/* Header */}
                    <Box p={4} position='relative'>
                        <Center>
                            <Box
                                mt='60px'
                                p='4'
                                width='800px'
                                height='200px'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                            >

                                <Box>
                                    <Center>
                                        <Text lineHeight='30px' fontSize="64px" color="black" fontWeight="bold">
                                            Prediksi Ketepatan
                                        </Text>
                                    </Center>

                                    <Center>
                                        <Text fontSize="64px" color="black" fontWeight="bold">
                                            Waktu Lulus Mahasiswa
                                        </Text>
                                    </Center>
                                </Box>
                            </Box>
                        </Center>
                    </Box>

                    {/* Univ Search's Box */}
                    <Box
                        mt='40px'
                        p={4}
                        color='white'
                        height='100px'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Flex
                            bg='white'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            gap='5'
                            w='50%'
                            p={4}
                            paddingBottom={1}
                            paddingTop={1}
                            borderWidth='3px'
                            borderRadius='2xl'
                            borderColor='#7B7B7B'
                        >

                            {/* Univ Search */}
                            <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='40%'>
                                <Box p='2'>
                                    <Select
                                        className="w-full"
                                        name="univInput"
                                        value={formData.univInputLabel}
                                        onChange={handleChangeUniv}
                                        options={optionsUni}
                                        placeholder={formData.univInputLabel ? formData.univInputLabel : 'Input Nama Universitas'}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                borderRadius: "0.5rem",
                                                paddingLeft: "0.2rem",
                                                height: "55px",
                                            }),
                                            indicatorSeparator: (base) => ({
                                                ...base,
                                                visibility: "hidden",
                                            }),
                                            dropdownIndicator: (base) => ({
                                                ...base,
                                                paddingRight: "0.5rem",
                                                svg: {
                                                    height: 24,
                                                    width: 24,
                                                    fill: "black",
                                                },
                                            }),
                                            option: (provided) => ({
                                                ...provided,
                                                color: "black",
                                            }),
                                        }}
                                    />
                                </Box>
                            </SimpleGrid>

                            {/* Prodi Search */}
                            <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='40%'>
                                <Box p='2'>
                                    <Select
                                        className="w-full"
                                        name="prodiInput"
                                        value={formData.prodiInput}
                                        onChange={handleChangeProdi}
                                        options={optionsProdi}
                                        isDisabled={!formData.univInput ? true : false}
                                        placeholder={!formData.univInput ? '' : (formData.prodiInput ? formData.prodiInput : 'Input Jurusan Pilihan')}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                borderRadius: "0.5rem",
                                                paddingLeft: "0.2rem",
                                                height: "55px",
                                                backgroundColor: state.isDisabled ? 'lightgray' : 'white'

                                            }),
                                            indicatorSeparator: (base) => ({
                                                ...base,
                                                visibility: "hidden",
                                            }),
                                            dropdownIndicator: (base) => ({
                                                ...base,
                                                paddingRight: "0.5rem",
                                                svg: {
                                                    height: 24,
                                                    width: 24,
                                                    fill: "black",
                                                },
                                            }),
                                            option: (provided) => ({
                                                ...provided,
                                                color: "black",
                                            }),
                                        }}
                                    />
                                </Box>
                            </SimpleGrid>

                            {/* Univ Search's Button */}
                            <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='20%'>
                                <Box p={2}>
                                    <Center>
                                        <Button
                                            color='white'
                                            bg='#004AAD'
                                            w='200px'
                                            h='50px'
                                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                            onClick={handleSearchClick}
                                        >
                                            Next
                                        </Button>
                                    </Center>
                                </Box>
                            </SimpleGrid>

                        </Flex>
                    </Box>

                    {/* Predict Bulk's Box */}
                    <Box
                        mt='20px'
                        p={4}
                        color='white'
                        height='100px'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Flex
                            mt='80px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            gap='2'
                            w='40%'
                            p={2}
                            borderWidth='3px'
                            borderRadius='2xl'
                            borderColor='#7B7B7B'
                            bg='#EFF0F1'
                        >

                            {/* Text */}
                            <SimpleGrid columns='1' w='70%'>
                                <Box p='2'>
                                    <Text color='black' fontSize='20px' fontWeight='bold'>
                                        Ingin memprediksi lebih dari satu mahasiswa?
                                    </Text>
                                </Box>
                            </SimpleGrid>


                            {/* Predict Bulk's Button */}
                            <SimpleGrid columns='1' w='30%'>
                                <Box p={4}>
                                    <Center>
                                        <Button
                                            color='white'
                                            bg='#004AAD'
                                            w='200px'
                                            h='50px'
                                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                            onClick={handleBulkPredict}
                                        >
                                            Bulk Prediction
                                        </Button>
                                    </Center>
                                </Box>
                            </SimpleGrid>

                        </Flex>
                    </Box>

                </Container>
                <Footer />

            </div>
        </ChakraProvider>
    );


}