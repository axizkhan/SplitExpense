import {
  Badge,
  Box,
  Heading,
  HStack,
  IconButton,
  Menu,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function GroupMemberCard({
  i,
  member,
}: {
  i: number;
  member: { name: string; amount: string; color: string; status: string };
}) {
  return (
    <Box
      key={i}
      p={6}
      bg="gray.900"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.800"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-4px)",
        bg: "gray.800",
        borderColor: "gray.700",
      }}>
      <HStack
        justify="space-between"
        align="start">
        <VStack
          align="start"
          gap={1}>
          <Text fontWeight="semibold">{member.name}</Text>
          <Badge colorPalette={member.color}>{member.status}</Badge>
        </VStack>

        {/* Chakra UI v3 Menu */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              size="sm"
              variant="ghost">
              <BsThreeDotsVertical />
            </IconButton>
          </Menu.Trigger>

          <Menu.Positioner>
            <Menu.Content
              bg="gray.900"
              border="1px solid"
              borderColor="gray.800">
              <Menu.Item value="journal">Journal</Menu.Item>
              <Menu.Item value="payment">Payment</Menu.Item>
              <Menu.Item value="notification">Notification</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </HStack>

      <Text
        mt={4}
        fontSize="xl"
        fontWeight="bold">
        {member.amount}
      </Text>
    </Box>
  );
}

export default GroupMemberCard;
