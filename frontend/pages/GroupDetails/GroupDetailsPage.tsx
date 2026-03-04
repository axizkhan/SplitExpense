import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Stack,
  Skeleton,
  SimpleGrid,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import GroupSummaryCard from "../../src/components/GroupSummaryCard";
import GroupMemberCard from "../../src/components/GroupMemberCard";
import ExpenseCardComponent from "../../src/components/ExpenseCardComponent";
import AddMemberDialog from "./AddMemberDialog";
import CreateExpenseDialog from "./CreateExpenseDialog";
import { useGroupDetails } from "../../src/features/groups/hooks";
import { useGroupExpenses } from "../../src/features/groups/hooks-expense";
import { useResponsive } from "../../src/hooks/useResponsive";

function GroupDetailsPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { isSmallScreen } = useResponsive();
  const [activeTab, setActiveTab] = useState<"members" | "expenses">("members");

  const { data: groupDetails, isLoading: groupLoading } = useGroupDetails(
    groupId || "",
  );
  const { data: expenses = [], isLoading: expenseLoading } = useGroupExpenses(
    groupId || "",
  );

  if (groupLoading) {
    return (
      <Box
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 6, md: 8 }}>
        <Skeleton
          height="40px"
          mb={6}
        />
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          gap={{ base: 4, md: 6 }}
          mb={10}>
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              height="150px"
              borderRadius="xl"
            />
          ))}
        </SimpleGrid>
        <Skeleton
          height="300px"
          borderRadius="xl"
        />
      </Box>
    );
  }

  if (!groupDetails) {
    return (
      <Box
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 6, md: 8 }}>
        <Text>Group not found</Text>
      </Box>
    );
  }

  const summaryCards = [
    {
      title: "Total Group Expense",
      amount: groupDetails.group?.totalExpense || 0,
      badge: "All time",
      color: "green",
    },
    {
      title: "You Owe",
      amount: groupDetails.userData?.amountOwed || 0,
      badge: "Pending payments",
      color: "red",
    },
    {
      title: "You Will Receive",
      amount: groupDetails.userData?.amountToBeRecieved || 0,
      badge: "From members",
      color: "teal",
    },
  ];

  const totalExpenseAmount = expenses.reduce(
    (sum: number, expense: any) => sum + expense.amount,
    0,
  );

  return (
    <Box
      px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 6, md: 8 }}
      minH="100vh"
      bg="#0f172a">
      {/* Header */}
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        gap={4}
        mb={8}>
        <HStack gap={3}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
            borderColor="slate.700"
            color="slate.300"
            _hover={{ bg: "slate.800" }}>
            <IoArrowBack />
          </Button>
          <VStack
            align="start"
            gap={1}>
            <Heading
              size="lg"
              color="slate.100"
              fontWeight="800">
              {groupDetails.group?.groupName}
            </Heading>
            <Text
              color="slate.400"
              fontSize="sm">
              Financial Details
            </Text>
          </VStack>
        </HStack>
      </Stack>

      {/* INFO CARDS */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        gap={6}
        mb={10}>
        {summaryCards.map((card, i) => (
          <GroupSummaryCard
            key={i}
            i={i}
            card={card}
          />
        ))}
      </SimpleGrid>

      {/* TABS */}
      <Box mb={8}>
        <HStack
          gap={0}
          borderBottomWidth="2px"
          borderBottomColor="slate.700"
          mb={8}>
          <Button
            variant={activeTab === "members" ? "unstyled" : "ghost"}
            size="lg"
            onClick={() => setActiveTab("members")}
            px={4}
            py={3}
            borderBottomWidth={activeTab === "members" ? "3px" : "0px"}
            borderBottomColor={
              activeTab === "members" ? "green.500" : "transparent"
            }
            borderRadius="0"
            color={activeTab === "members" ? "green.300" : "slate.400"}
            fontWeight={activeTab === "members" ? "700" : "500"}
            fontSize="lg"
            transition="all 0.2s"
            _hover={{
              color: "green.300",
            }}>
            Members
          </Button>
          <Button
            variant={activeTab === "expenses" ? "unstyled" : "ghost"}
            size="lg"
            onClick={() => setActiveTab("expenses")}
            px={4}
            py={3}
            borderBottomWidth={activeTab === "expenses" ? "3px" : "0px"}
            borderBottomColor={
              activeTab === "expenses" ? "green.500" : "transparent"
            }
            borderRadius="0"
            color={activeTab === "expenses" ? "green.300" : "slate.400"}
            fontWeight={activeTab === "expenses" ? "700" : "500"}
            fontSize="lg"
            transition="all 0.2s"
            _hover={{
              color: "green.300",
            }}>
            Expenses
          </Button>
        </HStack>
      </Box>

      {/* Members Tab Content */}
      {activeTab === "members" && (
        <Box>
          <HStack
            justify="space-between"
            mb={8}>
            <VStack
              align="start"
              gap={1}>
              <Heading
                size="md"
                color="slate.100">
                Group Members
              </Heading>
              <Box
                h="1px"
                w="20"
                bg="linear-gradient(90deg, #22c55e, transparent)"
              />
            </VStack>
            <AddMemberDialog groupId={groupId || ""} />
          </HStack>

          {groupDetails.balances && groupDetails.balances.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={6}>
              {groupDetails.balances.map((balance: any, i: number) => {
                const memberName = balance.memberdetails?.name
                  ? `${balance.memberdetails.name.firstName} ${balance.memberdetails.name.lastName}`
                  : "Unknown Member";
                const memberAmount = balance.memberAmount || 0;
                const isOwing = memberAmount > 0;
                const displayAmount = Math.abs(memberAmount);

                return (
                  <GroupMemberCard
                    key={i}
                    i={i}
                    member={{
                      name: memberName,
                      amount: `₹${displayAmount}`,
                      status: isOwing ? "Owes You" : "You Owe",
                      color: isOwing ? "green" : "red",
                    }}
                    memberId={balance.memberdetails?._id}
                    memberName={memberName}
                    groupId={groupId}
                    balance={displayAmount}
                  />
                );
              })}
            </SimpleGrid>
          ) : (
            <Text color="slate.400">No members available</Text>
          )}
        </Box>
      )}

      {/* Expenses Tab Content */}
      {activeTab === "expenses" && (
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
      )}
    </Box>
  );
}

export default GroupDetailsPage;
