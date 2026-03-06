import {
  Button,
  Dialog,
  HStack,
  Text,
  VStack,
  Icon,
  Box,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteGroup } from "@/features/groups/hooks";
import { useAuthStore } from "@/core/state/auth.store";

export default function DeleteGroupDialog({
  groupId,
  groupName,
  createdBy,
}: {
  groupId: string;
  groupName: string;
  createdBy: string;
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { mutate: deleteGroup, isPending } = useDeleteGroup();

  // Wait for user to load from auth store
  if (!user) return null;

  const isCreator = user.id === createdBy;

  if (!isCreator) return null;

  const handleDelete = () => {
    deleteGroup(groupId, {
      onSuccess: () => {
        setIsOpen(false);
        navigate("/dashboard");
      },
    });
  };

  return (
    <Dialog.Root
      placement="center"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}>
      {/* Trigger */}
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          colorPalette="red"
          variant="solid"
          gap={2}
          mb={4}
          px={{ mdDown: 2, md: 3 }}>
          <MdOutlineDeleteForever />
          Delete Group
        </Button>
      </Dialog.Trigger>

      <Portal>
        {/* Backdrop */}
        <Dialog.Backdrop
          bg="blackAlpha.700"
          backdropFilter="blur(8px)"
        />

        <Dialog.Positioner>
          <Dialog.Content
            p={{ base: 5, md: 6 }}
            borderRadius="xl"
            bg="linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="0 25px 50px rgba(0,0,0,0.6)"
            maxW="420px">
            {/* Header */}
            <Dialog.Header pb={3}>
              <VStack
                align="start"
                gap="1">
                <Dialog.Title
                  fontSize="lg"
                  fontWeight="semibold"
                  color="white">
                  Delete Group
                </Dialog.Title>

                <Text
                  fontSize="sm"
                  color="gray.400">
                  Permanently remove this group
                </Text>
              </VStack>
            </Dialog.Header>

            {/* Body */}
            <Dialog.Body py={6}>
              <VStack
                gap={5}
                align="center"
                textAlign="center">
                {/* Icon */}
                <Box
                  bg="red.900"
                  p={3}
                  borderRadius="full">
                  <Icon
                    as={MdOutlineDeleteForever}
                    boxSize={7}
                    color="red.400"
                  />
                </Box>

                {/* Message */}
                <Text
                  fontSize="sm"
                  color="gray.300">
                  Are you sure you want to delete{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                    color="white">
                    {groupName}
                  </Text>
                  ?
                </Text>

                {/* Warning */}
                <Text
                  fontSize="sm"
                  color="red.400">
                  This action cannot be undone. All expenses and payment records
                  in this group will be permanently deleted.
                </Text>
              </VStack>
            </Dialog.Body>

            {/* Footer */}
            <Dialog.Footer pt={4}>
              <HStack
                justify="flex-end"
                w="full"
                gap="3">
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="ghost"
                    color="gray.300"
                    _hover={{ bg: "whiteAlpha.100" }}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>

                <Button
                  colorPalette="red"
                  variant="solid"
                  onClick={handleDelete}
                  loading={isPending}
                  loadingText="Deleting..."
                  px={{ mdDown: 2, md: 3 }}>
                  Delete Group
                </Button>
              </HStack>
            </Dialog.Footer>

            {/* Close */}
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
  );
}
