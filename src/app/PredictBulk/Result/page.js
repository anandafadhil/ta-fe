"use client"
import Image from 'next/image';
import * as React from 'react';
import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, Select, InputSelect,
    FormControl, Modal, ModalOverlay,
    ModalContent, ModalCloseButton,
    ModalFooter, ModalBody, ModalHeader,
    useDisclosure, FormLabel, Textarea,

} from "@chakra-ui/react";
import Navbar from '@/src/component/navbar';
import { useRouter } from 'next/navigation'
import TableComponent from "../../../component/table"
import Footer from '@/src/component/footer';
import '../../styles.css';
import ReactPaginate from 'react-paginate';

export default function Home() {
    const router = useRouter();

    // Lulus Text
    const lulus = true;
    // const univName = "Universitas Indonesia";
    // const univName = "Universitas Terbuka";
    const univName = "Institut Teknologi Bandung";
    const univNameHandler = () => {
        if (lulus === true) {
            return univName;
        } else {
            return " Tidak Tepat Waktu";
        }
    }

    return (
        <ChakraProvider resetCSS={false}>
            <Navbar />
            <Container
                margin={0}
                maxWidth='100vw'
                w='100%'
                h='89vh'>

                {/* Header */}
                <Box p={4}>
                    <Flex color='black' >
                        <Box
                            p='4'
                            width='300px'
                            height='100px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Text fontSize='30px' color='black'>
                                Result Predict
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                {/* Univ Name Card */}
                <Box position="relative" >
                    <Center>
                        <Box
                            p={4}
                            mb='10px'
                            bg="#13ABC4"
                            width="60%"
                            borderRadius='md'
                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                        >
                            <Box>
                                <Center>
                                    <Text fontSize="30px" color="black">
                                        Hasil Prediksi File Mahasiswa
                                    </Text>
                                </Center>

                                <Center>
                                    <Text fontSize="30px" color="black">
                                        {univNameHandler()}
                                    </Text>
                                </Center>


                            </Box>
                        </Box>
                    </Center>
                </Box>

                {/* Table */}
                <hr className='border w-full -translate-y-[2px] mt-7 z-0 relative' />
                <div className='content w-4/5 flex flex-col mt-2 mx-auto'>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left my-4 rounded-lg overflow-hidden shadow-lg'>
                            <thead className='bg-[#13ABC4] rounded-tl-lg rounded-tr-lg'>
                                <tr className='first:rounded-tl-lg last:rounded-tr-lg border-2'>
                                    <th
                                        scope='col'
                                        className='px-6 py-3'
                                        style={{
                                            width: "5px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <p>No</p>
                                        </div>
                                    </th>
                                    <th scope='col' className='px-6 py-3 text-center'>
                                        HA
                                    </th>
                                    <th scope='col' className='px-6 py-3 text-center'>
                                        HA
                                    </th>
                                    <th scope='col' className='px-6 py-3 text-center'>
                                        HA
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-2'>
                                    <td className='px-6 py-4 text-center'>
                                        1
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        ini halo
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        ini halo
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        ini halo
                                    </td>
                                </tr>
                                <tr className='border-2'>
                                    <td className='px-6 py-4 text-center'>
                                        2
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        ini halo
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        ini halo
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        ini halo
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* <span>
                            abcd
                        </span> */}
                        <div className="pagination flex justify-between gap-2 mt-4">
                            <div className="perpage flex items-center gap-2 text-xs">
                                <span> Baris untuk ditampilkan</span>
                                <select
                                    className="select select-bordered select-xs w-full max-w-[80px]"
                                // onChange={handlePerPageChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                </select>
                            </div>
                            <div className="pagination">
                                <ReactPaginate
                                    breakLabel={"..."}
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    pageCount={2}
                                    // onPageChange={handlePageClick}
                                    pageClassName={"join-item btn btn-sm"}
                                    pageLinkClassName={""}
                                    activeClassName={"active-pagination"}
                                    className={"flex gap-1 items-center"}
                                    disabledClassName={"disabled"}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Button */}
                <Box p={4} marginTop='20px'>
                    <Center>
                        <Button
                            color='white'
                            bg='#3161A3'
                            w='200px'
                            h='50px'
                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                        // onClick={handleSubmit}
                        >
                            Unduh
                        </Button>
                    </Center>
                </Box>
            </Container>

            <Footer />
        </ChakraProvider>
    );
};