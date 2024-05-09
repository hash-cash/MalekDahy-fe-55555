"use client";
import { Heading, SimpleGrid, Center, Button, Card, Stack, CardBody, CardFooter, StatGroup, Stat, StatLabel, StatNumber, Container} from '@chakra-ui/react';

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
        <Center><Heading as='h1' ml='10' m={5}>PERFORMERS</Heading></Center>
        <Center maxW='Center.sm'>
            <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={10} m={5}>
            {
                perfomers?.map((performer, index) => (
                    <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    minW={250}
                    >

                    <Stack>
                        <CardBody>
                        <Heading size='md' textAlign='center'>{performer.name}</Heading>
                        </CardBody>

                        <Container>
                        <StatGroup>
                            <Stat>
                                <Container>
                                    <StatLabel color='gray.600'>Total Views</StatLabel>
                                    <StatNumber minW={100}>{performer.sum}</StatNumber>
                                </Container>
                            </Stat>

                            <Stat>
                                <Container>
                                    <StatLabel color='gray.600'>Total Movies</StatLabel>
                                    <StatNumber>{performer.count}</StatNumber>
                                </Container>
                            </Stat>
                        </StatGroup>
                        </Container>

                        <Center>
                        <CardFooter>
                        <Link href={'/performers/'+performer.id+'/'}>
                            <Button variant='solid' colorScheme='blue'>
                                View Movies
                            </Button>
                        </Link>
                        </CardFooter>
                        </Center>
                    </Stack>
                    </Card>
                ))
            }
            </SimpleGrid>
        </Center>
        </>
  );
}
