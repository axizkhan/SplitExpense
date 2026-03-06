import {
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
  HStack,
  Skeleton,
  Center,
  Image,
  Button,
} from "@chakra-ui/react";

import { CreateGroupDialog } from "@/features/groups/components";

import { MdGroups } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { GroupCardComponents } from "@/features/groups/components";
import { useGroups } from "@/features/groups/hooks";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/core/state/auth.store";

function GroupList() {
  const { data: groups = [], isLoading } = useGroups();
  const navigate = useNavigate();
  const validGroups = Array.isArray(groups) ? groups : [];
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      maxW="1200px"
      mx="auto"
      px={6}
      py={10}
      minH="100vh"
      bg="bg.primary">
      {/* App Header with Logo */}
      <HStack
        justify="flex-start"
        align="center"
        gap={3}
        mb={10}
        cursor="pointer"
        onClick={() => navigate("/dashboard")}
        transition="all 0.2s"
        _hover={{ opacity: 0.8 }}>
        <Box
          bg="linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
          p={2}
          borderRadius="lg"
          border="1px solid"
          borderColor="slate.700">
          <Image
            src="/image.png"
            alt="Splitly Logo"
            height="32px"
            width="32px"
            objectFit="contain"
          />
        </Box>
        <Heading
          size="lg"
          color="text.primary"
          fontWeight="800">
          Splitly
        </Heading>
      </HStack>

      {/* Header */}
      <HStack
        justify="space-between"
        align="flex-start"
        mb={10}>
        <VStack
          align="flex-start"
          gap={2}>
          <Heading
            size="xl"
            color="slate.100"
            fontWeight="800">
            Your Groups
          </Heading>
          <Text
            color="slate.400"
            fontSize="sm">
            Manage and track shared expenses
          </Text>
        </VStack>

        {/* dialog box to create new group and logout button */}
        <HStack gap={3}>
          <CreateGroupDialog />
          <Button
            size="sm"
            colorPalette="red"
            variant="solid"
            gap={2}
            onClick={handleLogout}
            px={{ mdDown: 2, md: 3 }}>
            <MdLogout />
            <Text display={{ base: "none", md: "inline" }}>Logout</Text>
          </Button>
        </HStack>
      </HStack>

      {/* Main Layout */}
      <SimpleGrid
        columns={{ base: 1, lg: 4 }}
        gap={8}>
        {/* Groups Section */}
        <Box gridColumn={{ base: "span 1", lg: "span 3" }}>
          <HStack
            justify="space-between"
            align="center"
            mb={6}>
            <Heading
              size="md"
              color="slate.100">
              Groups ({validGroups.length})
            </Heading>
          </HStack>

          {isLoading ? (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={6}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  height="200px"
                  borderRadius="2xl"
                />
              ))}
            </SimpleGrid>
          ) : validGroups.length === 0 ? (
            <Center
              p={12}
              borderWidth="2px"
              borderStyle="dashed"
              borderRadius="2xl"
              borderColor="slate.700"
              bg="linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.7) 100%)">
              <VStack gap={3}>
                <Text
                  color="slate.400"
                  fontSize="lg">
                  No groups yet
                </Text>
                <Text
                  color="slate.500"
                  fontSize="sm">
                  Create your first group to get started
                </Text>
              </VStack>
            </Center>
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={6}>
              {validGroups.map((group: any) => (
                <GroupCardComponents
                  key={group._id}
                  group={group}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>

        {/* Summary Sidebar */}
        <VStack
          align="stretch"
          gap={6}
          className="lg:h-10">
          <Box
            p={6}
            bg="linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)"
            borderWidth="1px"
            borderColor="rgba(34, 197, 94, 0.3)"
            rounded="2xl"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)">
            <HStack
              justify="space-between"
              mb={3}>
              <Text
                fontSize="xs"
                fontWeight="700"
                color="slate.400"
                textTransform="uppercase"
                letterSpacing="0.5px">
                Active Groups
              </Text>
              <MdGroups
                color="#22c55e"
                size={20}
              />
            </HStack>

            <Heading
              size="2xl"
              color="green.300"
              fontWeight="800">
              {validGroups.length}
            </Heading>
          </Box>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

export default GroupList;
