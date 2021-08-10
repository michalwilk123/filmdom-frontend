import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  UseModalProps,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  ModalFooter,
  Button,
  ButtonGroup,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useLocalStorage } from "@rehooks/local-storage";
import React, { useState } from "react";
import { sendComment } from "../../utils/apiConnector";
import { StarsRatingComponent } from "../special/StarsRatingComponent";

interface Props extends UseModalProps {
  args: {
    movieId: number;
  };
}

export const AddMovieCommentModal = (props: Props) => {
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [additText, setAdditText] = useState("");
  const [isTryingToSubmit, setIsTryingToSubmit] = useState(false);
  const [userId] = useLocalStorage("user_id");
  const [authToken] = useLocalStorage("auth_token");

  const createComment = () => {
    setIsTryingToSubmit(true);
    const LSError = "BAD LOCAL STORAGE DATA!";

    if (currentRating) {
      if (!(authToken && userId)) {
        throw LSError;
      }
      sendComment({
        movieId: props.args.movieId,
        userId: parseInt(userId),
        rating: currentRating,
        authToken: authToken,
        text: additText,
      })
        .then((response) => {})
        .catch((e) => console.log(e));
      props.onClose();
    }
  };

  return (
    <Modal {...props} isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bgColor="gray.100">
        <ModalHeader fontSize="lg">Add a comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          rounded="md"
          bgColor="white"
          mx="4"
          maxH="60vh"
          px="2"
          py="0"
        >
          <Flex py="2" px="6">
            <Box mr="3">
              <Text as="b">Rating: </Text>
            </Box>
            <StarsRatingComponent
              maxRating={5}
              onRatingSelect={(r) => {
                setCurrentRating(r);
              }}
            />
            <Box ml="3">
              <Text as="i" fontSize="sm">
                {currentRating !== null ? (
                  ` ${currentRating} `
                ) : isTryingToSubmit ? (
                  <Text pt="2px" color="red">
                    The rating must be set!
                  </Text>
                ) : (
                  ""
                )}
              </Text>
            </Box>
          </Flex>
          <Accordion allowMultiple mb="3" mx="2">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontSize="sm">
                    additional text
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Textarea
                  onKeyPress={(e) => {
                    if ((window.event as KeyboardEvent).key === "Enter") {
                      createComment();
                    }
                  }}
                  onChange={(e) => setAdditText(e.target.value)}
                  placeholder="Write your comment"
                  defaultValue={""}
                  minHeight="200px"
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={createComment} colorScheme="red">
              Add Comment
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={(e) => props.onClose()}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
