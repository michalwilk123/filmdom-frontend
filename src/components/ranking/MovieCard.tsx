import { Flex, FlexProps, Image, LinkBox, Text } from "@chakra-ui/react";
import React from "react";
import { MovieListElement } from "../../utils/backendInterfaces";
import { calculateStarValue, convertRatingToStar } from "../../utils/other";
import { Link as ReactLink } from "react-router-dom";

const NULL_MOVIE_URL =
  "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

interface Props extends FlexProps {
  showthumbnail: boolean;
  movie: MovieListElement;
}

export const MovieCard = (props: Props): React.ReactElement => {
  const getThumbnail = (): React.ReactElement => {
    if (!props.showthumbnail) {
      return <></>;
    }

    let imgSrc;

    if (!props.movie.thumbnail) {
      imgSrc = NULL_MOVIE_URL;
    } else {
      imgSrc = props.movie.thumbnail;
    }

    return (
      <Image
        boxSize={{ base: "10vw", lg: "15vw" }}
        src={imgSrc}
        fallbackSrc={NULL_MOVIE_URL}
        alt={props.movie.title + " thumbnail"}
      />
    );
  };

  const getStarString = (rating: number): string => {
    let val = calculateStarValue(rating);
    if (val === undefined) {
      return "None";
    }
    return convertRatingToStar(val, 5);
  };

  return (
    <Flex
      px="3"
      py="3"
      {...props}
      boxShadow="base"
      bgColor="gray.200"
      width="inherit"
      rounded="sm"
    >
      {getThumbnail()}
      <LinkBox
        to={"/movie/" + props.movie.id}
        as={ReactLink}
        alignItems="left"
        bgColor="white"
        // width="1000px"
        width="100vw"
        px="5"
        py="4"
        ml="2"
      >
        <Text as="b" fontSize="2xl">
          {props.movie.title}
        </Text>
        <p>
          <b>Rating: </b> {getStarString(props.movie.avgRating)}
        </p>
        <p>
          <b>Director: </b> {props.movie.director}
        </p>
        <p>
          <b>Premiere date: </b> {props.movie.produceDate}
        </p>
        <p>
          <b>Number of comments: </b> {props.movie.noOfComments}
        </p>
        <Text pt="2" as="i" fontSize="md">
          {props.movie.description}
        </Text>
      </LinkBox>
    </Flex>
  );
};
