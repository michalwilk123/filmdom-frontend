import { Flex, Heading, Select, Spacer } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useHistory, useParams } from "react-router";
import { MovieSortMethods } from "../../utils/commonIterfaces";
import queryString from "query-string";

interface Props {
  // rankingStateFunc: React.Dispatch<React.SetStateAction<MovieListElement[]>>;
}

export const MovieFilterFeed = (props: Props): ReactElement => {
  let history = useHistory();
  const { args } = useParams<{ args: string | undefined }>();

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let queryArgs;
    if (args) {
      queryArgs = {
        ...queryString.parse(args),
        sort_method: e.target.value,
      };
    } else {
      queryArgs = {
        sort_method: e.target.value,
      };
    }
    history.push(`/ranking/${queryString.stringify(queryArgs)}`);
  };

  return (
    <Flex py="3" px="6" width="inherit">
      <Heading>Ranking</Heading>
      <Spacer />
      <Select
        _hover={{ cursor: "pointer" }}
        onChange={onSortTypeChange}
        width="250px"
      >
        {Object.values(MovieSortMethods)
          .filter((m) => m !== "random")
          .map((method) => (
            <option key={method}>{method}</option>
          ))}
      </Select>
    </Flex>
  );
};
