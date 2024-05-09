"use client"
import { Heading, SimpleGrid, Center, Image, Box, Badge, ButtonGroup, Button, Flex, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react';

import RatingStars from '../components/RatingStars';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function Movies() {

    const [movies, setMovies] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);

    //const [sort, setSort] = useState<number>(0);
    console.log(reviews);

    useEffect(() => {
        GetMovies(0);
    }, []);

    function GetMovies(sort: number) {
        let url = 'http://127.0.0.1:8000/api/movies/';

        if(sort==1){
            url = 'http://127.0.0.1:8000/api/movies/sort/hr/';
        } else if(sort==2){
            url = 'http://127.0.0.1:8000/api/movies/sort/mv/';
        } else if(sort==3){
            url = 'http://127.0.0.1:8000/api/movies/sort/da/';
        }

        axios.get(url)
        .then(res => {
            console.log(res.data);
            setMovies(res.data);
            GetReviews(res.data);
        })
        .catch(err => console.log(err))
    };

    function GetReviews(moviess) {
        let rev:any = [];
        for (var m of moviess){
            m.reviews = 0;
            let url = 'http://127.0.0.1:8000/api/ratings/count/'+m.id+'/';
            axios.get(url)
            .then(res => {
                console.log(res.data)
                rev.push(res.data);
            })
            .catch(err => console.log(err))
        }
        setReviews(rev);
    };

    return (
            <>
            <Center><Heading as='h1' ml='10' m={5}>MOVIES</Heading></Center>
            <Center>
                <Box m={5}>
                <Menu>
                {() => (
                    <>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Sort By
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => GetMovies(1)}>Highest Rated</MenuItem>
                        <MenuItem onClick={() => GetMovies(2)}>Most Viewed</MenuItem>
                        <MenuItem onClick={() => GetMovies(3)}>Date Added</MenuItem>
                        <MenuItem onClick={() => GetMovies(0)}>Cancel Sort</MenuItem>
                    </MenuList>
                    </>
                )}
                </Menu>
                </Box>
            </Center>
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
                            
                            <RatingStars reviews={movie.reviews} rating={movie.rating} />
                        </Box>
                        <Box as="span" m='3' >
                            <Flex justify='center' align='center'>
                            <ButtonGroup spacing='2'>
                            <Link href={'/movies/'+ movie.id +'/'}>
                                <Button variant='solid' colorScheme='blue'>
                                    View Details
                                </Button>
                            </Link>
                            <Link href={'/ratings/add/'+ movie.id +'/'}>
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
