import { HStack, Button } from "@chakra-ui/react";

export default function GroupTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: "members" | "expenses";
  setActiveTab: (tab: "members" | "expenses") => void;
}) {
  return (
    <HStack
      gap={0}
      borderBottomWidth="2px"
      borderBottomColor="slate.700"
      mb={8}>
      <Button
        variant="ghost"
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
        _hover={{ color: "green.300" }}>
        Members
      </Button>
      <Button
        variant="ghost"
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
        _hover={{ color: "green.300" }}>
        Expenses
      </Button>
    </HStack>
  );
}
