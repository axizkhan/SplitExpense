import {
  Box,
  HStack,
  VStack,
  Heading,
  Badge,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { CreateExpenseDialog } from "@/features/expenses/components";
import { ExpenseCardComponent } from "@/features/expenses/components";

export default function ExpensesTabContent({
  expenses,
  expenseLoading,
  totalExpenseAmount,
}: {
  expenses: any[];
  expenseLoading: boolean;
  totalExpenseAmount: number;
}) {
  return (
    <Box>
      <HStack
        justify="space-between"
        mb={6}>
        <VStack
          align="start"
          gap={2}>
          <Heading
            size="md"
            color="slate.100">
            Group Expenses
          </Heading>
          <Badge
            colorPalette="green"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="lg"
            fontWeight="700">
            Total: ₹{totalExpenseAmount}
          </Badge>
        </VStack>
        <CreateExpenseDialog />
      </HStack>
      {expenseLoading ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={6}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              height="200px"
              borderRadius="xl"
            />
          ))}
        </SimpleGrid>
      ) : expenses.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={6}>
          {expenses.map((expense: any) => (
            <ExpenseCardComponent
              key={expense._id}
              expense={expense}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box
          textAlign="center"
          py={10}
          bg="linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.7) 100%)"
          borderRadius="2xl"
          border="1px dashed"
          borderColor="slate.700">
          <Text
            color="slate.400"
            fontSize="lg">
            ✨ No expenses yet. Create one to get started!
          </Text>
        </Box>
      )}
    </Box>
  );
}
