import { SimpleGrid } from "@chakra-ui/react";
import GroupSummaryCard from "./GroupSummaryCard";

export default function GroupSummaryCards({
  summaryCards,
}: {
  summaryCards: any[];
}) {
  return (
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
  );
}
