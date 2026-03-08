import {
  Button,
  Card,
  HStack,
  Text,
  VStack,
  Heading,
  Icon,
  Box,
  Menu,
  IconButton,
  Dialog,
  Input,
  Field,
  Portal,
  CloseButton,
} from "@chakra-ui/react";

import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import type { Expense } from "@/infrastructure/api/expense.repository";
import { useState } from "react";
import {
  useEditExpense,
  useDeleteExpense,
} from "@/features/groups/hooks-expense";
import { useToast } from "@/shared/toastService";

interface ExpenseCardProps {
  expense: Expense;
}

function ExpenseCardComponent({ expense }: ExpenseCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editAmount, setEditAmount] = useState(expense.amount.toString());

  const toast = useToast();
  const { mutate: editExpense, isPending: isEditPending } = useEditExpense();
  const { mutate: deleteExpense, isPending: isDeletePending } =
    useDeleteExpense();

  const createdDate = new Date(expense.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleEditSubmit = () => {
    const newAmount = parseFloat(editAmount);
    if (newAmount > 0) {
      editExpense(
        { expenseId: expense._id, newExpenseAmount: newAmount },
        {
          onSuccess: () => {
            toast.success("Expense updated successfully");
            setIsEditOpen(false);
          },
          onError: () => {
            toast.error("Failed to update expense");
          },
        },
      );
    } else {
      toast.error("Amount must be greater than 0");
    }
  };

  const handleDeleteConfirm = () => {
    deleteExpense(expense._id, {
      onSuccess: () => {
        toast.success("Expense deleted successfully");
        setIsDeleteOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete expense");
      },
    });
  };

  return (
    <Card.Root
      bg="linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)"
      borderRadius="2xl"
      border="1px solid"
      borderColor="slate.700"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
      _hover={{
        boxShadow: "0 8px 20px rgba(34, 197, 94, 0.2)",
        transform: "translateY(-6px)",
        borderColor: "green.500",
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer">
      <Card.Body p={{ base: 5, md: 6 }}>
        <HStack
          justify="space-between"
          align="start">
          <VStack
            align="start"
            gap={3}
            flex={1}>
            <Heading
              size="md"
              color="slate.100"
              fontWeight="700">
              {expense.title}
            </Heading>

            <VStack
              align="start"
              gap={2}
              w="full">
              <HStack gap={2}>
                <Box
                  px={2}
                  py={1}
                  bg="rgba(34, 197, 94, 0.1)"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="rgba(34, 197, 94, 0.3)">
                  <Text
                    fontSize="xs"
                    color="green.300"
                    fontWeight="600">
                    Paid by{" "}
                    {typeof expense.paidBy === "object"
                      ? `${expense.paidBy.name.firstName} ${expense.paidBy.name.lastName}`
                      : expense.paidBy}
                  </Text>
                </Box>
                <Text
                  fontSize="xs"
                  color="slate.500">
                  {createdDate}
                </Text>
              </HStack>

              {expense.description && (
                <Text
                  fontSize="sm"
                  color="slate.400"
                  lineHeight="1.5">
                  {expense.description}
                </Text>
              )}
            </VStack>
          </VStack>

          <VStack
            align="end"
            gap={3}>
            <Box
              bg="linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)"
              px={4}
              py={3}
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(34, 197, 94, 0.3)">
              <HStack gap={1}>
                <Icon
                  color="green.300"
                  boxSize={5}>
                  <MdOutlineCurrencyRupee />
                </Icon>
                <Heading
                  size="md"
                  color="green.300"
                  fontWeight="800">
                  {expense.amount}
                </Heading>
              </HStack>
            </Box>

            {/* Menu with Edit and Delete options */}
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  size="sm"
                  variant="ghost"
                  color="slate.400"
                  _hover={{
                    bg: "whiteAlpha.100",
                    color: "white",
                  }}
                  _active={{
                    bg: "whiteAlpha.200",
                  }}
                  transition="all 0.2s ease">
                  <BsThreeDotsVertical />
                </IconButton>
              </Menu.Trigger>

              <Menu.Positioner>
                <Menu.Content
                  minW="180px"
                  p="6px"
                  bg="rgba(26, 35, 50, 0.95)"
                  backdropFilter="blur(12px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="lg"
                  boxShadow="0 10px 30px rgba(0, 0, 0, 0.45)"
                  zIndex={1000}
                  _open={{
                    animation: "fadeIn 0.15s ease-out",
                  }}>
                  {/* EDIT */}
                  <Menu.Item
                    value="edit"
                    borderRadius="md"
                    px="3"
                    py="2"
                    fontSize="sm"
                    fontWeight="500"
                    color="slate.200"
                    _hover={{
                      bg: "whiteAlpha.100",
                      color: "white",
                    }}
                    _active={{
                      bg: "whiteAlpha.200",
                    }}
                    transition="all 0.15s ease"
                    onClick={() => setIsEditOpen(true)}>
                    Edit Expense
                  </Menu.Item>

                  {/* DELETE */}
                  <Menu.Item
                    value="delete"
                    mt="4px"
                    borderRadius="md"
                    px="3"
                    py="2"
                    fontSize="sm"
                    fontWeight="500"
                    color="red.400"
                    _hover={{
                      bg: "rgba(239, 68, 68, 0.15)",
                      color: "red.300",
                    }}
                    _active={{
                      bg: "rgba(239, 68, 68, 0.25)",
                    }}
                    transition="all 0.15s ease"
                    onClick={() => setIsDeleteOpen(true)}>
                    Delete Expense
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          </VStack>
        </HStack>
      </Card.Body>

      {/* Edit Expense Dialog */}
      <Dialog.Root
        size={{ base: "lg", md: "md" }}
        placement="center"
        open={isEditOpen}
        onOpenChange={(e) => setIsEditOpen(e.open)}>
        <Portal>
          {/* Backdrop */}
          <Dialog.Backdrop
            zIndex={1400}
            backdropFilter="blur(6px)"
            bg="blackAlpha.600"
          />

          <Dialog.Positioner zIndex={1400}>
            <Dialog.Content
              p={{ base: 5, md: 7 }}
              bg="linear-gradient(180deg, #0f172a 0%, #111827 100%)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="xl"
              boxShadow="0 20px 60px rgba(0,0,0,0.65)">
              {/* HEADER */}
              <Dialog.Header mb={4}>
                <VStack
                  align="start"
                  gap={1}>
                  <Dialog.Title
                    fontSize="xl"
                    fontWeight="700"
                    color="white">
                    Edit Expense
                  </Dialog.Title>
                  <Text
                    fontSize="sm"
                    color="gray.400">
                    Update the expense amount
                  </Text>
                </VStack>
              </Dialog.Header>

              {/* BODY */}
              <Dialog.Body pb={6}>
                {/* Amount Card */}
                <Box
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  borderRadius="lg"
                  p={4}>
                  <Field.Root required>
                    <Field.Label
                      color="gray.300"
                      fontWeight="500"
                      mb={2}>
                      Expense Amount
                    </Field.Label>

                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      step="0.01"
                      min="0"
                      size="lg"
                      bg="whiteAlpha.50"
                      borderColor="whiteAlpha.300"
                      color="white"
                      _hover={{
                        borderColor: "whiteAlpha.400",
                      }}
                      _focus={{
                        borderColor: "green.400",
                        boxShadow: "0 0 0 2px rgba(34,197,94,0.4)",
                      }}
                      _placeholder={{ color: "gray.500" }}
                    />
                  </Field.Root>
                </Box>
              </Dialog.Body>

              {/* FOOTER */}
              <Dialog.Footer
                borderTop="1px solid"
                borderColor="whiteAlpha.200"
                pt={4}
                gap={3}>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditOpen(false)}
                  color="gray.300"
                  _hover={{
                    bg: "whiteAlpha.100",
                    color: "white",
                  }}>
                  Cancel
                </Button>

                <Button
                  bg="green.600"
                  _hover={{ bg: "green.500" }}
                  color="white"
                  fontWeight="600"
                  onClick={handleEditSubmit}
                  loading={isEditPending}
                  loadingText="Updating..."
                  px={{ mdDown: 2, md: 3 }}>
                  Update Expense
                </Button>
              </Dialog.Footer>

              {/* Close Button */}
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color="gray.400"
                  _hover={{ color: "white" }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Delete Confirmation Dialog */}
      <Dialog.Root
        size={{ base: "lg", md: "md" }}
        placement="center"
        open={isDeleteOpen}
        onOpenChange={(e) => setIsDeleteOpen(e.open)}>
        <Portal>
          {/* Backdrop */}
          <Dialog.Backdrop
            zIndex={1400}
            backdropFilter="blur(6px)"
            bg="blackAlpha.600"
          />

          <Dialog.Positioner zIndex={1400}>
            <Dialog.Content
              p={{ base: 5, md: 7 }}
              bg="linear-gradient(180deg, #0f172a 0%, #111827 100%)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="xl"
              boxShadow="0 20px 60px rgba(0,0,0,0.65)">
              {/* HEADER */}
              <Dialog.Header mb={4}>
                <Dialog.Title
                  fontSize="xl"
                  fontWeight="700"
                  color="red.400">
                  Delete Expense
                </Dialog.Title>
              </Dialog.Header>

              {/* BODY */}
              <Dialog.Body pb={6}>
                {/* Warning Card */}
                <Box
                  bg="red.900/25"
                  border="1px solid"
                  borderColor="red.500/40"
                  borderRadius="lg"
                  p={4}
                  mb={6}>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="red.300"
                    mb={1}>
                    This action cannot be undone
                  </Text>

                  <Text
                    fontSize="sm"
                    color="gray.300">
                    Are you sure you want to permanently delete this expense?
                  </Text>
                </Box>

                {/* Expense Info Card */}
                <Box
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  borderRadius="lg"
                  p={4}>
                  <VStack
                    align="start"
                    gap={3}>
                    <Box>
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="0.5px"
                        color="gray.500"
                        mb={1}>
                        Expense
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="white">
                        {expense.title}
                      </Text>
                    </Box>

                    <Box>
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="0.5px"
                        color="gray.500"
                        mb={1}>
                        Amount
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="700"
                        color="white">
                        ₹{expense.amount}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </Dialog.Body>

              {/* FOOTER */}
              <Dialog.Footer
                borderTop="1px solid"
                borderColor="whiteAlpha.200"
                pt={4}
                gap={3}>
                <Button
                  variant="ghost"
                  onClick={() => setIsDeleteOpen(false)}
                  color="gray.300"
                  _hover={{
                    bg: "whiteAlpha.100",
                    color: "white",
                  }}>
                  Cancel
                </Button>

                <Button
                  bg="red.600"
                  _hover={{ bg: "red.500" }}
                  color="white"
                  fontWeight="600"
                  onClick={handleDeleteConfirm}
                  loading={isDeletePending}
                  loadingText="Deleting..."
                  px={{ mdDown: 1, md: 3 }}>
                  Delete Expense
                </Button>
              </Dialog.Footer>

              {/* Close Icon */}
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color="gray.400"
                  _hover={{ color: "white" }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Card.Root>
  );
}

export default ExpenseCardComponent;
