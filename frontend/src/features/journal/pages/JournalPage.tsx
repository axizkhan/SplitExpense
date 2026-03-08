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
import { MdNotificationsActive } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useUserToUserJournalEntries } from "@/features/journal/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/core/state/auth";
import { useState } from "react";
import { JournalEntryCard } from "@/features/journal/components";
import { PaymentDialog } from "@/features/payments/components";
import { IoArrowBack } from "react-icons/io5";

function Journel() {
  const { groupId, memberId } = useParams<{
    groupId: string;
    memberId: string;
  }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { data: journalData, isLoading } = useUserToUserJournalEntries(
    groupId || "",
    memberId || "",
    pageNumber,
  );

  const userName = user?.firstName || "User";

  // Extract member name and calculate balance from journal data
  const memberName = journalData?.entries?.[0]?.user?.firstName || "Member";
  const memberLastName = journalData?.entries?.[0]?.user?.lastName || "";
  const fullMemberName = `${memberName} ${memberLastName}`.trim();

  // Calculate balance: positive if member owes, negative if we owe
  const balance =
    journalData?.entries?.reduce((sum: number, journal: any) => {
      return (
        sum +
        (journal.entryArray?.reduce((entrySum: number, entry: any) => {
          if (entry.type === "EXPENSE") {
            return (
              entrySum +
              (entry.lenderId === memberId ? -entry.amount : entry.amount)
            );
          }
          return entrySum;
        }, 0) || 0)
      );
    }, 0) || 0;

  return (
    <Box
      px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 6, md: 8 }}
      minH="100vh"
      bg="#0f172a">
      {/* Back Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/group/${groupId}`)}
        borderColor="slate.700"
        color="slate.300"
        _hover={{ bg: "slate.800" }}
        mb={6}
        gap={2}
        px={{ mdDown: 1, md: 2 }}>
        <IoArrowBack />
      </Button>

      {/* header*/}
      <Stack
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align={{ base: "flex-start", lg: "center" }}
        gap={6}
        mb={8}>
        {/* User Info */}
        <HStack
          align="center"
          gap={4}>
          <Box
            p={3}
            bg="linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="rgba(34, 197, 94, 0.3)">
            <Icon
              boxSize={10}
              color="green.400">
              <FaUser />
            </Icon>
          </Box>
          <VStack
            align="start"
            gap={0}>
            <Heading
              size="lg"
              color="slate.100"
              fontWeight="800">
              {userName}
            </Heading>
            <Text
              fontSize="sm"
              color="slate.400">
              Member transactions
            </Text>
          </VStack>
        </HStack>

        {/* Settlement Card */}
        <Card.Root
          w={{ base: "full", md: "auto" }}
          bg="linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)"
          borderColor="rgba(34, 197, 94, 0.3)"
          border="1px solid"
          px={{ mdDown: 2, md: 8 }}
          py={{ mdDown: 1, md: 4 }}>
          <Card.Body>
            <Text
              fontSize="xs"
              fontWeight="700"
              color="slate.400"
              textTransform="uppercase"
              letterSpacing="1px">
              Settlement Summary
            </Text>

            <Heading
              size="md"
              display="flex"
              alignItems="center"
              gap={1}
              mt={2}
              color="green.300"
              fontWeight="700">
              Transactions
            </Heading>
          </Card.Body>

          <Card.Footer justifyContent="space-between">
            <Badge
              colorPalette="green"
              fontSize="sm"
              px={3}
              py={2}
              borderRadius="lg"
              fontWeight="700">
              {journalData?.entries?.reduce(
                (sum: number, j: any) => sum + (j.entryArray?.length || 0),
                0,
              ) || 0}{" "}
              entries
            </Badge>
          </Card.Footer>
        </Card.Root>
      </Stack>

      {/*  Main Body */}
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        gap={8}
        alignItems="start">
        {/* Transaction History */}
        <VStack
          align="start"
          gap={6}
          gridColumn={{ lg: "span 2" }}>
          <VStack
            align="start"
            w="full"
            gap={2}>
            <Heading
              size="md"
              color="slate.100"
              fontWeight="700">
              Transaction History
            </Heading>
            <Box
              h="1px"
              w="20"
              bg="linear-gradient(90deg, #22c55e, transparent)"
            />
          </VStack>

          {isLoading ? (
            <VStack
              w="full"
              gap={4}>
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  height="100px"
                  w="full"
                  borderRadius="xl"
                />
              ))}
            </VStack>
          ) : journalData?.entries && journalData.entries.length > 0 ? (
            <>
              {journalData.entries.flatMap((journal: any) =>
                journal.entryArray?.map((entry: any, idx: number) => (
                  <JournalEntryCard
                    key={`${journal._id}-${idx}`}
                    entry={entry}
                    journalId={journal._id}
                    idx={idx}
                  />
                )),
              )}

              {journalData.totalEntryCount !== undefined &&
                journalData.totalEntryCount > 10 && (
                  <Button
                    w="full"
                    variant="outline"
                    colorScheme="green"
                    borderColor="green.500"
                    color="green.400"
                    _hover={{
                      bg: "rgba(34, 197, 94, 0.1)",
                      borderColor: "green.400",
                    }}
                    onClick={() => setPageNumber(pageNumber + 1)}>
                    Load More Transactions
                  </Button>
                )}
            </>
          ) : (
            <Card.Root
              w="full"
              bg="linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.7) 100%)"
              borderColor="slate.700"
              border="1px dashed">
              <Card.Body
                textAlign="center"
                py={8}>
                <Text
                  color="slate.400"
                  fontSize="lg">
                  No transactions yet
                </Text>
              </Card.Body>
            </Card.Root>
          )}
        </VStack>

        {/* Quick action card*/}
        <VStack
          align="stretch"
          gap={4}
          p={6}
          bg="linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)"
          borderRadius="2xl"
          border="1px solid"
          borderColor="slate.700"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)">
          <Heading
            size="md"
            color="slate.100"
            fontWeight="700">
            Quick Actions
          </Heading>

          <Button
            variant="outline"
            colorScheme="green"
            borderColor="green.500"
            color="green.400"
            _hover={{
              bg: "rgba(34, 197, 94, 0.1)",
              borderColor: "green.400",
            }}
            onClick={() => setIsPaymentOpen(true)}>
            Make Payment
          </Button>

          <Button
            variant="outline"
            colorScheme="green"
            borderColor="green.500"
            color="green.400"
            _hover={{
              bg: "rgba(34, 197, 94, 0.1)",
              borderColor: "green.400",
            }}>
            <MdNotificationsActive />
            Notify Member
          </Button>

          {/* Payment Dialog */}
          {memberId && (
            <PaymentDialog
              memberId={memberId}
              memberName={fullMemberName}
              groupId={groupId || ""}
              balance={Math.abs(balance)}
              isOpen={isPaymentOpen}
              onOpenChange={setIsPaymentOpen}
            />
          )}
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

export default Journel;
