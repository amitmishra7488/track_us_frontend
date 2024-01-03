import React from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  useColorMode,
  Flex,
} from "@chakra-ui/react";

const FieldValuePair = ({ field, value }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      alignItems="center"
      marginBottom="2"
      justifyContent="space-between"
      paddingY="2"
    >
      <Text
        flex="2"
        fontWeight="bold"
        fontSize="lg"
        color={colorMode === "light" ? "teal.500" : "teal.300"}
        textTransform="capitalize"
      >
        {field}
      </Text>
      <Text
        flex="1"
        paddingRight="2"
        fontSize="lg"
        color={colorMode === "light" ? "gray.500" : "gray.400"}
      >
        :
      </Text>
      <Text
        flex="3"
        fontSize="lg"
        color={colorMode === "light" ? "gray.700" : "gray.200"}
        textShadow="1px 1px 1px rgba(0, 0, 0, 0.2)"
      >
        {value}
      </Text>
    </Flex>
  );
};

const KeyValueTable = ({ data }) => {
  const { colorMode } = useColorMode();

  return (
    <Table
      variant="striped"
      colorScheme={colorMode === "light" ? "teal" : "gray"}
    >
      <Tbody>
        {Object.entries(data).map(([field, value]) => (
          <Tr key={field}>
            <Td>{field}</Td>
            <Td>:</Td>
            <Td>{value}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default KeyValueTable;
