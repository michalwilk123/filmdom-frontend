import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
    text: null,
    rating: 1,
    creator: "anonim",
    datePosted: "20-07-2021",
    movieId: 3,
  },
];

interface Props extends UseModalProps {
  filmId: number;
}

export const CommentModal = (props: Props) => {
  const [commentList, setCommentList] = useState<MovieComment[]>([]);

  useEffect(() => {
    // ... fetching comments from the movie
    setCommentList(test_comments);
  }, []);

  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent bgColor="gray.100">
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody rounded="md" bgColor="white" m="5">
          {commentList.map((comment) => (
            <MovieCommentElement {...comment} />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
