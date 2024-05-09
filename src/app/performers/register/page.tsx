"use client";
import { useState } from "react";
import styles from "../page.module.css";

import {
  Container,
  Button,
  Heading,
  Center,
  Input,
  useToast,
} from '@chakra-ui/react';
import axios from "axios";

export default function Register({ params }: { params: { id: string } }) {
  
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    movie_name: ''
  });

  const { name, movie_name } = formData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let body = JSON.stringify(formData)
    console.log(body)
    let url = 'http://127.0.0.1:8000/api/performers/register/';

    axios.post(url, body, {
        headers: {
        'content-type': 'application/json'
        }
    })
    .then(res => {
        return (
            toast({
                title: 'Success!',
                description: "The performer has been added successfully.",
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
                Register a Movie
            </Heading>
            <form onSubmit={e => onSubmit(e)}>
                <Heading size='md' mt={5} mb={2}>Name</Heading>
                <Input placeholder="Performer's name" name="name" value={name} onChange={e => onChange(e)} required/>
                <Heading size='md' mt={5} mb={2}>Movie Name</Heading>
                <Input placeholder="Enter the performer's movie name" name="movie_name" value={movie_name} onChange={e => onChange(e)} required/>
                <Center><Button type='submit' colorScheme='blue' my={5} w='50em'>Register Movie</Button></Center>
            </form>
        </Container>
    </Container>
  )
}