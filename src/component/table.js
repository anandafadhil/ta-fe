import * as React from 'react';
import {
    Box, extendTheme, Link, Button, Image,
    ChakraProvider, TableContainer, Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Tfoot,
    Td
} from "@chakra-ui/react";
import "../app/styles.css";
import ReactPaginate from 'react-paginate';

// const theme = extendTheme({
//     components: {
//         Table: {
//             baseStyle: {
//                 td: {
//                     border: '2px solid #000000', // Light gray border for cells
//                     padding: 4, // Reduced padding for a more compact look
//                 },
//                 th: {
//                     border: '2px solid #CBD5E0', // Slightly darker border for header cells
//                     backgroundColor: '#13ABC4', // Light blue background for headers
//                     padding: 4,
//                     textTransform: 'none', // Remove uppercase transformation if any
//                 },
//             },
//             variants: {
//                 simple: {
//                     table: {
//                         borderRadius: 'md', // Rounded corners for the table
//                     },
//                 },
//             },
//         },
//     },
// });
const handlePageClick = (data) => {
    const selectedPage = data.selected;
    // Fetch data or update state based on the new page
    console.log('User requested page number:', selectedPage + 1); // data.selected is zero-indexed
};

const handlePerPageChange = (event) => {
    const perPage = event.target.value;
    console.log('User selected items per page:', perPage);
    // Update state or fetch data based on the selected items per page
};

export default function TableComponent() {
    return (
        <>
            <table className='w-full text-sm text-left rounded-t xl my-4'>
                <thead className='bg-[#86EAFF33]'>
                    <tr className='border-2'>
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
                    <span> line to show</span>
                    <select
                        className="select select-bordered select-xs w-full max-w-[80px]"
                        onChange={handlePerPageChange}
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
                        onPageChange={handlePageClick}
                        pageClassName={"join-item btn btn-sm"}
                        pageLinkClassName={""}
                        activeClassName={"active-pagination"}
                        className={"flex gap-1 items-center"}
                        disabledClassName={"disabled"}
                    />
                </div>
            </div>
            {/* <div className='pagination flex justify-between gap-2 mt-4'>
                <div className='perpage flex items-center gap-2 text-xs'>
                    <span>
                        abcd
                    </span>
                    <select
                        className='select select-bordered select-xs w-full max-w-[80px]'
                    >
                        <option value="5">5 line</option>
                        <option value="10">10 line</option>
                        <option value="15">15 line</option>
                    </select>
                </div>
                <div className='pagination'>
                    <ReactPaginate
                        breakLabel={"..."}
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={3}
                        pageClassName={"join-item btn btn-sm"}
                        pageLinkClassName={""}
                        activeClassName={"active-pagination"}
                        className={"flex gap-1 items-center"}
                        disabledClassName={"disabled"}
                    />
                </div>
            </div> */}


        </>
        // <ChakraProvider theme={theme}>

        //     <Box maxWidth="80%" mx="auto" p={4}>
        //         <TableContainer>
        //             <Table variant='simple' size='md'>
        //                 <Thead>
        //                     <Tr>
        //                         <Th>To convert</Th>
        //                         <Th>into</Th>
        //                         <Th isNumeric>multiply by</Th>
        //                     </Tr>
        //                 </Thead>
        //                 <Tbody>
        //                     <Tr>
        //                         <Td>inches</Td>
        //                         <Td>millimetres (mm)</Td>
        //                         <Td isNumeric>25.4</Td>
        //                     </Tr>
        //                     <Tr>
        //                         <Td>feet</Td>
        //                         <Td>centimetres (cm)</Td>
        //                         <Td isNumeric>30.48</Td>
        //                     </Tr>
        //                     <Tr>
        //                         <Td>yards</Td>
        //                         <Td>metres (m)</Td>
        //                         <Td isNumeric>0.91444</Td>
        //                     </Tr>
        //                 </Tbody>
        //             </Table>
        //         </TableContainer>
        //     </Box>
        // </ChakraProvider>

    );
}