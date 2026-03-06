import { Card, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { LuIndianRupee, LuDot } from "react-icons/lu";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

interface JournalEntryProps {
  entry: {
    lenderId?: { name?: { firstName: string; lastName: string } };
    borowerId?: { name?: { firstName: string; lastName: string } };
    expenseId?: { title: string; description?: string; amount: number };
    paymentId?: { amount: number };
    type: "expense" | "payment";
    amount: number;
    updatedAt: string;
  };
  journalId: string;
  idx: number;
}

export function JournalEntryCard({ entry, journalId, idx }: JournalEntryProps) {
  const lenderName =
    entry.lenderId?.name?.firstName && entry.lenderId?.name?.lastName
      ? `${entry.lenderId.name.firstName} ${entry.lenderId.name.lastName}`
      : "Unknown";

  const borrowerName =
    entry.borowerId?.name?.firstName && entry.borowerId?.name?.lastName
      ? `${entry.borowerId.name.firstName} ${entry.borowerId.name.lastName}`
      : "Unknown";

  const title =
    entry.type === "expense" ? entry.expenseId?.title || "Expense" : "Payment";

  const description =
    entry.type === "expense"
      ? `${lenderName} paid for ${title}`
      : `Payment from ${lenderName}`;

  const isExpense = entry.type === "expense";

  return (
    <Card.Root
      key={`${journalId}-${idx}`}
      w="full"
      bg="linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)"
      borderLeft="4px solid"
      borderLeftColor={isExpense ? "green.500" : "blue.500"}
      borderTop="1px"
      borderTopColor="slate.700"
      borderRight="1px"
      borderRightColor="slate.800"
      borderBottom="1px"
      borderBottomColor="slate.800"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        bg: "linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 100%)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        borderLeftColor: isExpense ? "green.400" : "blue.400",
      }}>
      <Card.Body p={{ base: 4, md: 5 }}>
        <HStack
          justify="space-between"
          align="start">
          <HStack
            align="start"
            gap={4}>
            <Icon
              boxSize={10}
              color={isExpense ? "green.400" : "blue.400"}
              mt={1}>
              <RiMoneyRupeeCircleLine />
            </Icon>

            <VStack
              align="start"
              gap={1}>
              <Heading
                size="sm"
                color="slate.100"
                fontWeight="600">
                {description}
              </Heading>
              <Text
                fontSize="xs"
                color="slate.400">
                {new Date(entry.updatedAt).toLocaleDateString()} <LuDot />{" "}
                {borrowerName}
              </Text>
            </VStack>
          </HStack>

          <VStack
            align="end"
            gap={2}>
            <HStack
              gap={1}
              bg={
                isExpense ? "rgba(34, 197, 94, 0.1)" : "rgba(59, 130, 246, 0.1)"
              }
              px={3}
              py={1}
              borderRadius="lg">
              <LuIndianRupee size={16} />
              <Heading
                size="sm"
                color={isExpense ? "green.300" : "blue.300"}
                fontWeight="700">
                {entry.amount}
              </Heading>
            </HStack>
            <Text
              fontSize="xs"
              fontWeight="600"
              color={isExpense ? "green.400" : "blue.400"}
              textTransform="uppercase"
              letterSpacing="0.5px">
              {entry.type}
            </Text>
          </VStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
