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
import { useCreateExpense } from "../../src/features/groups/hooks-expense";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CreateExpenseDialog() {
  const { groupId } = useParams<{ groupId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
  });

  const { mutate, isPending } = useCreateExpense();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.title.trim() && formData.amount) {
      mutate(
        {
          payload: {
            title: formData.title,
            amount: parseFloat(formData.amount),
            description: formData.description,
          },
          groupId: groupId || "",
        },
        {
          onSuccess: () => {
            setFormData({ title: "", amount: "", description: "" });
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
          variant="outline"
          size="sm"
          colorScheme="teal">
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
                gap={4}>
                <Field.Root required>
                  <Field.Label>
                    Title <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="e.g., Groceries, Movie tickets"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Amount <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Enter amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    placeholder="Add description (optional)"
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
                Create Expense
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

export default CreateExpenseDialog;
