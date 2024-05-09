"use client";
import styles from "../page.module.css";

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Center,
  Grid,
  GridItem,
  ButtonGroup,
  Badge,
} from '@chakra-ui/react';

import RatingCard from '../../components/RatingCard';
import { useEffect, useState } from "react";
import axios from "axios";
import RatingStars from '../../components/RatingStars';
import Link from "next/link";

export default function ViewPerformer({ params }: { params: { id: string } }) {

  interface Movie {
    id: number,
    title: string,
    genre: string,
    duration: number,
    views: number,
    rating: number,
    poster: string,
    description: string
  }
  const [performer, setPerformer] = useState<any[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        GetPerformer();
    }, []);

    function GetPerformer() {
        let url = 'http://127.0.0.1:8000/api/performers/'+params.id+'/';
        axios.get(url)
        .then(res => {
            console.log(res.data)
            setPerformer(res.data);
            GetMovies(res.data.name);
        })
        .catch(err => console.log(err))
    };

    function GetMovies(name: string) {
      let url = 'http://127.0.0.1:8000/api/performers/register/'+ name + '/';

      axios.get(url)
      .then(res => {
          console.log(res.data);
          setMovies(res.data);
      })
      .catch(err => console.log(err))
  };

  return (
    <Container maxW={'7xl'}>
      <Container py={5} maxW={'container.md'}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={6}>
        <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }} mt={3}>
          <Heading as={'h2'} color="blue.600">{performer.name}</Heading>
        </GridItem>
        <GridItem w="100%">
          <Flex flexDirection={'column'} align={'center'} justify={'center'}>
            <Text fontSize={'4xl'} fontWeight={'bold'} minW={180}>
            {performer.sum}
            </Text>
            <Box fontSize={'sm'}>
              Total views across all movies
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="100%">
          <Flex flexDirection={'column'} align={'center'} justify={'center'}>
            <Text fontSize={'4xl'} fontWeight={'bold'}>
            {performer.count}
            </Text>
            <Box fontSize={'sm'}>
              Total movies
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
    <Center><Heading as='h1' ml='10' m={5}>Performer Movies</Heading></Center>
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
    </Container>
  )
}