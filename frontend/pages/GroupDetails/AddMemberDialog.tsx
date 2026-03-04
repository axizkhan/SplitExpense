import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { IoPersonAdd } from "react-icons/io5";
import { useAddMember } from "../../src/features/groups/hooks";
import { useState } from "react";

interface AddMemberDialogProps {
  groupId: string;
}

function AddMemberDialog({ groupId }: AddMemberDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useAddMember();

  const handleSubmit = () => {
    if (email.trim()) {
      mutate(
        {
          groupId,
          payload: { newMemberEmail: email },
        },
        {
          onSuccess: () => {
            setEmail("");
            setIsOpen(false);
          },
        },
      );
    }
  };

  return (
    <Dialog.Root
      size={{ mdDown: "lg", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button
          colorScheme="teal"
          alignSelf={{ base: "stretch", md: "auto" }}>
          <IoPersonAdd /> Add Member
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="flex flex-col">
              <Dialog.Title>Add Group Member</Dialog.Title>
              <p>Invite someone to join this group</p>
            </Dialog.Header>
            <Dialog.Body>
              <VStack
                justify="space-between"
                align="center"
                gap={4}>
                <Field.Root required>
                  <Field.Label>
                    Email <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Enter member's email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorScheme="teal"
                onClick={handleSubmit}
                disabled={isPending}>
                Add Member
              </Button>
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

export default AddMemberDialog;
