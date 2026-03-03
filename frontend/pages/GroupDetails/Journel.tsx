import React from "react";
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
} from "@chakra-ui/react";
import { LuIndianRupee, LuDot } from "react-icons/lu";
import { MdNotificationsActive, MdCreditCard } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import PaymentDialog from "./PaymentDialog";

function Journel() {
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
        <HStack
          align="center"
          gap={4}>
          <Icon
            boxSize={10}
            color="teal.500">
            <FaUser />
          </Icon>
          <VStack
            align="start"
            gap={0}>
            <Heading size="lg">Rahul</Heading>
            <Text
              fontSize="sm"
              color="gray.500">
              Member of Apartment 4B
            </Text>
          </VStack>
        </HStack>

        {/* Settlement Card */}
        <Card.Root w={{ base: "full", md: "350px" }}>
          <Card.Body>
            <Text
              fontSize="sm"
              color="gray.500">
              SETTLEMENT SUMMARY
            </Text>

            <Heading
              size="md"
              display="flex"
              alignItems="center"
              gap={1}
              mt={2}
              color="green.500">
              You will receive <LuIndianRupee /> 4500
            </Heading>
          </Card.Body>

          <Card.Footer justifyContent="space-between">
            <Badge colorPalette="green">
              Lent <LuIndianRupee /> 12000
            </Badge>
            <Badge colorPalette="red">
              Borrowed <LuIndianRupee /> 8000
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
          <Heading size="md">Transaction History</Heading>

          {/* Journal Entry Card */}
          <Card.Root w="full">
            <Card.Body>
              <HStack
                justify="space-between"
                align="start">
                <HStack
                  align="start"
                  gap={4}>
                  <Icon
                    boxSize={8}
                    color="green.500">
                    <RiMoneyRupeeCircleLine />
                  </Icon>

                  <VStack
                    align="start"
                    gap={1}>
                    <Heading size="sm">You lent Rahul</Heading>
                    <Text
                      fontSize="sm"
                      color="gray.500">
                      Oct 24, 2023 <LuDot /> Monthly utility bill
                    </Text>
                  </VStack>
                </HStack>

                <VStack
                  align="end"
                  gap={1}>
                  <Heading
                    size="sm"
                    color="green.500">
                    <LuIndianRupee /> 1200
                  </Heading>
                  <Text
                    fontSize="xs"
                    color="green.500">
                    RECEIVABLE
                  </Text>
                </VStack>
              </HStack>
            </Card.Body>
          </Card.Root>

          <Button
            variant="outline"
            alignSelf="center">
            View More Journal
          </Button>
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

          <PaymentDialog />

          <Button
            variant="outline"
            colorScheme="teal">
            <MdNotificationsActive />
            Notify Member
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

export default Journel;
