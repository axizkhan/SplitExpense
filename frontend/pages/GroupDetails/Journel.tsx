import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Card,
  Badge,
  SimpleGrid,
  Button,
  Icon,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { LuIndianRupee, LuDot } from "react-icons/lu";
import { MdNotificationsActive } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useJournalEntries } from "../../src/features/groups/hooks-journal";
import { useParams } from "react-router-dom";
import { useAuth } from "../../src/core/state/auth";
import { useState } from "react";

function Journel() {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: journalData, isLoading } = useJournalEntries(groupId || "", pageNumber);

  const userName = user?.firstName || "User";

  return (
    <Box p={{ base: 4, md: 8 }}>
      {/* header*/}
      <Stack
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align={{ base: "flex-start", lg: "center" }}
        gap={6}
        mb={8}>
        {/* User Info */}
        <HStack align="center" gap={4}>
          <Icon boxSize={10} color="teal.500">
            <FaUser />
          </Icon>
          <VStack align="start" gap={0}>
            <Heading size="lg">{userName}</Heading>
            <Text fontSize="sm" color="gray.500">
              Member of this group
            </Text>
          </VStack>
        </HStack>

        {/* Settlement Card */}
        <Card.Root w={{ base: "full", md: "350px" }}>
          <Card.Body>
            <Text fontSize="sm" color="gray.500">
              SETTLEMENT SUMMARY
            </Text>

            <Heading
              size="md"
              display="flex"
              alignItems="center"
              gap={1}
              mt={2}
              color="green.500">
              Transactions record
            </Heading>
          </Card.Body>

          <Card.Footer justifyContent="space-between">
            <Badge colorPalette="green">
              Entries <LuIndianRupee /> {journalData?.entries?.length || 0}
            </Badge>
          </Card.Footer>
        </Card.Root>
      </Stack>

      {/*  Main Body */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} alignItems="start">
        {/* Transaction History */}
        <VStack align="start" gap={6} gridColumn={{ lg: "span 2" }}>
          <Heading size="md">Transaction History</Heading>

          {isLoading ? (
            <VStack w="full" gap={4}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} height="100px" w="full" borderRadius="xl" />
              ))}
            </VStack>
          ) : journalData?.entries && journalData.entries.length > 0 ? (
            <>
              {journalData.entries.map((entry: any, idx: number) => (
                <Card.Root key={idx} w="full">
                  <Card.Body>
                    <HStack justify="space-between" align="start">
                      <HStack align="start" gap={4}>
                        <Icon boxSize={8} color="green.500">
                          <RiMoneyRupeeCircleLine />
                        </Icon>

                        <VStack align="start" gap={1}>
                          <Heading size="sm">{entry.description}</Heading>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(entry.createdAt).toLocaleDateString()} <LuDot />{" "}
                            {entry.user?.firstName || "User"}
                          </Text>
                        </VStack>
                      </HStack>

                      <VStack align="end" gap={1}>
                        <Heading size="sm" color="green.500">
                          <LuIndianRupee /> {entry.amount}
                        </Heading>
                        <Text fontSize="xs" color="green.500">
                          {entry.type.toUpperCase()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              ))}

              {journalData.totalPages && journalData.totalPages > 1 && (
                <Button
                  variant="outline"
                  alignSelf="center"
                  onClick={() => setPageNumber(pageNumber + 1)}>
                  View More Journal
                </Button>
              )}
            </>
          ) : (
            <Card.Root w="full">
              <Card.Body>
                <Text color="gray.500">No transactions yet</Text>
              </Card.Body>
            </Card.Root>
          )}
        </VStack>

        {/* Quick action card*/}
        <VStack
          align="stretch"
          gap={4}
          p={4}
          bg="gray.950"
          borderRadius="xl"
          shadow="sm">
          <Heading size="md">Quick Actions</Heading>

          <Button variant="outline" colorScheme="teal">
            <MdNotificationsActive />
            Notify Member
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

export default Journel;
