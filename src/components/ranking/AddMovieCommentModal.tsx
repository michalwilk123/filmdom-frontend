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
import React from "react";
import { UserAuthSingature } from "../../utils/backendInterfaces";
import { StarsRatingComponent } from "../special/StarsRatingComponent";

interface Props extends UseModalProps {
  signature: UserAuthSingature;
}

export const AddMovieCommentModal = (props: Props) => {
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
            {/* <Text>
              Rating:
            </Text> */}
            <Box mr="3">
              <Text as="b">Rating: </Text>
            </Box>
            <StarsRatingComponent
              maxRating={5}
              onRatingSelect={(r) => {
                console.log("rating: " + r);
              }}
            />
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
                <Textarea placeholder="Write your comment" defaultValue={""} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button colorScheme="red">Add Comment</Button>
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
