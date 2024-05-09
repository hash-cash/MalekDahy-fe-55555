"use client";
import { Heading, SimpleGrid, Center, Image, Box, Badge, ButtonGroup, Button, Flex, Stack, Text, Avatar, useColorModeValue, CardBody, StatNumber, StatLabel, Stat, Card, StatHelpText, StatArrow, Container, CardFooter, Grid, GridItem} from '@chakra-ui/react';
import { BsFillStarFill } from "react-icons/bs";

import RatingStars from '../components/RatingStars';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';

export default function Theaters() {

    const [theaters, setTheaters] = useState<any[]>([]);
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        GetTheaters();
    }, []);

    function GetTheaters() {
        setMovies([])
        let url = 'http://127.0.0.1:8000/api/timeslots/';
        axios.get(url)
        .then(res => {
            res.data.forEach(theater => {
                GetMovie(theater.movie_id);
            });
            setTheaters(res.data);
        })
        .catch(err => console.log(err))
    };

    function GetMovie(id: number) {
        let url = 'http://127.0.0.1:8000/api/movies/'+ id + '/';
        
        axios.get(url)
        .then(res => {
            setMovies(movies => [...movies, res.data])
        })
        .catch(err => console.log(err))
    };

    console.log(movies)
    return (
            <>
            <Center><Heading as='h1' ml='10' m={5}>THEATERS - MOVIES</Heading></Center>
            <Center py={6}>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
            {
                theaters?.map((theater, index) => (
                    <Center py={6}>
                    <Box
                        maxW={'445px'}
                        w={'full'}
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        bg={useColorModeValue('white', 'gray.900')}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        p={6}
                        overflow={'hidden'}>
                        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6}>
                        <Image
                            src={
                            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                            }
                            alt="Example"
                        />
                        </Box>
                        <Stack mt={100}>
                        <Container flexDir={'column'} alignItems='center' justifyContent='center'>
                        <Text
                            color={'cyan.800'}
                            textTransform={'uppercase'}
                            fontWeight={800}
                            fontSize={'sm'}
                            letterSpacing={1.1}>
                            {theater.theater_name}
                        </Text>
                        <Heading
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            color={useColorModeValue('gray.700', 'white')}
                            fontSize={'2xl'}
                            height={50}
                            fontFamily={'body'}>
                            {movies[index]?.title}
                        </Heading>
                        <Grid data-type='Grid' templateColumns='repeat(2, 1fr)' gap={6} mb="6" mt={5}>
                        <GridItem data-type='GridItem'>
                        <Card data-type='Card'
                            overflow='hidden'
                            variant='outline'
                            bg="blue.600"
                            >
                            <CardBody data-type='CardBody'>
                                    <Stat data-type='Stat'>
                                    <StatLabel data-type='StatLabel' color="white">Starts at</StatLabel>
                                    <StatNumber data-type='StatNumber' color="white" color="white" display={'flex'} justifyContent={'center'}>{theater.start_time.split(' ')[1]}</StatNumber>
                                    <StatHelpText data-type='StatHelpText' color="white" display={'flex'} justifyContent={'center'}>
                                    {theater.start_time.split(' ')[0]}
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                        </GridItem>
                        <GridItem data-type='GridItem'>
                        <Card data-type='Card'
                            overflow='hidden'
                            variant='outline'
                            bg="blue.900"
                            >
                            <CardBody data-type='CardBody'>
                                    <Stat data-type='Stat'>
                                    <StatLabel data-type='StatLabel' color="white">Ends at</StatLabel>
                                    <StatNumber data-type='StatNumber' color="white" color="white" display={'flex'} justifyContent={'center'}>{theater.end_time.split(' ')[1]}</StatNumber>
                                    <StatHelpText data-type='StatHelpText' color="white" display={'flex'} justifyContent={'center'}>
                                    {theater.end_time.split(' ')[0]}
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                        </GridItem>
                    </Grid>
                    <Link href={'/movies/'+movies[index]?.id+'/'}>
                    <Button colorScheme='blue' variant='outline' width={'100%'}>
                        View Movie
                    </Button>
                    </Link>
                        </Container>
                        </Stack>
                    </Box>
                    </Center>
                ))
            }

        </SimpleGrid>
        </Center>
            </>
    );
}
