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

    const handleSubmit = async () => {
        console.log('Form submitted:', formData);
        // const dataForm = await postData({
        //     endpoint: "/uni-prodi",
        //     data: formData,
        // });
        localStorage.setItem('formData', JSON.stringify(formData));


        router.push('/PredictSingular/PredictForm');
    };



    return (
        <ChakraProvider resetCSS={false}>
            <div>
                <Navbar />
                <Container
                    margin={0}
                    maxWidth='100vw'
                    w='100%'
                    h='89vh'>
                    {/* Header */}
                    <Box p={4}>
                        <Flex >
                            <Box p='4' width='300px' height='100px' display='flex' alignItems='center' justifyContent='center'>
                                <Text fontSize='30px' color='#3161A3'>
                                    Predict Singular
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Box w='100%'>
                        {/* Univ Input */}
                        <Box
                            p={4}
                            color='white'
                            height='100px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Flex
                                bg='#13ABC4'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                gap='40'
                                w='80%'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                borderRadius='md'>

                                {/* Univ */}
                                <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                                    <Box p='1' ml='1'>
                                        Nama Universitas
                                    </Box>
                                    <Box p='2'>
                                        <Select
                                            className="w-full"
                                            name="univInput"
                                            value={formData.univInput}
                                            onChange={handleChangeUniv}
                                            options={optionsUni}
                                            placeholder={formData.univInput ? formData.univInput : 'Input Universitas Pilihan'}
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
                                                // menu: (provided) => ({
                                                //     ...provided,
                                                //     maxHeight: "120px", // Adjust the max height as needed
                                                //     overflowY: "auto", // Add scrollbar if needed
                                                // }),
                                                // New style to change label font color to black
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: "black", // Change label font color to black
                                                }),
                                            }}
                                        />
                                    </Box>
                                </SimpleGrid>

                                {/* Prodi */}
                                <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                                    <Box p='1' ml='1'>
                                        Nama Prodi/Jurusan
                                    </Box>
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
                                                // New style to change label font color to black
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: "black", // Change label font color to black
                                                }),
                                            }}
                                        />
                                    </Box>
                                </SimpleGrid>
                            </Flex>
                        </Box>

                        {/* Submit Button */}
                        <Box p={4} marginTop='20px'>
                            <Center>
                                <Button
                                    color='white'
                                    bg='#3161A3'
                                    w='200px'
                                    h='50px'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                    onClick={handleSubmit}
                                >
                                    Confirm
                                </Button>
                            </Center>
                        </Box>

                    </Box>
                </Container>
                <Footer />

            </div>
        </ChakraProvider>
    );


}