"use client";
import { Heading, SimpleGrid, Center, Button, Card, Stack, CardBody, CardFooter, StatGroup, Stat, StatLabel, StatNumber, Container, Text, Icon, IconProps, Flex} from '@chakra-ui/react';

import RatingStars from '../components/RatingStars';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Performers() {

    const [perfomers, setPerfomers] = useState<any[]>([]);

    useEffect(() => {
        GetPerformers();
    }, []);

    function GetPerformers() {
        let url = 'http://127.0.0.1:8000/api/performers/';
        axios.get(url)
        .then(res => {
            console.log(res.data)
            setPerfomers(res.data)
        })
        .catch(err => console.log(err))
    };

  return (
        <>
            <Container maxW={'5xl'}>
            <Stack
              textAlign={'center'}
              align={'center'}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 20, md: 28 }}>
              <Heading
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                A small project by{' '}
                <Text as={'span'} color={'blue.400'}>
                  Malek Dahy
                </Text>
              </Heading>
              <Text color={'gray.500'} maxW={'3xl'}>
                Welcome to the Movies App, crafted by Malek Dahy! Here, you'll embark on a cinematic journey like no other. Explore a vast collection of films, discover hidden gems, and stay up-to-date with the latest releases. With seamless integration of React Next.js and Laravel, and styled to perfection with Chakra UI, this app promises an immersive movie-watching experience for all film enthusiasts
              </Text>
              <Stack spacing={6} direction={'row'}>
                <Link href={'/'}>
                <Button
                  rounded={'full'}
                  px={6}
                  colorScheme={'blue'}
                  bg={'blue.400'}
                  minW={'250px'}
                  _hover={{ bg: 'blue.500' }}>
                  Back To Home
                </Button>
                </Link>
              </Stack>
            </Stack>
          </Container>
        </>
  );
}
