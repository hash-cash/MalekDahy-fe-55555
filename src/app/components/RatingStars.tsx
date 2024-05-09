"use client";
import styles from "../page.module.css";

import {
  Box,
} from '@chakra-ui/react';
import { ReactNode } from "react";

import { BsEmojiAngryFill, BsEmojiFrownFill , BsEmojiSmileFill, BsEmojiHeartEyesFill, BsFillStarFill, BsStarHalf } from "react-icons/bs";

export default function RatingStars({ reviews, rating } : { reviews:number, rating:number}) {
  //Get emoji based on the rating.
  function getIcon(){
    if(rating<3){
      return (
        <BsEmojiAngryFill size={64} color={getColor(rating)}/>
      )
    } else if (rating>=3 && rating <= 5){
        return (
          <BsEmojiFrownFill size={64} color={getColor(rating)}/>
        )
    } else if (rating>5 && rating <= 8){
        return (
          <BsEmojiSmileFill size={64} color={getColor(rating)}/>
        )
    }  else if (rating >= 8){
        return (
          <BsEmojiHeartEyesFill size={64} color={getColor(rating)}/>
        )
    }
  }

  //Get color for rating color header.
  function getColor(rating: number){
    if(rating<3){
      return "#C53030";
    } else if (rating>=3 && rating <= 5){
      return "#C05621";
    } else if (rating>5 && rating <= 8){
      return "#2b6cb0";
    }  else if (rating >= 8){
      return "#2F855A";
    }
  }

  return (
    <Box display='flex' mt='2' alignItems='center' key="stars">
        {Array(5)
            .fill('')
            .map((_, i) => (
            <>
            {(i+1) <= rating/2 ? (
            <BsFillStarFill
                key={i}
                color={getColor(rating)}
            />
            ) : null}
            
            {((i+1) - rating/2) >= 1 ? (
            <BsFillStarFill
                key={rating+i}
                color="lightgrey"
            />
            ) : null}

            {(rating/2 - (i+1))==0.5 || ( (rating/2 - (i+1))==-0.5 && (rating == 1) ) ? (
            <BsStarHalf
                key={rating-i}
                color={getColor(rating)}
            />
            ) : null}
            </>
            ))}
            {reviews >= 1 ? (
                <Box as='span' ml='2' color='gray.600' fontSize='sm' key="review">
                    {reviews} reviews
                </Box>
            ) : null}
    </Box>

  )
}