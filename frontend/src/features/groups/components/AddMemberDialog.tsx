import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { IoPersonAdd } from "react-icons/io5";
import { useAddMember } from "@/features/groups/hooks";
import { useToast } from "@/shared/toastService";
import { useResponsive } from "@/shared/hooks";
import { useState } from "react";

interface AddMemberDialogProps {
  groupId: string;
}

function AddMemberDialog({ groupId }: AddMemberDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast();
  const { isSmallScreen } = useResponsive();
  const { mutate, isPending } = useAddMember();

  const handleSubmit = () => {
    if (!email.trim()) return;

    mutate(
      {
        groupId,
        payload: { newMemberEmail: email },
      },
      {
        onSuccess: () => {
          toast.success("Member Added", `${email} has been added to the group`);
          setEmail("");
          setIsOpen(false);
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to add member";
          toast.error("Error", errorMessage);
        },
      },
    );
  };

  return (
    <Dialog.Root
      size={{ base: "lg", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}>
      {/* Trigger Button */}
      <Dialog.Trigger asChild>
        <Button
          colorPalette="teal"
          size={isSmallScreen ? "sm" : "md"}
          display="flex"
          alignItems="center"
          gap="2"
          px={{ mdDown: 2, md: 3 }}
          alignSelf={{ base: "stretch", md: "auto" }}>
          {!isSmallScreen && <IoPersonAdd />}
          {isSmallScreen ? "+" : "Add Member"}
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
            boxShadow="0 20px 40px rgba(0,0,0,0.6)">
            {/* Header */}
            <Dialog.Header pb={3}>
              <VStack
                align="start"
                gap="1">
                <Dialog.Title
                  fontSize="lg"
                  fontWeight="semibold"
                  color="white">
                  Add Group Member
                </Dialog.Title>
                <Text
                  fontSize="sm"
                  color="gray.400">
                  Invite someone to join this group
                </Text>
              </VStack>
            </Dialog.Header>

            {/* Body */}
            <Dialog.Body py={6}>
              <VStack
                align="stretch"
                gap={5}>
                <Field.Root required>
                  <Field.Label
                    color="gray.200"
                    fontWeight="medium">
                    Email <Field.RequiredIndicator />
                  </Field.Label>

                  <Input
                    type="email"
                    placeholder="Enter member's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="whiteAlpha.100"
                    px={2}
                    borderColor="whiteAlpha.300"
                    color="white"
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                      borderColor: "teal.400",
                      boxShadow: "0 0 0 2px rgba(20, 184, 166, 0.25)",
                    }}
                  />

                  <Field.HelperText color="gray.500">
                    They will receive an invitation to join.
                  </Field.HelperText>
                </Field.Root>
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
                  colorPalette="teal"
                  onClick={handleSubmit}
                  loading={isPending}
                  loadingText="Adding..."
                  px={{ mdDown: 2, md: 3 }}>
                  Add Member
                </Button>
              </HStack>
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
  );
}

export default AddMemberDialog;
