import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UseModalProps } from "@chakra-ui/react";
import React from "react";

interface Props extends UseModalProps {}

export const CommentModal = (props: Props) => {
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent bgColor="red.300">
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
