import { Button, Card, HStack, Text, VStack, Heading } from "@chakra-ui/react";

import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import type { Expense } from "@/infrastructure/api/expense.repository";

interface ExpenseCardProps {
  expense: Expense;
}

function ExpenseCardComponent({ expense }: ExpenseCardProps) {
  const createdDate = new Date(expense.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
              {expense.title}
            </Text>

            <HStack gap={2}>
              <Text
                fontSize="sm"
                color="gray.500">
                Paid by {expense.paidBy}
              </Text>
              <Text
                fontSize="xs"
                color="gray.400">
                Created: {createdDate}
              </Text>
            </HStack>

            {expense.description && (
              <Text
                fontSize="sm"
                color="gray.500">
                {expense.description}
              </Text>
            )}
          </VStack>
          <HStack>
            <Heading
              display="flex"
              alignItems="center">
              <MdOutlineCurrencyRupee /> {expense.amount}
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
