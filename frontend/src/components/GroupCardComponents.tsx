import { Button, Card, HStack, Stack, Text, Box, Icon } from "@chakra-ui/react";
import { GrGroup } from "react-icons/gr";
import { IoMdOpen } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import type { Group } from "@/infrastructure/api/group.repository";

interface GroupCardProps {
  group: Group;
}

function GroupCardComponents({ group }: GroupCardProps) {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/group/${group._id}`);
  };

  const createdDate = new Date(group.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card.Root
      borderRadius="xl"
      boxShadow="sm"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-4px)",
      }}
      transition="all 0.2s ease"
      cursor="pointer">
      <Card.Body>
        <HStack
          mb={4}
          gap={3}>
          <Box
            p={3}
            bg="teal.50"
            borderRadius="full"
            color="teal.600">
            <Icon
              as={GrGroup}
              boxSize={5}
            />
          </Box>

          <Text
            fontWeight="semibold"
            fontSize="lg">
            {group.name}
          </Text>
        </HStack>

        <Text
          fontSize="sm"
          color="gray.500">
          {group.description || "No description provided"}
        </Text>
      </Card.Body>

      <Card.Footer
        justifyContent="space-between"
        alignItems="center">
        <Stack gap={0}>
          <Text
            fontSize="sm"
            color="gray.500">
            Members: {group.members.length}
          </Text>
          <Text
            fontSize="xs"
            color="gray.400">
            Created: {createdDate}
          </Text>
        </Stack>

        <Button
          size="sm"
          variant="outline"
          colorScheme="teal"
          borderRadius="full"
          onClick={handleOpen}>
          Open
          <IoMdOpen />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default GroupCardComponents;
