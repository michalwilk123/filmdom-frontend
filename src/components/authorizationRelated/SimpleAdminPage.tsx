import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Heading,
  TabPanels,
  Tabs,
  TabPanel,
  Tab,
  TabList,
  Divider,
  Textarea,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  AlertStatus,
} from "@chakra-ui/react";
import useLocalStorage from "@rehooks/local-storage";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { createMovie, createMovieActors, createMovieGenres } from "../../utils/apiConnector";
import { MovieGenreSelector } from "./MovieGenreSelector";

interface Props {
  authToken:string
}

type AdminTaskResult =
  | "unauthorized"
  | "bad request"
  | "server fault"
  | "success"
  | null;

const AddMovieForm = (props:Props): JSX.Element => {
  const [requestResult, setRequestResult] = useState<AdminTaskResult>(null);

  const handleSubmitMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!document) {
      return;
    }
    if (!props.authToken) {
      return;
    }

    let title = (document.querySelector("#title") as HTMLInputElement).value;
    let date = (document.querySelector("#produce_date") as HTMLInputElement)
      .value;
    let image = document.querySelector("#thumbnail") as HTMLInputElement;

    let imageObject = undefined;
    if (image.files) {
      imageObject = image.files[0];
    }

    const genres = Array.prototype.slice
      .call(document.querySelectorAll("form input:checked"))
      .map((o) => parseInt(o.id));

    createMovie(
      {
        title: title,
        thumbnail: imageObject,
        produceDate: date,
        genres: genres,
        actors: [],
      },
      props.authToken
    ).then(()=>setRequestResult("success")).catch((e) => {
      if (e.response){
        if (e.response.status === 401){
          setRequestResult("unauthorized");
        } else if (e.response.status < 500){
          setRequestResult("bad request");
        } else {
          setRequestResult("server fault");
        }
      } else{
        setRequestResult("server fault");
      }
    });
    window.scrollTo(0, 0);
  };

  const generateAlert = ():JSX.Element => {
    if (requestResult === null) {
      return <></>;
    }
    let status:AlertStatus, message;

    switch (requestResult) {
      case "success":
        status = "success";
        message = "You created new movie with success!";
        break;
      case "bad request":
        status = "error";
        message = "Passed parameters were not accepted by the server";
        break;
      case "server fault":
        status = "error";
        message = "Internal server error. Please contact the admin of the site";
        break;
      case "unauthorized":
        status = "error";
        message = "You do not obtain nessessary permissions to perform this operations";
        break;
    }

    return (<Alert status={status} >
      <AlertIcon/>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>);
  };

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      {generateAlert()}
      <Center mt="3">
        <Heading fontSize="2xl">add new movie</Heading>
      </Center>
      <form onSubmit={handleSubmitMovie} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Title</FormLabel>
          <Input type="text" id="title" />

          <FormLabel>Production date</FormLabel>
          <input
            style={{ backgroundColor: "peachpuff" }}
            type="date"
            id="produce_date"
          />

          <FormLabel>Movie description</FormLabel>
          <Textarea />

          <FormLabel>Movie poster</FormLabel>
          <input type="file" id="thumbnail" />

          <Divider my="4" />

          <FormLabel>Genres</FormLabel>
          <MovieGenreSelector cols={5} />

          <Button type="submit" colorScheme="gray" marginY={5}>
            add
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

const AddGenreForm = (props:Props): JSX.Element => {
  const handleSubmitGenre = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const genreName = (document.querySelector("form #genreName") as HTMLInputElement).value;
    createMovieGenres(genreName, props.authToken).catch(e=>console.log(e));
  };

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      <Center mt="3">
        <Heading fontSize="2xl">add new genre</Heading>
      </Center>
      <form onSubmit={handleSubmitGenre} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Name</FormLabel>
          <Input id="genreName" type="text" isRequired />
          <Button type="submit" colorScheme="gray" marginY={5}>
            Add
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

const AddActorForm = (props:Props): JSX.Element => {
  const handleSubmitActor = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const actorName = (document.querySelector("form #actorName") as HTMLInputElement).value;
    createMovieActors(actorName, props.authToken).catch(e=>console.log(e));
  };

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      <Center mt="3">
        <Heading fontSize="2xl">add new actor</Heading>
      </Center>
      <form onSubmit={handleSubmitActor} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Name</FormLabel>
          <Input id="actorName" type="text" isRequired />
          <Button type="submit" colorScheme="gray" marginY={5}>
            Add
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

const AddDirectorForm = (props:Props): JSX.Element => {
  const handleSubmitDirector = () => {};

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      <Center mt="3">
        <Heading fontSize="2xl">add new director</Heading>
      </Center>
      <form onSubmit={handleSubmitDirector} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Name</FormLabel>
          <Input id="name" type="text" isRequired />
          <Button type="submit" colorScheme="gray" marginY={5}>
            Add
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

export const SimpleAdminPage = (props: Props) => {
  const [authToken] = useLocalStorage<string>("auth_token");
  let history = useHistory();

  if (!authToken) {
    history.push("/home/");
    return <></>;
  }

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
          <AddMovieForm authToken={authToken} />
        </TabPanel>
        <TabPanel>
          <AddGenreForm authToken={authToken} />
        </TabPanel>
        <TabPanel>
          <AddDirectorForm authToken={authToken} />
        </TabPanel>
        <TabPanel>
          <AddActorForm authToken={authToken} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
