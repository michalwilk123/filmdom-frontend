import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MovieComment } from "../../utils/backendInterfaces";
import { MovieCommentElement } from "./MovieCommentElement";

const test_comments: MovieComment[] = [
  {
    text: "I really like this movie it is my favourite",
    rating: 5,
    creator: "nice commenter",
    datePosted: "10-10-2020",
    movieId: 1,
  },
  {
    text: "This movie was w/e. Fun but waste of time.",
    rating: 3,
    creator: "Marc Zucc",
    datePosted: "12-05-2021",
    movieId: 2,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu ullamcorper dui. Maecenas commodo orci et iaculis dapibus. Mauris eleifend malesuada sollicitudin. Aliquam ac feugiat mi. Aenean massa felis, pulvinar eget nulla et, luctus facilisis nisi. In hac habitasse platea dictumst. Etiam suscipit est arcu, in finibus orci semper nec. Duis vitae ipsum metus. Nullam in tellus congue, rutrum ex nec, aliquet mi. Suspendisse pellentesque lobortis ipsum eu imperdiet. In luctus justo tortor, nec accumsan risus aliquam a. Mauris non accumsan lorem. ",
    rating: 3,
    creator: "Lorem Ipsum",
    datePosted: "02-02-2021",
    movieId: 1,
  },
  {
    text: null,
    rating: 1,
    creator: "anonim",
    datePosted: "20-07-2021",
    movieId: 3,
  },
];

interface Props extends UseModalProps {
  movieId: number;
  movieTitle?: string;
  avgRating?: number;
}

export const CommentModal = (props: Props) => {
  const [commentList, setCommentList] = useState<MovieComment[]>([]);

  useEffect(() => {
    // NOTE: fetching comments from the movie
    setCommentList(test_comments);
  }, []);

  return (
    <Modal {...props} isCentered scrollBehavior="inside" >
      <ModalOverlay />
      <ModalContent bgColor="gray.100" minWidth="700px">
        <ModalHeader fontSize="lg">Comments {props.movieTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          rounded="md"
          bgColor="white"
          mx="4"
          maxH="60vh"
          mb="5"
          px="2"
          py="0"
        >
          {commentList.map((comment: MovieComment, index: number) => (
            <>
              <MovieCommentElement comment={comment} key={index} />
              <Divider borderColor="grey.300" />
            </>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
