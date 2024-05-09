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
} from '@chakra-ui/react';

import RatingCard from '../../components/RatingCard';
import { useEffect, useState } from "react";
import axios from "axios";
import RatingStars from '../../components/RatingStars';
import Link from "next/link";

export default function ViewMovie({ params }: { params: { id: string } }) {

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
  const [movie, setMovie] = useState<Movie[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);

    useEffect(() => {
        GetMovie();
        GetRatings();
    }, []);

    function GetMovie() {
        let url = 'http://127.0.0.1:8000/api/movies/'+ params.id + '/';

        axios.get(url)
        .then(res => {
            console.log(res.data)
            setMovie(res.data)
        })
        .catch(err => console.log(err))
    };

    function GetRatings() {
      let url = 'http://127.0.0.1:8000/api/ratings/search/movie/'+ params.id + '/';

      axios.get(url)
      .then(res => {
          console.log(res.data)
          setRatings(res.data)
      })
      .catch(err => console.log(err))
  };

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex align="center">
          <Image
            rounded={'md'}
            alt={'product image'}
            src={
              'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {movie.title}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              {movie.genre}
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={'lg'}>
              {movie.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={'blue.700'}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Movie Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Duration:
                  </Text>{' '}
                  {movie.duration}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Views:
                  </Text>{' '}
                  {movie.views}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Rating:
                  </Text>{' '}
                  {movie.rating} / 10
                </ListItem>
                <RatingStars reviews={0} rating={movie.rating}/>
              </List>
            </Box>
          </Stack>

          <Link href={'/ratings/add/'+movie.id+'/'}>
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('blue.500', 'blue.800')}
              color={useColorModeValue('white', 'blue.800')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              Leave a Rating
            </Button>
          </Link>
        </Stack>
      </SimpleGrid>
        <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            Ratings
        </Heading>
      <SimpleGrid spacing={15} mt={15}>
        
        {
          ratings?.map((rating, i) => (
            <RatingCard rating={rating}/>
          ))
        }
      </SimpleGrid>
    </Container>
  )
}