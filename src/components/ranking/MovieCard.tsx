import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MovieListElement } from "../../utils/backendInterfaces";
import { calculateStarValue, convertRatingToStar } from "../../utils/other";
import { AddMovieCommentModal } from "./AddMovieCommentModal";
import { CommentModal } from "./CommentModal";

const NULL_MOVIE_URL =
  "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

interface Props extends FlexProps {
  args: ComponentProps;
  movie: MovieListElement;
}

interface ComponentProps {
  showthumbnail?: boolean;
  isuserlogged?: boolean;
}

export const MovieCard = (props: Props): React.ReactElement => {
  const CommentModalDisclosure = useDisclosure();
  const AddCommentModalDisclosure = useDisclosure();

  const getThumbnail = (): React.ReactElement => {
    if (!props.args.showthumbnail) {
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
        height="inherit"
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
    <>
      <Flex
        {...props}
        maxH="300px"
      >
        {getThumbnail()}
        <Box
          alignItems="left"
          bgColor="white"
          width="100%"
          px="5"
          py="4"
          ml={props.args.showthumbnail ? "3" : "0"}
          rounded="sm"
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
          <Flex>
            <p style={{ marginTop: "auto", marginBottom: "auto" }}>
              <button onClick={CommentModalDisclosure.onOpen}>
                <b>Comments ({props.movie.noOfComments})</b>
              </button>
            </p>
            {props.args.isuserlogged && (
              <Button
                p="0"
                my="1"
                maxH="25px"
                ml="5"
                onClick={AddCommentModalDisclosure.onOpen}
              >
                <AddIcon boxSize={3} />
              </Button>
            )}
          </Flex>
          <Text pt="2" as="i" fontSize="md">
            {props.movie.description}
          </Text>
        </Box>
      </Flex>
      <CommentModal
        isOpen={CommentModalDisclosure.isOpen}
        onClose={CommentModalDisclosure.onClose}
        movieId={props.movie.id}
        movieTitle={props.movie.title}
        avgRating={props.movie.avgRating}
      />
      <AddMovieCommentModal
        isOpen={AddCommentModalDisclosure.isOpen}
        onClose={AddCommentModalDisclosure.onClose}
        signature={{
          username: "Tomek",
        }}
      />
    </>
  );
};
