import React from "react";
import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
function CreateExpenseDialog() {
  return (
    <Dialog.Root
      size={{ mdDown: "lg", md: "md" }}
      placement="center">
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm">
          <HiOutlinePlus /> Create Expense
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="flex flex-col">
              <Dialog.Title>Add New Expense</Dialog.Title>
              <p>Record a shared expense</p>
            </Dialog.Header>
            <Dialog.Body>
              <VStack
                justify="space-between"
                align="center"
                gap={10}>
                <Field.Root required>
                  <Field.Label>
                    Title <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="Expense Title" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Amount <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="Enter Amount" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Description <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="Enter Description" />
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Create Expense</Button>
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

export default CreateExpenseDialog;
