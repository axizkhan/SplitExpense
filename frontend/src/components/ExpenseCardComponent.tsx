import React from "react";
import { Button, Card, HStack, Text, VStack, Heading } from "@chakra-ui/react";

import { MdOutlineCurrencyRupee } from "react-icons/md";

import { BsThreeDotsVertical } from "react-icons/bs";
function ExpenseCardComponent() {
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
        <HStack justify="space-between">
          <VStack
            alignSelf="start"
            align="start">
            <Text
              fontWeight="semibold"
              fontSize="lg">
              Electricity Bill
            </Text>

            <HStack gap={2}>
              <Text
                fontSize="sm"
                color="gray.500">
                Paid by alex
              </Text>
              <Text
                fontSize="xs"
                color="gray.400">
                Created: June 2024
              </Text>
            </HStack>

            <Text
              fontSize="sm"
              color="gray.500">
              Shared living expenses, rent, utilities, and grocery runs for the
              flat.
            </Text>
          </VStack>
          <HStack>
            <Heading
              display="flex"
              alignItems="center">
              <MdOutlineCurrencyRupee /> 2,500
            </Heading>
            <Button
              variant="outline"
              size="xs">
              <BsThreeDotsVertical />
            </Button>
          </HStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}

export default ExpenseCardComponent;
