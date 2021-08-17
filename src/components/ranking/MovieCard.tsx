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
import { useLocalStorage } from "@rehooks/local-storage";
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
  allowCommenting?: boolean;
}

export const MovieCard = (props: Props): React.ReactElement => {
  const CommentModalDisclosure = useDisclosure();
  const AddCommentModalDisclosure = useDisclosure();
  const [authToken] = useLocalStorage("auth_token");
  const [displayUnsafe] = useLocalStorage("display_unsafe");

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

    if (displayUnsafe?.toString() === "true"){
      imgSrc = props.movie.remote_thumbnail;
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
      <Flex {...props} maxH="300px">
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
            <b>Premiere date: </b> {props.movie.produceDate}
          </p>
          <p>
            <Text as="b">
              Genres:{" "}
              <Text as="span" fontSize="sm">
                {props.movie.genres.join("/ ")}
              </Text>
            </Text>
          </p>
          <Flex>
            <p style={{ marginTop: "auto", marginBottom: "auto" }}>
              <button onClick={CommentModalDisclosure.onOpen}>
                <b>Comments</b>
              </button>
            </p>
            {props.args.allowCommenting && authToken !== null && (
              <Button
                p="0"
                my="0"
                maxH="25px"
                ml="2"
                onClick={AddCommentModalDisclosure.onOpen}
                bgColor="red.300"
                color="white"
              >
                <AddIcon boxSize={3} />
              </Button>
            )}
          </Flex>
          <Box
            maxH="110px"
            overflow="auto"
            bgColor="gray.100"
            mt="1"
            py="1"
            px="2"
          >
            <Text as="i" fontSize="sm">
              {props.movie.description}
            </Text>
          </Box>
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
        args={{ movieId: props.movie.id }}
      />
    </>
  );
};
