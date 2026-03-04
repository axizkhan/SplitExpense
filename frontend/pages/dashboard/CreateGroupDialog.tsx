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
function CreateGroupDialog() {
  return (
    <Dialog.Root
      size={{ mdDown: "lg", md: "md" }}
      placement="center">
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm">
          <HiOutlinePlus /> Create Group
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="flex flex-col">
              <Dialog.Title>Create New Group</Dialog.Title>
              <p>Organise your shared expenses with friends and family</p>
            </Dialog.Header>
            <Dialog.Body>
              <VStack
                justify="space-between"
                align="center"
                gap={10}>
                <Field.Root required>
                  <Field.Label>
                    Email <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="Enter your email" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Password <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="Enter your email" />
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Create Group</Button>
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
