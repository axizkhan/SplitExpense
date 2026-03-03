import {
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Stack,
  Badge,
  IconButton,
  Menu,
} from "@chakra-ui/react";
import { IoPersonAdd } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupSummaryCard from "../../src/components/GroupSummaryCard";
import GroupMemberCard from "../../src/components/GroupMemberCard";
import React from "react";

function GroupMember() {
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
        <VStack
          align="start"
          gap={1}>
          <Heading size="lg">Group Members</Heading>
          <Text color="gray.400">Apartment 4B Financial Ledger</Text>
        </VStack>

        <Button
          colorPalette="teal"
          alignSelf={{ base: "stretch", md: "auto" }}>
          <IoPersonAdd /> Add Member
        </Button>
      </Stack>

      {/* INFO CARDS */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        gap={6}
        mb={10}>
        {[
          {
            title: "Total Group Expense",
            amount: 120000,
            badge: "+12% this month",
            color: "green",
          },
          {
            title: "You Owe",
            amount: 5000,
            badge: "Pending 3 payments",
            color: "red",
          },
          {
            title: "You Will Receive",
            amount: 12000,
            badge: "From 4 members",
            color: "teal",
          },
        ].map((card, i) => (
          <GroupSummaryCard
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

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={6}>
          {[
            {
              name: "Arjun Mehta",
              amount: "₹4,500",
              status: "To Receive",
              color: "teal",
            },
            {
              name: "Priya Sharma",
              amount: "₹1,200",
              status: "You Owe",
              color: "red",
            },
            {
              name: "Rohan Verma",
              amount: "₹0",
              status: "Settled",
              color: "gray",
            },
          ].map((member, i) => (
            <GroupMemberCard
              i={i}
              member={member}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default GroupMember;
