import {
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
  HStack,
  Stat,
  Skeleton,
  Center,
} from "@chakra-ui/react";

import CreateGroupDialog from "./CreateGroupDialog";

import { MdGroups } from "react-icons/md";
import GroupCardComponents from "../../src/components/GroupCardComponents";
import { useGroups } from "../../src/features/groups/hooks";

function GroupList() {
  const { data: groups = [], isLoading } = useGroups();
  const validGroups = Array.isArray(groups) ? groups : [];

  return (
    <Box
      maxW="1200px"
      mx="auto"
      px={6}
      py={10}
      minH="100vh"
      bg="#0f172a">
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

        {/* dialog box to create new group  */}
        <CreateGroupDialog />
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
