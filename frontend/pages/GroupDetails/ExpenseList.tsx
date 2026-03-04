import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import ExpenseCardComponent from "../../src/components/ExpenseCardComponent";
import { useParams, useNavigate } from "react-router-dom";
import CreateExpenseDialog from "./CreateExpenseDialog";
import { useGroupExpenses } from "../../src/features/groups/hooks-expense";

function ExpenseList() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { data: expenses = [], isLoading } = useGroupExpenses(groupId || "");

  const totalAmount = expenses.reduce(
    (sum: number, expense: any) => sum + expense.amount,
    0,
  );

  return (
    <Box
      maxWidth="1200px"
      mx="auto"
      px={6}
      py={10}>
      {/* header  */}
      <HStack
        maxWidth="1200px"
        justifyContent="space-between"
        mb="10">
        {/* back button  */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}>
          <IoArrowBack />
        </Button>
        <VStack
          align="center"
          gap={1}>
          <Heading>Expenses</Heading>
          <Text>All Expenses</Text>
          <Badge
            variant="solid"
            size={"lg"}>
            ₹{totalAmount}
          </Badge>
        </VStack>

        {/* create new expense  */}
        <CreateExpenseDialog />
      </HStack>

      {/* main contain  */}
      {isLoading ? (
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
          py={10}>
          <Text
            color="gray.500"
            fontSize="lg">
            No expenses yet. Create one to get started!
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default ExpenseList;
