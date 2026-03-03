import { Badge, Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

function GroupSummaryCard({
  i,
  card,
}: {
  i: number;
  card: { title: string; amount: number };
}) {
  return (
    <Box
      key={i}
      p={6}
      bg="gray.900"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.800"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-6px)",
        bg: "gray.800",
        borderColor: "gray.700",
      }}>
      <Text
        fontSize="sm"
        color="gray.400">
        {card.title}
      </Text>

      <Heading
        mt={2}
        size="lg">
        {card.amount}
      </Heading>

      {/* <Badge
        mt={3}
        colorPalette={card.color}>
        {card.badge}
      </Badge> */}
    </Box>
  );
}

export default GroupSummaryCard;
