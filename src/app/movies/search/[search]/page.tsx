"use client"
import { Heading, SimpleGrid, Center, Image, Box, Badge, ButtonGroup, Button, Flex, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react';

import RatingStars from '../../../components/RatingStars';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function SearchMovies({ params }: { params: { search: string } }) {

    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        GetMovies();
    }, []);

    function GetMovies() {
        let url = 'http://127.0.0.1:8000/api/movies/search/'+params.search+'/';

        axios.get(url)
        .then(res => {
            console.log(res.data)
            setMovies(res.data)
        })
        .catch(err => console.log(err))
    };

    return (
            <>
            <Center><Heading as='h1' ml='10' m={5}>{params.search} - SEARCH - MOVIES</Heading></Center>
            <Center maxW='Center.sm'>
                <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>

                    {
                        movies?.map((movie, index) => (
                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' key={movie.id}>
                        <Image src={movie.poster} alt='movie image'/>

                        <Box p='6'>
                            <Box display='flex' alignItems='baseline'>
                            <Badge borderRadius='full' px='2' colorScheme='cyan'>
                            {movie.genre}
                            </Badge>
                            </Box>

                            <Box
                            
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                            noOfLines={1}
                            >
                            {movie.title}
                            </Box>

                            <Box >
                            {movie.views}
                            <Box as='span'  color='gray.600' fontSize='sm'>
                                views
                            </Box>
                            </Box>

                            <RatingStars reviews={23} rating={movie.rating} />
                        </Box>
                        <Box as="span" m='3' >
                            <Flex justify='center' align='center'>
                            <ButtonGroup spacing='2'>
                            <Link href={'/movies/'+ movie.id +'/'}>
                                <Button variant='solid' colorScheme='blue'>
                                    View Details
                                </Button>
                            </Link>
                            <Link href={'/ratings/rate/'+ movie.id +'/'}>
                                <Button variant='ghost' colorScheme='blue'>
                                    Rate
                                </Button>
                            </Link>
                            </ButtonGroup>
                            </Flex>
                        </Box>

                    </Box>
                        ))
                    }
            </SimpleGrid>
            </Center>
            </>
    );
}
