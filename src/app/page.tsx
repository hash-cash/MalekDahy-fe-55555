'use client'
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  chakra,
} from '@chakra-ui/react';
import { ReactElement, ReactNode } from 'react';
import {
  FcAbout,
  FcAssistant,
  FcBarChart,
  FcCollaboration,
  FcDonate,
  FcGraduationCap,
  FcInTransit,
  FcLike,
  FcManager,
  FcOvertime,
} from 'react-icons/fc';
import { BsCameraVideo, BsCardText, BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import Link from "next/link";

export default function Home() {
  interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
  }
  
  const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
      <Stack>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={'gray.100'}
          mb={1}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={'gray.600'}>{text}</Text>
      </Stack>
    );
  };

  interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
  }
  function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        mb={5}
        border={'1px solid'}
        borderColor={'white'}
        color={'white'}
        height={100}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={'white'}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
    const Testimonial = ({ children }: { children: ReactNode }) => {
      return <Box>{children}</Box>;
    };
    
    const TestimonialContent = ({ children }: { children: ReactNode }) => {
      return (
        <Stack
          bg={'white'}
          mb={20}
          boxShadow={'lg'}
          p={8}
          rounded={'xl'}
          align={'center'}
          pos={'relative'}
          _after={{
            content: `""`,
            w: 0,
            h: 0,
            borderLeft: 'solid transparent',
            borderLeftWidth: 16,
            borderRight: 'solid transparent',
            borderRightWidth: 16,
            borderTop: 'solid',
            borderTopWidth: 16,
            borderTopColor: 'white',
            pos: 'absolute',
            bottom: '-16px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
          {children}
        </Stack>
      );
    };
    
    const TestimonialHeading = ({ children }: { children: ReactNode }) => {
      return (
        <Heading as={'h3'} fontSize={'xl'}>
          {children}
        </Heading>
      );
    };
    
    const TestimonialText = ({ children }: { children: ReactNode }) => {
      return (
        <Text
          textAlign={'center'}
          color={'gray.600'}
          width={300}
          fontSize={'sm'}>
          {children}
        </Text>
      );
    };

  return (
    <Box p={4} mx={0}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mt={50}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Your Ultimate Movie Companion
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }} mb={10}>
          Discover, Watch, Enjoy - Anytime, Anywhere!
        </Text>
      </Stack>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} mx={100} minHeight={250} display={'flex'} alignItems={'center'}>
        <Feature
          icon={<Icon as={FcBarChart} w={10} h={10} />}
          title={'Check Movie Ratings'}
          text={
            'Instantly access ratings and reviews for every movie.'
          }
        />
        <Feature
          icon={<Icon as={FcGraduationCap} w={10} h={10} />}
          title={'Explore Performers'}
          text={
            'Discover details about actors, directors, and other performers.'
          }
        />
        <Feature
          icon={<Icon as={FcLike} w={10} h={10} />}
          title={'Rate a Movie'}
          text={
            'Share your opinions by rating movies and contributing to the community'
          }
        />
        <Feature
          icon={<Icon as={FcOvertime} w={10} h={10} />}
          title={'Find Theaters Showtimes'}
          text={
            'Easily check movie showtimes at the theaters.'
          }
        />
      </SimpleGrid>
      <Box bg={'blue.500'} mt={50} mx={0} display={'flex'} flexDirection={'column'} justifyContent={'center'} minH={600}>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        minHeight={150}
        color={'white'}
        fontWeight={'bold'}>
        Popular Genres: Action, Drama, Comedy, Thriller, Sci-Fi, and more!
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} minHeight={150}>
        <StatsCard
          title={'Movies'}
          stat={'1,000+'}
          icon={<BsCameraVideo size={'3em'} color={'white'}/>}
        />
        <StatsCard
          title={'Ratings'}
          stat={'10,000+'}
          icon={<BsCardText size={'3em'} color={'white'}/>}
        />
        <StatsCard
          title={'Performer'}
          stat={'5000+'}
          icon={<BsPerson size={'3em'} color={'white'} />}
        />
      </SimpleGrid>
    </Box>
    </Box>
    <Box bg={'blue.100'} display={'flex'} alignItems={'center'} minH={600}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Our Clients Speak</Heading>
          <Text>We have been working with clients around the world</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={[1, 2, 4]}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Efficient Collaborating</TestimonialHeading>
              <TestimonialText>
              MovieApi makes finding great movies and planning cinema trips a breeze! Highly recommend it!
              </TestimonialText>
              <Text display={'flex'} justify={'center'} width={'100%'} color={'gray.600'} fontSize={'smaller'}>- Emily S. </Text>
            </TestimonialContent>
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Intuitive Design</TestimonialHeading>
              <TestimonialText>
              MovieApi's comprehensive info and personal touch make it my go-to movie app. Love discovering hidden gems!
              </TestimonialText>
              <Text display={'flex'} justify={'center'} width={'100%'} color={'gray.600'} fontSize={'smaller'}>- Alex M.</Text>
            </TestimonialContent>
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Mindblowing Service</TestimonialHeading>
              <TestimonialText>
              "Thanks to MovieApi, planning movie nights is stress-free. Quick showtime checks and easy bookings!
              </TestimonialText>
              <Text display={'flex'} justify={'center'} width={'100%'} color={'gray.600'} fontSize={'smaller'}>- Ryan L.</Text>
            </TestimonialContent>
          </Testimonial>
        </Stack>
      </Container>
      </Box>
    <Box bg={'white'}>
      <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Get Started with <br />
              <Text as={'span'} color={'blue.400'}>
                Movie Api
              </Text>
            </Heading>
            <Text color={'gray.500'}>
            Dive into the world of movies with Movie Api. 
            Explore ratings, discover performers, rate your favorites, and plan your cinema outings effortlessly. Start your cinematic adventure now!
            </Text>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}>
              <Link href={'/movies/'}>
                <Button
                  colorScheme={'green'}
                  bg={'blue.600'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'blue.400',
                  }}>
                  View Movies
                </Button>
              </Link>
              <Link href={'/performers/'}>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                  Look for a Performer
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
    </Box>
    </Box>
  )
}
