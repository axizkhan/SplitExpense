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

  if (!group || !group._id) {
    return null;
  }

  const handleOpen = () => {
    navigate(`/group/${group._id}`);
  };

  const createdDate = group.createdAt
    ? new Date(group.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  const memberCount = Array.isArray(group.members) ? group.members.length : 0;

  return (
    <Card.Root
      role="group"
      bg="rgba(15, 23, 42, 0.75)"
      backdropFilter="blur(16px)"
      borderRadius="2xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      boxShadow="0 8px 30px rgba(0, 0, 0, 0.35)"
      overflow="hidden"
      position="relative"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "green.400",
        boxShadow: "0 12px 40px rgba(34, 197, 94, 0.25)",
      }}>
      {/* Subtle top accent glow */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="2px"
        bg="linear-gradient(90deg, transparent, #22c55e, transparent)"
        opacity="0"
        transition="opacity 0.3s ease"
        _groupHover={{ opacity: 1 }}
      />

      <Card.Body
        px={6}
        py={5}>
        <HStack
          align="start"
          gap={4}>
          {/* Icon */}
          <Box
            p={3}
            borderRadius="xl"
            bg="rgba(34,197,94,0.12)"
            border="1px solid"
            borderColor="rgba(34,197,94,0.25)"
            color="green.400"
            transition="all 0.3s ease"
            _groupHover={{
              bg: "rgba(34,197,94,0.18)",
              transform: "scale(1.05)",
            }}>
            <Icon
              as={GrGroup}
              boxSize={5}
            />
          </Box>

          {/* Content */}
          <Stack
            gap={1}
            flex="1">
            <Text
              fontWeight="700"
              fontSize="lg"
              color="white"
              letterSpacing="-0.2px">
              {group.name || "Unnamed Group"}
            </Text>

            <Text
              fontSize="sm"
              color="slate.400"
              lineHeight="1.5">
              {group.description || "No description provided"}
            </Text>
          </Stack>
        </HStack>
      </Card.Body>

      <Card.Footer
        px={6}
        py={4}
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Stack gap={0}>
          <Text
            fontSize="xs"
            color="slate.300"
            fontWeight="500">
            {memberCount} {memberCount === 1 ? "member" : "members"}
          </Text>
          <Text
            fontSize="xs"
            color="slate.500">
            Created {createdDate}
          </Text>
        </Stack>

        <Button
          size="sm"
          variant="solid"
          bg="green.500"
          color="white"
          borderRadius="lg"
          px={4}
          fontWeight="600"
          transition="all 0.2s ease"
          _hover={{
            bg: "green.400",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(34,197,94,0.4)",
          }}
          _active={{
            transform: "translateY(0)",
          }}
          onClick={handleOpen}>
          Open
          <IoMdOpen size={14} />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default GroupCardComponents;
