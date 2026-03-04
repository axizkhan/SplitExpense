import React from "react";
import {
  Box,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Text,
  VStack,
  Alert,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { MdCreditCard } from "react-icons/md";
function CreateGroupDialog() {
  return (
    <Dialog.Root
      size={{ mdDown: "lg", md: "md" }}
      placement="center">
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm">
          <MdCreditCard /> Payment
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={{ mdDown: 1, md: 2 }}>
            <Dialog.Header className="flex flex-col">
              <Dialog.Title>Make Payment</Dialog.Title>
              <Text> Pay Rahul</Text>
            </Dialog.Header>
            <Alert.Root status="error">
              <Alert.Indicator />
              <Alert.Title>Current Balance: You owe 4500</Alert.Title>
            </Alert.Root>
            <Dialog.Body>
              <VStack
                justify="space-between"
                align="center"
                gap={10}>
                <Field.Root required>
                  <Field.Label>
                    Amount <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="Enter amount" />
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Make Payment</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default CreateGroupDialog;
