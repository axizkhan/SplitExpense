import {
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
  HStack,
  Stat,
  Skeleton,
} from "@chakra-ui/react";

import CreateGroupDialog from "./CreateGroupDialog";

import { MdGroups } from "react-icons/md";
import GroupCardComponents from "../../src/components/GroupCardComponents";
import { useGroups } from "../../src/features/groups/hooks";

function GroupList() {
  const { data: groups = [], isLoading } = useGroups();

  return (
    <Box
      maxW="1200px"
      mx="auto"
      px={6}
      py={10}>
      {/* Header */}
      <HStack
        justify="space-between"
        align="flex-start"
        mb={10}>
        <VStack
          align="flex-start"
          gap={1}>
          <Heading size="xl">Your Groups</Heading>
          <Text color="gray.500">Manage and track shared expenses</Text>
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
          <Heading
            size="md"
            mb={6}>
            Total: {groups.length} Group{groups.length !== 1 ? "s" : ""}
          </Heading>

          {isLoading ? (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={6}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  height="200px"
                  borderRadius="xl"
                />
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={6}>
              {groups.map((group: any) => (
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
          <Stat.Root
            p={5}
            borderWidth="1px"
            rounded="xl"
            shadow="sm">
            <HStack justify="space-between">
              <Stat.Label>Active Groups</Stat.Label>
              <MdGroups />
            </HStack>

            <Stat.ValueText
              fontSize="2xl"
              fontWeight="bold">
              {groups.length}
            </Stat.ValueText>
          </Stat.Root>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

export default GroupList;
