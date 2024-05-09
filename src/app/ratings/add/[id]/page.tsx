"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import RatingStarsSubmit from '../../../components/RatingStarsSubmit';

import {
  Container,
  Button,
  Heading,
  Center,
  Input,
  Textarea,
  useToast,
  Image,
  Box,
  Card,
  Stack,
  Text,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import axios from "axios";

export default function AddRating({ params }: { params: { id: string } }) {

    const toast = useToast();

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
    const [movie, setMovie] = useState<Array<Movie>>([]);

    useEffect(() => {
        GetMovie();
    }, []);

    function GetMovie() {
        let url = 'http://127.0.0.1:8000/api/movies/'+ params.id + '/';

        axios.get(url)
        .then(res => {
            console.log(res.data)
            setMovie(res.data)
            setFormData({ ...formData, ["movie_id"]: res.data.id});
        })
        .catch(err => console.log(err))
    };

    const [formData, setFormData] = useState({
        username: '',
        rating: 5,
        description: '',
        movie_id: -1
    });

    const { username, rating, description } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let body = JSON.stringify(formData)
        console.log(body)
        let url = 'http://127.0.0.1:8000/api/ratings/';

        axios.post(url, body, {
            headers: {
            'content-type': 'application/json'
            }
        })
        .then(res => {
            return (
                toast({
                    title: 'Success!',
                    description: "Your review has been added successfully.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            )
        })
        .catch(err => {
            return (
                toast({
                    title: 'Oops!',
                    description: "An error has occured.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            )
        })
    };

    return (
        <Container maxW={'7xl'}>
            <Container>
                <Heading
                    my={5}
                    textAlign='center'
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                    Leave a Rating
                </Heading>

                <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={movie.poster}
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody>
                    <Heading size='md'>{movie.title}</Heading>

                    <Text py='2'>
                        {movie.description}
                    </Text>
                    </CardBody>
                </Stack>
                </Card>

                <form onSubmit={e => onSubmit(e)}>
                    <Heading size='md' mt={5} mb={2}>Username</Heading>
                    <Input placeholder="Your username" name="username" value={username} onChange={e => onChange(e)} required/>
                    <Heading size='md' mt={5} mb={2}>Rating</Heading>
                    <Box>
                    <input type="range" min="1" max="10" name="rating" value={rating} onChange={e => onChange(e)} style={{width: "100%", bottom: "-125px !important", position: "relative", opacity: "0", height: "95px;"}} required/>
                    <RatingStarsSubmit rating={rating}/>
                    </Box>
                    <Heading size='md' mt={5} mb={2}>Description</Heading>
                    <Textarea placeholder='Describe the movie.' name="description" value={description} onChange={e => onTextAreaChange(e)} required/>
                    <Center><Button type='submit' colorScheme='blue' my={5} w='50em'>Add Review</Button></Center>
                </form>
            </Container>
        </Container>
    )
}