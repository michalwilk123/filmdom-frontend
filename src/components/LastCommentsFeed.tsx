import { Divider, VStack } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { getComments } from "../utils/apiConnector";
import { dispatchMovieComment } from "../utils/apiDispatcher";
import { MovieComment } from "../utils/backendInterfaces";
import { CommentSortMethods } from "../utils/commonIterfaces";
import { MovieCommentElement } from "./ranking/MovieCommentElement";

const NUM_OF_COMMENTS = 7;

export const LastCommentsFeed = () => {
  const [lastCommentsList, setLastCommentsList] = useState<MovieComment[]>([]);
  useEffect(() => {
    fetchLastComments();
  }, []);

  const fetchLastComments = (): void => {
    let commentList: MovieComment[] = [];

    getComments({
      limit: NUM_OF_COMMENTS,
      sort_method: CommentSortMethods.NEWEST,
    })
      .then((response: AxiosResponse) => {
        commentList = response.data.map((c: any) => dispatchMovieComment(c));
        setLastCommentsList(commentList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <VStack maxHeight="100%" spacing="0">
      {lastCommentsList.map((comment: MovieComment, index: number) => (
        <React.Fragment key={index}>
          <MovieCommentElement bgColor="white" width="100%" comment={comment} />
          <Divider borderColor="red" />
        </React.Fragment>
      ))}
    </VStack>
  );
};
