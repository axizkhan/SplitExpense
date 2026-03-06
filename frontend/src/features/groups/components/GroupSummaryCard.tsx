import { Badge, Box, Heading, Text, VStack } from "@chakra-ui/react";

function GroupSummaryCard({
  i,
  card,
}: {
  i: number;
  card: { title: string; amount: number; badge?: string; color?: string };
}) {
  const colors = {
    green: {
      bg: "rgba(34, 197, 94, 0.1)",
      border: "rgba(34, 197, 94, 0.3)",
      text: "green.300",
      dark: "rgba(34, 197, 94, 0.05)",
    },
    red: {
      bg: "rgba(239, 68, 68, 0.1)",
      border: "rgba(239, 68, 68, 0.3)",
      text: "red.300",
      dark: "rgba(239, 68, 68, 0.05)",
    },
    teal: {
      bg: "rgba(20, 184, 166, 0.1)",
      border: "rgba(20, 184, 166, 0.3)",
      text: "cyan.300",
      dark: "rgba(20, 184, 166, 0.05)",
    },
  };

  const colorScheme = card.color
    ? colors[card.color as keyof typeof colors]
    : colors.green;

  return (
    <Box
      key={i}
      p={{ base: 5, md: 6 }}
      bg={`linear-gradient(135deg, ${colorScheme.dark} 0%, rgba(15, 23, 42, 0.9) 100%)`}
      borderRadius="2xl"
      border="1px solid"
      borderColor={colorScheme.border}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: `0 8px 24px ${colorScheme.border}`,
        borderColor: colorScheme.text,
      }}>
      <VStack
        align="start"
        gap={3}
        w="full">
        <Text
          fontSize="xs"
          fontWeight="700"
          color="slate.400"
          textTransform="uppercase"
          letterSpacing="0.5px">
          {card.title}
        </Text>

        <Heading
          size="xl"
          color={colorScheme.text}
          fontWeight="800">
          ₹{card.amount}
        </Heading>

        {card.badge && (
          <Badge
            colorPalette={card.color || "green"}
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="md"
            fontWeight="600">
            {card.badge}
          </Badge>
        )}
      </VStack>
    </Box>
  );
}

export default GroupSummaryCard;
