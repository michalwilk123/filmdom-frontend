import { Box, Container, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import { MovieComment } from '../../utils/backendInterfaces';
import { calculateStarValue, convertRatingToStar } from '../../utils/other';

interface Props extends MovieComment{
    
}

export const MovieCommentElement = (props: Props) => {
  const getStarString = (rating: number): string => {
    let val = calculateStarValue(rating);
    if (val === undefined) {
      return "None";
    }
    return convertRatingToStar(val, 5);
  };

// <div>
//     {JSON.stringify(props)}
// </div>
  return (
    <Box boxShadow="base" minHeight={props.text !== null ? "100px" : "50px"}>
      <Text as="i" > 
        <b>User:</b> {props.creator} 
        <Box>
        <Box justifyContent="left" height="inherit">
          {props.datePosted}
        </Box>
        <Box height="inherit" alignSelf="right">
          {getStarString(props.rating)} 
        </Box>
        </Box>
      </Text>
      <Text>
        {
          props.text === null ? (<></>) : (
            <>
              <Divider/>
              <Text>
                {props.text}
              </Text>
            </>
          )
        }
      </Text>
    </Box>
  )
}
