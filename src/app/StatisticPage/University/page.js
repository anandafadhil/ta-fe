"use client"
import Image from 'next/image';
import * as React from 'react';
import {
    Box, Container, Flex, Spacer,
    Input, Button
} from "@chakra-ui/react";
import Navbar from '@/src/component/navbar';
import { useRouter } from 'next/navigation'

export default function UniversityStatistic() {
    const router = useRouter();

    const handleSearch = () => {
        router.push('/StatisticPage/University');
    };
    return (
        <div>
            <Navbar />
        </div>
    );
}