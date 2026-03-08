import {
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { GroupSummaryCard } from "@/features/groups/components";
import { GroupMemberCard } from "@/features/groups/components";
import { PaymentDialog } from "@/features/payments/components";
import { AddMemberDialog } from "@/features/groups/components";
import { useGroupDetails } from "@/features/groups/hooks";
import { useParams, useNavigate } from "react-router-dom";

function GroupMember() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { data: groupDetails, isLoading } = useGroupDetails(groupId || "");

  if (isLoading) {
    return (
      <Box
        px={{ base: 4, md: 6 }}
        py={{ base: 6, md: 8 }}>
        <Skeleton
          height="40px"
          mb={6}
        />
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          gap={6}
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
        px={{ base: 4, md: 6 }}
        py={{ base: 6, md: 8 }}>
        <Text>Group not found</Text>
      </Box>
    );
  }

  const summaryCards = [
    {
      title: "Total Group Expense",
      amount: groupDetails.userData?.totalSpent || 0,
      badge: "All time",
      color: "green",
    },
    {
      title: "You Owe",
      amount: groupDetails.userData?.youOwe || 0,
      badge: "Pending payments",
      color: "red",
    },
    {
      title: "You Will Receive",
      amount: groupDetails.userData?.youWillReceive || 0,
      badge: "From members",
      color: "teal",
    },
  ];

  return (
    <Box
      px={6}
      py={6}>
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
            onClick={() => navigate("/dashboard")}>
            <IoArrowBack />
          </Button>
          <VStack
            align="start"
            gap={1}>
            <Heading size="lg">{groupDetails.group?.name}</Heading>
            <Text color="gray.400">Financial Ledger</Text>
          </VStack>
        </HStack>

        <AddMemberDialog groupId={groupId || ""} />
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

      {/* MEMBER CARDS */}
      <Box>
        <Heading
          size="md"
          mb={6}>
          Ledger Details
        </Heading>

        {groupDetails.balances && groupDetails.balances.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            gap={6}>
            {groupDetails.balances.map((balance: any, i: number) => (
              <Box key={i}>
                <GroupMemberCard
                  i={i}
                  member={{
                    name: balance.memberName,
                    amount: `₹${balance.amount}`,
                    status: balance.type === "owe" ? "They Owe You" : "You Owe",
                    color: balance.type === "owe" ? "teal" : "red",
                  }}
                />
                {balance.amount > 0 && (
                  <PaymentDialog
                    memberId={balance.memberId}
                    memberName={balance.memberName}
                    groupId={groupId || ""}
                    balance={balance.amount}
                  />
                )}
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.500">No balance details available</Text>
        )}
      </Box>
    </Box>
  );
}

export default GroupMember;
