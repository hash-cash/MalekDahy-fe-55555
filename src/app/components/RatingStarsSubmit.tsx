"use client";
import styles from "../page.module.css";

import {
  Box,
} from '@chakra-ui/react';
import { ReactNode } from "react";

import { BsEmojiAngryFill, BsEmojiFrownFill , BsEmojiSmileFill, BsEmojiHeartEyesFill, BsFillStarFill, BsStarHalf } from "react-icons/bs";

export default function RatingStarsSubmit({ rating } : { rating:number}) {
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
  
  function fillStar(i:number){

    if(i==0 && rating==1){
      return (
        <BsStarHalf
          size={128}
            key={i+rating}
            color={getColor(rating)}
        />
      )
    }

    if ((rating/2 - (i+1))==0.5) {
      return (
        <>
          <BsFillStarFill
              size={128}
              key={i+rating}
              color={getColor(rating)}
          />
          <BsStarHalf
            size={128}
              key={i+rating}
              color={getColor(rating)}
          />
        </>
      )
    }

    if ((i+1) <= rating/2) {
      return (
        <BsFillStarFill
            size={128}
            key={i+rating}
            color={getColor(rating)}
        />
      )
    }

    if (((i+1) - rating/2) >= 1) {
      return (
        <BsFillStarFill
            size={128}
            key={i+rating}
            color="lightgrey"
        />
      )
    }
  }

  return (
    <Box display='flex' mt='2' alignItems='center'>
        {Array(5)
            .fill('')
            .map((_, i) => (
            <>
            {console.log("i: " + i + " rating: " + rating)}
            {fillStar(i)}
            </>
            ))
        }
    </Box>

  )
}