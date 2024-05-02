"use client"

import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, Select, InputSelect,
    FormControl, Modal, ModalOverlay,
    ModalContent, ModalCloseButton,
    ModalFooter, ModalBody, ModalHeader,
    useDisclosure, FormLabel, Textarea
} from "@chakra-ui/react";
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
        router.push('/PredictSingular/Result');

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
                                    Predict Bulk
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Box w='100%'>
                        <Center>
                            <Box
                                p={4}
                                bg="#13ABC4"
                                width="90%"
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
                                    width='95%'  // Setting width relative to parent
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
                                    width='95%'
                                    display="flex"
                                    flexDirection="column"
                                    p={4}
                                    overflowY="auto"  // Allows scrolling inside the item if content is too long
                                >
                                    <Text>
                                        - Merupakan mahasiswa minimal tingkat dua yang sudah memiliki IP dan IPK minimal sampai dengan semester 4
                                    </Text>
                                    <Text>
                                        - Nilai IPK dan SKS setiap semester tidak kosong(harus diisi)
                                    </Text>
                                    <Text>
                                        - Tabel berisikan nama mahasiswa IPK semester 1 hingga 4, dan SKS diperoleh dari semester 1 hingga 4, SKS total semester 1 hingga 4
                                    </Text>
                                </GridItem>
                            </Box>
                        </Center>
                        {/* Step by Step */}
                        <Box p={4} color='white' height='570px' marginTop='20px' borderRadius='md'>
                            <Grid templateColumns='repeat(4, 1fr)' gap={6}>

                                {/* Step 1 */}
                                <GridItem
                                    w='100%'
                                    h='500px'
                                    bg='red.500'  // Using Chakra UI color scheme
                                    borderRadius='md'
                                    boxShadow='lg'  // Using Chakra UI's built-in shadow for consistency
                                    p={4}  // Adding some padding
                                    color='white'  // Text color for better readability on dark background
                                    position="relative"  // To positionally style inner elements if needed
                                >
                                    {/* <Grid
                                        templateRows='repeat(4, 1fr)'
                                        gap={4}
                                        h='100%'
                                        alignItems='center'
                                        bg='yellow'
                                    > */}
                                    {/* Step 1 GridItem */}
                                    <GridItem
                                        rowStart={1}
                                        rowEnd={2}
                                        bg='green.400'  // Using Chakra UI color scheme
                                        borderRadius='md'
                                        boxShadow='md'
                                        height='50px'
                                        justifySelf='center'
                                        alignSelf='center'
                                        width='95%'  // Setting width relative to parent
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexDirection="column"
                                    >
                                        <Text fontSize="lg" fontWeight="bold">Step 1: Prepare Your File</Text>
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
                                        width='95%'
                                        display="flex"
                                        flexDirection="column"
                                        p={4}
                                        overflowY="auto"  // Allows scrolling inside the item if content is too long
                                    >
                                        <Text>
                                            Persiapkan file dalam format tabel yang berisikan data mahasiswa dengan ketentuan sebagai berikut :

                                        </Text>
                                        <Text>
                                            - Merupakan mahasiswa minimal tingkat dua yang sudah memiliki IP dan IPK minimal sampai dengan semester 4
                                        </Text>
                                        <Text>
                                            - IPK and SKS for each semester are filled out (none should be empty)
                                            The table should include NPM/NIM of students, IPK from semester 1 to 4, SKS obtained from semester 1 to 4, and total SKS from semester 1 to 4
                                        </Text>
                                    </GridItem>
                                    {/* </Grid> */}
                                </GridItem>


                                {/* Semester 2 */}
                                <GridItem
                                    w='100%'
                                    h='100%'
                                    bg='#13ABC4'
                                    borderRadius='md'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                >
                                    <Grid
                                        templateRows='repeat(4, 1fr)'
                                        gap={4}
                                        h='100%'
                                        alignItems='center'
                                    >
                                        <GridItem row='1' justifySelf='center' alignSelf='center'>
                                            Step 2
                                        </GridItem>
                                        {/* Adjusted SimpleGrid to have multiple columns */}
                                        <SimpleGrid row='2' w='100%' alignItems='center'>
                                            <Box ml='2'>
                                                SKS diambil
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem2sksSemester"
                                                    value={formData.sem2sksSemester}
                                                    onChange={handleChange}
                                                    placeholder="Input SKS Semester 2"
                                                    variant="filled"
                                                    bg="#EBFFFB"
                                                />
                                            </Box>
                                        </SimpleGrid>
                                        <SimpleGrid row='3' w='100%' rows={2} alignItems='center'>
                                            <Box ml='2'>
                                                SKS Lulus
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem2sksDPO"
                                                    value={formData.sem2sksDPO}
                                                    onChange={handleChange}
                                                    placeholder="Total SKS Lulus di Semester 2"
                                                    variant="filled"
                                                    bg="#EBFFFB"
                                                />
                                            </Box>
                                        </SimpleGrid>
                                        <SimpleGrid row='4' w='100%' rows={2} alignItems='center'>
                                            <Box ml='2'>
                                                IPK
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem2ipsKumulatif"
                                                    value={formData.sem2ipsKumulatif}
                                                    onChange={handleChange}
                                                    placeholder="IPK pada Semester 2"
                                                    variant="filled"
                                                    bg="#EBFFFB"
                                                />
                                            </Box>
                                        </SimpleGrid>
                                    </Grid>
                                </GridItem>

                                {/* Semester 3 */}
                                <GridItem
                                    w='100%'
                                    h='100%'
                                    bg='#13ABC4'
                                    borderRadius='md'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                >
                                    <Grid
                                        templateRows='repeat(4, 1fr)' gap={4}
                                        h='100%'
                                        alignItems='center'
                                    >
                                        <GridItem row='1' justifySelf='center' alignSelf='center'>
                                            Step 3
                                        </GridItem>
                                        {/* Adjusted SimpleGrid to have multiple columns */}
                                        <SimpleGrid row='2' w='100%' alignItems='center'>
                                            <Box ml='2'>
                                                SKS diambil
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem3sksSemester"
                                                    value={formData.sem3sksSemester}
                                                    onChange={handleChange}
                                                    placeholder="Input SKS Semester 3"
                                                    variant="filled"
                                                    bg="#EBFFFB"
                                                />
                                            </Box>
                                        </SimpleGrid>
                                        <SimpleGrid row='3' w='100%' rows={2} alignItems='center'>
                                            <Box ml='2'>
                                                SKS Lulus
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem3sksDPO"
                                                    value={formData.sem3sksDPO}
                                                    onChange={handleChange}
                                                    placeholder="Total SKS Lulus di Semester 3"
                                                    variant="filled"
                                                    bg="#EBFFFB"
                                                />
                                            </Box>
                                        </SimpleGrid>
                                        <SimpleGrid row='4' w='100%' rows={2} alignItems='center'>
                                            <Box ml='2'>
                                                IPK
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem3ipsKumulatif"
                                                    value={formData.sem3ipsKumulatif}
                                                    onChange={handleChange}
                                                    placeholder="IPK pada Semester 3"
                                                    variant="filled"
                                                    bg="#EBFFFB"
                                                />
                                            </Box>
                                        </SimpleGrid>
                                    </Grid>
                                </GridItem>

                                {/* Semester 4 */}
                                <GridItem
                                    w='100%'
                                    h='100%'
                                    bg='#13ABC4'
                                    borderRadius='md'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                >
                                    <Grid
                                        templateRows='repeat(4, 1fr)' gap={4}
                                        h='100%'
                                        alignItems='center'
                                    >
                                        <GridItem row='1' justifySelf='center' alignSelf='center'>
                                            Step 4
                                        </GridItem>
                                        {/* Adjusted SimpleGrid to have multiple columns */}
                                        <SimpleGrid row='2' w='100%' alignItems='center'>
                                            <Box ml='2'>
                                                SKS diambil
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem4sksSemester"
                                                    value={formData.sem4sksSemester}
                                                    onChange={handleChange}
                                                    placeholder="Input SKS Semester 4"
                                                    variant="filled"
                                                    bg="#EBFFFB"
                                                />
                                            </Box>
                                        </SimpleGrid>
                                        <SimpleGrid row='3' w='100%' rows={2} alignItems='center'>
                                            <Box ml='2'>
                                                SKS Lulus
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem4sksDPO"
                                                    value={formData.sem4sksDPO}
                                                    onChange={handleChange}
                                                    placeholder="Total SKS Lulus di Semester 4"
                                                    variant="filled"
                                                    bg="#EBFFFB"
                                                />
                                            </Box>
                                        </SimpleGrid>
                                        <SimpleGrid row='4' w='100%' rows={2} alignItems='center'>
                                            <Box ml='2'>
                                                IPK
                                            </Box>
                                            <Box p='2'>
                                                <Input
                                                    type="text"
                                                    name="sem4ipsKumulatif"
                                                    value={formData.sem4ipsKumulatif}
                                                    onChange={handleChange}
                                                    placeholder="IPK pada Semester 4"
                                                    variant="filled"
                                                    bg="#EBFFFB"

                                                />
                                            </Box>
                                        </SimpleGrid>
                                    </Grid>
                                </GridItem>
                            </Grid>
                        </Box>

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
                            >

                                {/* Button and hidden input box */}
                                <Box height="50px" width={['100%', 'auto']} display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                    <label htmlFor="fileUpload">

                                        {/* Hidden input box */}
                                        <input
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
                                    Confirm
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