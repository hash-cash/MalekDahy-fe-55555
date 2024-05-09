"use client";
import { useState } from "react";
import styles from "../page.module.css";
import RatingStarsSubmit from '../../components/RatingStarsSubmit';

import {
  Container,
  Button,
  Heading,
  Center,
  Input,
  Select,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberDecrementStepper,
  Textarea,
  useToast,
  SliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react';
import axios from "axios";

export default function AddMovie({ params }: { params: { id: string } }) {

    const toast = useToast();

    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        duration: 0,
        views: 0,
        rating: 5,
        poster: '',
        description: ''
    });

    const { title, genre, duration, views, rating, poster, description } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let body = JSON.stringify(formData)
        console.log(body)
        let url = 'http://127.0.0.1:8000/api/movies/';

        axios.post(url, body, {
            headers: {
            'content-type': 'application/json'
            }
        })
        .then(res => {
            return (
                toast({
                    title: 'Success!',
                    description: "The movie has been added successfully.",
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
                    Add a movie
                </Heading>
                <form onSubmit={e => onSubmit(e)}>
                    <Heading size='md' mt={5} mb={2}>Name</Heading>
                    <Input placeholder="Movie's name" name="title" value={title} onChange={e => onChange(e)} required/>
                    <Heading size='md' mt={5} mb={2}>Genre</Heading>
                    <Select variant='outline' placeholder='Genre' name="genre" value={genre} onChange={e => onSelectChange(e)} required>
                        <option value='Horror'>Horror</option>
                        <option value='Action'>Action</option>
                        <option value='Drama'>Drama</option>
                        <option value='Romance'>Romance</option>
                        <option value='Comedy'>Comedy</option>
                        <option value='Science Fiction'>Science Fiction</option>
                        <option value='Crime'>Crime</option>
                    </Select>
                    <Heading size='md' mt={5} mb={2}>Duration (minutes)</Heading>
                    <NumberInput defaultValue={45} min={45} max={400}>
                        <NumberInputField name="duration" value={duration} onChange={e => onChange(e)} required/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Heading size='md' mt={5} mb={2}>Views</Heading>
                    <NumberInput defaultValue={40000} min={10000} max={100000000}>
                        <NumberInputField name="views" value={views} onChange={e => onChange(e)} required/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Heading size='md' mt={5} mb={2}>Rating</Heading>
                    <Box>
                    <input type="range" min="1" max="10" name="rating" value={rating} onChange={e => onChange(e)} style={{width: "100%", bottom: "-125px !important", position: "relative", opacity: "0", height: "95px;"}} required/>
                    <RatingStarsSubmit rating={rating}/>
                    </Box>
                    <Heading size='md' mt={5} mb={2}>Poster (Link)</Heading>
                    <Input placeholder='Example: https://buffer.com/library/free-images.jpg' name="poster" value={poster} onChange={e => onChange(e)} required/>
                    <Heading size='md' mt={5} mb={2}>Description</Heading>
                    <Textarea placeholder='Describe the movie.' name="description" value={description} onChange={e => onTextAreaChange(e)} required/>
                    <Center><Button type='submit' colorScheme='blue' my={5} w='50em'>Add Movie</Button></Center>
                </form>
            </Container>
        </Container>
    )
}