import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { useCreatePayment } from "@/features/groups/hooks-payment";
import { useState } from "react";

interface PaymentDialogProps {
  memberId: string;
  memberName: string;
  groupId: string;
  balance: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function PaymentDialog({
  memberId,
  memberName,
  groupId,
  balance,
  isOpen: controlledIsOpen,
  onOpenChange,
}: PaymentDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (value: boolean) => {
    if (controlledIsOpen !== undefined && onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalIsOpen(value);
    }
  };
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
      <Portal>
        <Dialog.Backdrop zIndex={1200} />
        <Dialog.Positioner zIndex={1200}>
          <Dialog.Content
            p={{ base: 5, md: 7 }}
            bg="linear-gradient(180deg, #0f172a 0%, #111827 100%)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="xl"
            boxShadow="0 20px 60px rgba(0,0,0,0.6)">
            {/* HEADER */}
            <Dialog.Header mb={4}>
              <VStack
                align="start"
                gap={1}>
                <Dialog.Title
                  fontSize="xl"
                  fontWeight="700"
                  color="white">
                  Make Payment
                </Dialog.Title>
                <Text
                  fontSize="sm"
                  color="gray.400">
                  Pay {memberName}
                </Text>
              </VStack>
            </Dialog.Header>

            {/* BALANCE CARD */}
            <Box
              bg={isOwing ? "red.900/30" : "green.900/30"}
              border="1px solid"
              borderColor={isOwing ? "red.500/40" : "green.500/40"}
              borderRadius="lg"
              p={4}
              mb={6}>
              <Text
                fontWeight="600"
                fontSize="sm"
                color="gray.300"
                mb={1}>
                Current Balance
              </Text>

              <Text
                fontSize="lg"
                fontWeight="700"
                color={isOwing ? "red.400" : "green.400"}>
                {isOwing
                  ? `You owe ₹${balance}`
                  : `You are owed ₹${Math.abs(balance)}`}
              </Text>
            </Box>

            {/* BODY */}
            <Dialog.Body pb={6}>
              <Field.Root required>
                <Field.Label
                  color="gray.300"
                  fontWeight="500">
                  Amount <Field.RequiredIndicator />
                </Field.Label>

                <Input
                  placeholder="Enter amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  size="lg"
                  px={2}
                  bg="whiteAlpha.50"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{
                    borderColor: "whiteAlpha.400",
                  }}
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 2px rgba(20,184,166,0.4)",
                  }}
                  _placeholder={{ color: "gray.500" }}
                />
              </Field.Root>
            </Dialog.Body>

            {/* FOOTER */}
            <Dialog.Footer
              borderTop="1px solid"
              borderColor="whiteAlpha.200"
              pt={4}
              gap={3}>
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                color="gray.300"
                _hover={{ bg: "whiteAlpha.100", color: "white" }}>
                Cancel
              </Button>

              <Button
                bg="teal.500"
                _hover={{ bg: "teal.400" }}
                px={{ mdDown: 2, md: 4 }}
                color="white"
                fontWeight="600"
                onClick={handleSubmit}
                loading={isPending}
                loadingText="Processing...">
                Make Payment
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                color="gray.400"
                px={2}
                py={4}
                _hover={{ color: "white" }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default PaymentDialog;
