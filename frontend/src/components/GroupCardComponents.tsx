import React from "react";
import { Button, Card, HStack, Stack, Text, Box, Icon } from "@chakra-ui/react";
import { GrGroup } from "react-icons/gr";
import { IoMdOpen } from "react-icons/io";

function GroupCardComponents() {
  return (
    <Card.Root
      borderRadius="xl"
      boxShadow="sm"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-4px)",
      }}
      transition="all 0.2s ease"
      cursor="pointer">
      <Card.Body>
        <HStack
          mb={4}
          gap={3}>
          <Box
            p={3}
            bg="teal.50"
            borderRadius="full"
            color="teal.600">
            <Icon
              as={GrGroup}
              boxSize={5}
            />
          </Box>

          <Text
            fontWeight="semibold"
            fontSize="lg">
            Apartment 4B
          </Text>
        </HStack>

        <Text
          fontSize="sm"
          color="gray.500">
          Shared living expenses, rent, utilities, and grocery runs for the
          flat.
        </Text>
      </Card.Body>

      <Card.Footer
        justifyContent="space-between"
        alignItems="center">
        <Stack gap={0}>
          <Text
            fontSize="sm"
            color="gray.500">
            Members: 5
          </Text>
          <Text
            fontSize="xs"
            color="gray.400">
            Created: June 2024
          </Text>
        </Stack>

        <Button
          size="sm"
          variant="outline"
          colorScheme="teal"
          borderRadius="full">
          Open
          <IoMdOpen />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default GroupCardComponents;
