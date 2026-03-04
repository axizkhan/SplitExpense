import {
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
import { MdCreditCard } from "react-icons/md";
import { useCreatePayment } from "../../src/features/groups/hooks-payment";
import { useState } from "react";

interface PaymentDialogProps {
  memberId: string;
  memberName: string;
  groupId: string;
  balance: number;
}

function PaymentDialog({
  memberId,
  memberName,
  groupId,
  balance,
}: PaymentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");

  const { mutate, isPending } = useCreatePayment();

  const handleSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      mutate(
        {
          groupId,
          paidToId: memberId,
          amount: parseFloat(amount),
        } as any,
        {
          onSuccess: () => {
            setAmount("");
            setIsOpen(false);
          },
        },
      );
    }
  };

  const isOwing = balance > 0;

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
          <MdCreditCard /> Payment
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={{ mdDown: 1, md: 2 }}>
            <Dialog.Header className="flex flex-col">
              <Dialog.Title>Make Payment</Dialog.Title>
              <Text> Pay {memberName}</Text>
            </Dialog.Header>
            <Alert.Root status={isOwing ? "error" : "success"}>
              <Alert.Indicator />
              <Alert.Title>
                Current Balance:{" "}
                {isOwing
                  ? `You owe ₹${balance}`
                  : `You are owed ₹${Math.abs(balance)}`}
              </Alert.Title>
            </Alert.Root>
            <Dialog.Body>
              <VStack
                justify="space-between"
                align="center"
                gap={4}>
                <Field.Root required>
                  <Field.Label>
                    Amount <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
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
                Make Payment
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

export default PaymentDialog;
