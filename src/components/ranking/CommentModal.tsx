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
import { getComments } from "../../utils/apiConnector";
import { dispatchMovieComment } from "../../utils/apiDispatcher";
import { MovieComment } from "../../utils/backendInterfaces";
import { CommentSortMethods } from "../../utils/commonIterfaces";
import { MovieCommentElement } from "./MovieCommentElement";

interface Props extends UseModalProps {
  movieId: number;
  movieTitle?: string;
  avgRating?: number;
}

export const CommentModal = (props: Props) => {
  const [commentList, setCommentList] = useState<MovieComment[]>([]);

  useEffect(() => {
    // NOTE: fetching comments from the movie
    fetchMovieComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovieComments = () => {
    let fetchedComments: MovieComment[] = [];

    getComments({
      movie_id: props.movieId,
      sort_method: CommentSortMethods.NEWEST,
      limit: 100,
    })
      .then((response) => {
        fetchedComments = response.data.map((x: any) =>
          dispatchMovieComment(x)
        );
        setCommentList(fetchedComments);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Modal {...props} isCentered scrollBehavior="inside">
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
            <React.Fragment key={index}>
              <MovieCommentElement comment={comment} />
              <Divider borderColor="grey.300" />
            </React.Fragment>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
