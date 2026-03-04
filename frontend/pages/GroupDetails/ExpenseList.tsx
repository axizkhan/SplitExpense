import React from "react";
import { Box, Button, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import ExpenseCardComponent from "../../src/components/ExpenseCardComponent";
import { HiOutlinePlus } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import { Code, Menu, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import CreateExpenseDialog from "./CreateExpenseDialog";

function ExpenseList() {
  const [open, setOpen] = useState(false);
  return (
    <Box
      maxWidth="1200px"
      mx="auto"
      px={6}
      py={10}>
      {/* header  */}
      <HStack
        maxWidth="1200px"
        justifyContent="space-between"
        mb="10">
        {/* back button  */}
        <Button variant="outline">
          <IoArrowBack />
        </Button>
        <VStack
          align="center"
          gap={1}>
          <Heading>Expenses</Heading>
          <Text>All Expenses</Text>
          <Badge
            variant="solid"
            size={"lg"}>
            4800
          </Badge>
        </VStack>

        {/* menu button  */}
        <Menu.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}>
          <Menu.Trigger asChild>
            <Button
              variant="outline"
              size="sm">
              <BsThreeDotsVertical />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="new-txt">New Text File</Menu.Item>
                <Menu.Item value="new-file">New File...</Menu.Item>
                <Menu.Item value="new-win">New Window</Menu.Item>
                <Menu.Item value="open-file">Open File...</Menu.Item>
                <Menu.Item value="export">Export</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
      {/* main contain  */}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={6}>
        <ExpenseCardComponent />
        <ExpenseCardComponent />
        <ExpenseCardComponent />
        <ExpenseCardComponent />
      </SimpleGrid>

      {/* create new expense  */}
      <Box
        maxWidth="1200px"
        mx="auto"
        px={6}
        py={10}
        border={1}
        alignItems={"end"}
        justifyItems={"end"}>
        <CreateExpenseDialog />
      </Box>
    </Box>
  );
}

export default ExpenseList;
