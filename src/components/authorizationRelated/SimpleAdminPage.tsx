import { Flex, Alert, AlertIcon, FormControl, FormLabel, Input, Button, Center, Heading, TabPanels, Tabs, TabPanel, Tab, TabList } from '@chakra-ui/react';
import React from 'react';

interface Props {
    
}

const AddMovieForm = ():JSX.Element => {
  const handleSubmitMovie = () => {

  }

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      <Center mt="3"><Heading fontSize="2xl">add new movie</Heading></Center>
      <form onSubmit={handleSubmitMovie} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Username</FormLabel>
          <Input id="username" type="text" isRequired />
          <FormLabel pt={5}>Password</FormLabel>
          <Input id="password" type="password" isRequired />
          <Button type="submit" colorScheme="gray" marginY={5}>
            add 
          </Button>
        </FormControl>
      </form>
  </Flex>);
};

const AddGenreForm = ():JSX.Element => {
  const handleSubmitGenre = () => {
  }

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      <Center mt="3"><Heading fontSize="2xl">add new genre</Heading></Center>
      <form onSubmit={handleSubmitGenre} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Name</FormLabel>
          <Input id="name" type="text" isRequired/>
          <Button type="submit" colorScheme="gray" marginY={5}>
            Add 
          </Button>
        </FormControl>
      </form>
  </Flex>);
};

const AddActorForm = ():JSX.Element => {
  const handleSubmitActor = () => {
  }

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      <Center mt="3"><Heading fontSize="2xl">add new actor</Heading></Center>
      <form onSubmit={handleSubmitActor} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Name</FormLabel>
          <Input id="name" type="text" isRequired/>
          <Button type="submit" colorScheme="gray" marginY={5}>
            Add 
          </Button>
        </FormControl>
      </form>
  </Flex>);
};

const AddDirectorForm = ():JSX.Element => {
  const handleSubmitDirector = () => {
  }

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      <Center mt="3"><Heading fontSize="2xl">add new director</Heading></Center>
      <form onSubmit={handleSubmitDirector} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Name</FormLabel>
          <Input id="name" type="text" isRequired/>
          <Button type="submit" colorScheme="gray" marginY={5}>
            Add 
          </Button>
        </FormControl>
      </form>
  </Flex>);
};

export const SimpleAdminPage = (props: Props) => {
  return (
    <Tabs bgColor="white">
      <TabList>
        <Tab>Movies</Tab>
        <Tab>Genres</Tab>
        <Tab>Directors</Tab>
        <Tab>Actors</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <AddMovieForm/>
        </TabPanel>
        <TabPanel>
          <AddGenreForm/>
        </TabPanel>
        <TabPanel>
          <AddDirectorForm/>
        </TabPanel>
        <TabPanel>
          <AddActorForm/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
