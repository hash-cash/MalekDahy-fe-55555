'use client'

import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

const Logo = (props: any) => {
  return (
    <Text
    textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
    fontFamily={'heading'}
    color={useColorModeValue('gray.800', 'white')}>
    <a href='/'>MOVIE API</a>
    </Text>
  )
}

export default function Footer() {
  return (
    <Box>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')} mt='14' minW='100%'>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          spacing={4}
          justify={'center'}
          align={'center'}>
          <Logo />
          <Stack direction={'row'} spacing={6}>
            <Box as="a" href={'/'}>
              Home
            </Box>
            <Box as="a" href={'/movies/'}>
              Movies
            </Box>
            <Box as="a" href={'/performers/'}>
              Performers
            </Box>
            <Box as="a" href={'/about/'}>
              About
            </Box>
          </Stack>
        </Container>

        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2024 Malek Dahy. All rights reserved</Text>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}