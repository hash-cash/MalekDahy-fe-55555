"use client";
import styles from "../page.module.css";

import {
  Stack,
  Text,
  Heading,
  Card,
  CardBody,
  Flex,
  Box,
} from '@chakra-ui/react';

import { BsEmojiAngryFill, BsEmojiFrownFill , BsEmojiSmileFill, BsEmojiHeartEyesFill, BsFillStarFill, BsStarHalf } from "react-icons/bs";

import RatingStars from '../components/RatingStars';

export default function RatingCard({rating} : {rating: any}) {
  //Get emoji based on the rating.
  function getIcon(){
    if(rating.rating<3){
      return (
        <BsEmojiAngryFill size={64} color={getColor()}/>
      )
    } else if (rating.rating>=3 && rating.rating <= 5){
        return (
          <BsEmojiFrownFill size={64} color={getColor()}/>
        )
    } else if (rating.rating>5 && rating.rating <= 8){
        return (
          <BsEmojiSmileFill size={64} color={getColor()}/>
        )
    }  else if (rating.rating >= 8){
        return (
          <BsEmojiHeartEyesFill size={64} color={getColor()}/>
        )
    }
  }

  //Get color for rating color header.
  function getColor(){
    if(rating.rating<3){
      return "#C53030";
    } else if (rating.rating>=3 && rating.rating <= 5){
      return "#C05621";
    } else if (rating.rating>5 && rating.rating <= 8){
      return "#2b6cb0";
    }  else if (rating.rating >= 8){
      return "#2F855A";
    }
  }

  return (
    <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        >
        <Flex align='center' justify='center' ml='3'>
          {getIcon()}
        </Flex>

        <Stack>
            <CardBody>
            <Heading size='md'>{rating.username}</Heading>

            <RatingStars reviews={0} rating={rating.rating}/>

            <Text py='2'>
                {rating.description}
            </Text>
            </CardBody>
        </Stack>
    </Card>
  )
}