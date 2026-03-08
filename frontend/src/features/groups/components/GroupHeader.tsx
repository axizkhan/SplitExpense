import { HStack, Button, VStack, Heading, Text } from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function GroupHeader({ groupName }: { groupName: string }) {
  const navigate = useNavigate();
  return (
    <HStack
      gap={3}
      mb={5}>
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
          {groupName}
        </Heading>
        <Text
          color="slate.400"
          fontSize="sm">
          Financial Details
        </Text>
      </VStack>
    </HStack>
  );
}
