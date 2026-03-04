import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
  Textarea,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useCreateGroup } from "../../src/features/groups/hooks";
import { useState } from "react";

function CreateGroupDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { mutate, isPending } = useCreateGroup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.name.trim()) {
      mutate(
        formData as any, {
        onSuccess: () => {
          setFormData({ name: "", description: "" });
          setIsOpen(false);
        },
      });
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
          variant="outline"
          size="sm"
          colorScheme="teal">
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
                gap={4}>
                <Field.Root required>
                  <Field.Label>
                    Group Name <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="e.g., Apartment 4B, Trip 2024"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    placeholder="Add a description (optional)"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
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
                Create Group
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

export default CreateGroupDialog;
