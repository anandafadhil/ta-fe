"use client"

import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, useDisclosure, List,
    ListItem, ListIcon
} from "@chakra-ui/react";
import { MdCheckCircle } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import '../styles.css';
import Footer from "@/src/component/footer";

export default function PredictBulk() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleUploadClick = () => {
        router.push('/PredictBulk');
    };

    const [formData, setFormData] = useState({
        sem1sksSemester: '',
        sem1sksDPO: '',
        sem1ipsKumulatif: '',
        sem2sksSemester: '',
        sem2sksDPO: '',
        sem2ipsKumulatif: '',
        sem3sksSemester: '',
        sem3sksDPO: '',
        sem3ipsKumulatif: '',
        sem4sksSemester: '',
        sem4sksDPO: '',
        sem4ipsKumulatif: '',
    });

    const [OrgData, setOrgData] = useState({
        file: "",
    }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, for example:
        console.log('Form submitted:', formData);
        // Reset form data if needed
        setFormData({
            sem1sksSemester: '',
            sem1sksDPO: '',
            sem1ipsKumulatif: '',
            sem2sksSemester: '',
            sem2sksDPO: '',
            sem2ipsKumulatif: '',
            sem3sksSemester: '',
            sem3sksDPO: '',
            sem3ipsKumulatif: '',
            sem4sksSemester: '',
            sem4sksDPO: '',
            sem4ipsKumulatif: '',
        });
        router.push('/PredictBulk/Result');

    };

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            console.log("Selected file:", file.name);
            setSelectedFile(file.name);

            // FileReader to read the file content
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const json = csvToJson(text); // Convert CSV text to JSON
                console.log("CSV as JSON:", json);

                setOrgData({
                    ...OrgData,
                    file: json,  // Storing the JSON instead of the file object
                });
            };
            reader.readAsText(file); // Read the file as text
        }
    };

    // Function to convert CSV text to JSON
    const csvToJson = (csv) => {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',').map(header => header.trim()); // Trim headers to remove unexpected spaces

        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            const currentline = lines[i].trim().replace(/\r$/, '').split(','); // Trim each line and remove trailing carriage returns

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }

    return (
        <ChakraProvider resetCSS={false}>
            <div>
                <Navbar />
                <Container
                    margin={0}
                    maxWidth='100vw'
                    w='100%'
                    h='100%'>

                    {/* Header */}
                    <Box p={4}>
                        <Flex color='black' >
                            <Box p='4' width='300px' height='100px' display='flex' alignItems='center' justifyContent='center'>
                                <Text fontSize='30px' color='black'>
                                    Grouped Predict
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Box w='100%'>
                        <Center>
                            <Box
                                p={4}
                                bg="#13ABC4"
                                width="40%"
                                borderRadius='md'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                color='white'
                            >
                                <GridItem
                                    rowStart={1}
                                    rowEnd={2}
                                    bg='green.400'  // Using Chakra UI color scheme
                                    borderRadius='md'
                                    boxShadow='md'
                                    height='50px'
                                    justifySelf='center'
                                    alignSelf='center'
                                    width='100%'
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                >
                                    <Text fontSize="lg" fontWeight="bold">Step 1: Ketentuan File</Text>
                                </GridItem>

                                {/* Description GridItem */}
                                <GridItem
                                    rowStart={2}
                                    rowEnd={5}
                                    bg='purple.400'  // Using Chakra UI color scheme
                                    borderRadius='md'
                                    boxShadow='md'
                                    justifySelf='center'
                                    alignSelf='center'
                                    width='100%'
                                    display="flex"
                                    flexDirection="column"
                                    p={4}
                                    overflowY="auto"  // Allows scrolling inside the item if content is too long
                                >
                                    <List spacing={3} textAlign='left' color='white'>
                                        <ListItem>
                                            <ListIcon as={MdCheckCircle} color='green.500' />
                                            Merupakan mahasiswa semester 4 atau lebih yang sudah memiliki IP dan IPK
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={MdCheckCircle} color='green.500' />
                                            Nilai IP dan IPK tiap semester tidak boleh kosong/null
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={MdCheckCircle} color='green.500' />
                                            Isi dari tabel berupa Nomor Induk Mahasiswa, IPK, SKS diperoleh, dan SKS total dari semester 1 hingga 4
                                        </ListItem>
                                    </List>
                                </GridItem>
                            </Box>
                        </Center>
                        {/* Step by Step */}
                        <Center>
                            <Box p={4} w='80%' color='white' height='100%' marginTop='20px' borderRadius='md' >
                                <Grid templateColumns='repeat(3, 1fr)' gap={6}>

                                    {/* Step 2 */}
                                    <GridItem
                                        w='100%'
                                        h='100%'
                                        bg="#13ABC4"
                                        borderRadius='md'
                                        boxShadow='lg'
                                        p={4}
                                        color='white'
                                        position="relative"
                                    >

                                        {/* Step 2 GridItem */}
                                        <GridItem
                                            rowStart={1}
                                            rowEnd={2}
                                            bg='green.400'  // Using Chakra UI color scheme
                                            borderRadius='md'
                                            boxShadow='md'
                                            height='50px'
                                            justifySelf='center'
                                            alignSelf='center'
                                            width='100%'
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexDirection="column"
                                        >
                                            <Text fontSize="lg" fontWeight="bold">Step 2: Format File</Text>
                                        </GridItem>

                                        {/* Description GridItem */}
                                        <GridItem
                                            rowStart={2}
                                            rowEnd={5}
                                            bg='purple.400'  // Using Chakra UI color scheme
                                            borderRadius='md'
                                            boxShadow='md'
                                            justifySelf='center'
                                            alignSelf='center'
                                            width='100%'
                                            display="flex"
                                            flexDirection="column"
                                            p={4}
                                            overflowY="auto"  // Allows scrolling inside the item if content is too long
                                        >
                                            <List>
                                                <ListItem>
                                                    <ListIcon as={MdCheckCircle} color='green.500' />
                                                    Setelah tabel berhasil terisi simpan tabel tersebut dalam format .csv
                                                </ListItem>
                                            </List>
                                        </GridItem>
                                    </GridItem>

                                    {/* Step 3 */}
                                    <GridItem
                                        w='100%'
                                        h='100%'
                                        bg="#13ABC4"
                                        borderRadius='md'
                                        boxShadow='lg'
                                        p={4}
                                        color='white'
                                        position="relative"
                                    >

                                        {/* Step 3 GridItem */}
                                        <GridItem
                                            rowStart={1}
                                            rowEnd={2}
                                            bg='green.400'  // Using Chakra UI color scheme
                                            borderRadius='md'
                                            boxShadow='md'
                                            height='50px'
                                            justifySelf='center'
                                            alignSelf='center'
                                            width='100%'
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexDirection="column"
                                        >
                                            <Text fontSize="lg" fontWeight="bold">Step 3: Input File</Text>
                                        </GridItem>

                                        {/* Description GridItem */}
                                        <GridItem
                                            rowStart={2}
                                            rowEnd={5}
                                            bg='purple.400'  // Using Chakra UI color scheme
                                            borderRadius='md'
                                            boxShadow='md'
                                            justifySelf='center'
                                            alignSelf='center'
                                            width='100%'
                                            display="flex"
                                            flexDirection="column"
                                            p={4}
                                            overflowY="auto"  // Allows scrolling inside the item if content is too long
                                        >
                                            <List>
                                                <ListItem>
                                                    <ListIcon as={MdCheckCircle} color='green.500' />
                                                    Pilih file, kemudian unggah pada tempat yang telah disediakan
                                                </ListItem>
                                            </List>
                                        </GridItem>
                                    </GridItem>

                                    {/* Step 4 */}
                                    <GridItem
                                        w='100%'
                                        h='100%'
                                        bg="#13ABC4"
                                        borderRadius='md'
                                        boxShadow='lg'
                                        p={4}
                                        color='white'
                                        position="relative"
                                    >

                                        {/* Step 4 GridItem */}
                                        <GridItem
                                            rowStart={1}
                                            rowEnd={2}
                                            bg='green.400'  // Using Chakra UI color scheme
                                            borderRadius='md'
                                            boxShadow='md'
                                            height='50px'
                                            justifySelf='center'
                                            alignSelf='center'
                                            width='100%'
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexDirection="column"
                                        >
                                            <Text fontSize="lg" fontWeight="bold">Step 4: Predict</Text>
                                        </GridItem>

                                        {/* Description GridItem */}
                                        <GridItem
                                            rowStart={2}
                                            rowEnd={5}
                                            bg='purple.400'  // Using Chakra UI color scheme
                                            borderRadius='md'
                                            boxShadow='md'
                                            justifySelf='center'
                                            alignSelf='center'
                                            width='100%'
                                            display="flex"
                                            flexDirection="column"
                                            p={4}
                                            overflowY="auto"  // Allows scrolling inside the item if content is too long
                                        >
                                            <List>
                                                <ListItem>
                                                    <ListIcon as={MdCheckCircle} color='green.500' />
                                                    Setelah file berhasil terunggah seluruhnya, tekan tombol "Prediksi" untuk memulai prediksi
                                                </ListItem>
                                            </List>
                                        </GridItem>
                                    </GridItem>

                                </Grid>
                            </Box>
                        </Center>


                        {/* File Input */}
                        <Center>
                            <Box
                                p={4}
                                width={['100%', '50%', '30%']} // Responsive width
                                borderRadius='md'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                display='flex'
                                flexDirection={['column', 'row']}
                                alignItems="center"
                                justifyContent="center"
                                mt='40px'
                            >

                                {/* Button and hidden input box */}
                                <Box height="50px" width={['100%', 'auto']} display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                    <label htmlFor="fileUpload">

                                        {/* Hidden input box */}
                                        <input
                                            bg='yellow'
                                            id="fileUpload"
                                            type="file"
                                            accept=".csv"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />

                                        {/* Button */}
                                        <Button
                                            color='white'
                                            bg='#3161A3'
                                            variant="outline"
                                            as="span"
                                            width={['100%', 'auto']} // Full width on smaller screens
                                        >
                                            Choose File
                                        </Button>
                                    </label>
                                </Box>

                                {/* New input Box */}
                                <Box height="50px" width={['100%', '200px']} display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                    <label htmlFor="fileUpload" style={{ width: '100%' }}>
                                        <p
                                            className="w-full p-2 border rounded-lg cursor-pointer"
                                            style={{
                                                minHeight: '40px',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            <a className="text-gray-500">
                                                {selectedFile || 'Select a file'}
                                            </a>
                                        </p>
                                    </label>
                                </Box>
                            </Box>
                        </Center>

                        {/* Button */}
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
                                    Predict
                                </Button>
                            </Center>
                        </Box>
                    </Box>

                </Container>
                <Footer />

            </div >
        </ChakraProvider >
    );


}