import { Divider, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MovieComment } from "../utils/backendInterfaces";
import { MovieCommentElement } from "./ranking/MovieCommentElement";

const NUM_OF_COMMENTS = 7;

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

const fetchLastComments = (num: number): MovieComment[] => {
  // NOTE : fetching data
  return test_comments.slice(0, num);
};

export const LastCommentsFeed = () => {
  const [lastCommentsList, setLastCommentsList] = useState<MovieComment[]>([]);
  useEffect(() => {
    setLastCommentsList(fetchLastComments(NUM_OF_COMMENTS));
  }, []);

  return (
    <VStack maxHeight="100%" spacing="0">
      {lastCommentsList.map((comment: MovieComment) => (
        <>
          <MovieCommentElement bgColor="white" width="100%" comment={comment} />
          <Divider borderColor="red" />
        </>
      ))}
    </VStack>
  );
};
