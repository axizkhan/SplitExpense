import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
  Textarea,
  Text,
  HStack,
  Box,
  Button,
  Icon,
} from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useCreateGroup } from "@/features/groups/hooks";
import { useToast } from "@/shared/toastService";
import { useResponsive } from "@/shared/hooks";
import { useState } from "react";

function CreateGroupDialog() {
  const { isSmallScreen } = useResponsive();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { mutate, isPending } = useCreateGroup();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    mutate(formData as any, {
      onSuccess: () => {
        toast.success(
          "Group Created",
          `${formData.name} group has been created`,
        );
        setFormData({ name: "", description: "" });
        setIsOpen(false);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to create group";
        toast.error("Error", errorMessage);
      },
    });
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
          bg="teal.500"
          _hover={{ bg: "teal.400" }}
          _active={{ bg: "teal.600" }}
          boxShadow="0 8px 20px rgba(20,184,166,0.3)"
          px={{ mdDown: 2, md: 3 }}
          size="sm">
          {isSmallScreen ? (
            "+"
          ) : (
            <HStack gap="2">
              <Icon
                as={HiOutlinePlus}
                boxSize="4"
              />
              <span>Create Group</span>
            </HStack>
          )}
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
            position="relative"
            p={{ base: 6, md: 8 }}
            bg="linear-gradient(135deg, #0f172a, #1e293b)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="0 20px 60px rgba(0,0,0,0.6)">
            {/* Top Accent Bar */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="3px"
              bg="teal.400"
              borderTopRadius="2xl"
            />

            {/* Header */}
            <Dialog.Header pb={4}>
              <VStack
                align="start"
                gap={2}>
                <Dialog.Title
                  fontSize="2xl"
                  fontWeight="bold"
                  letterSpacing="tight"
                  color="white">
                  Create New Group
                </Dialog.Title>
                <Text
                  fontSize="sm"
                  color="whiteAlpha.700">
                  Organise your shared expenses with friends and family
                </Text>
              </VStack>
            </Dialog.Header>

            {/* Body */}
            <Dialog.Body py={6}>
              <VStack
                gap={8}
                align="stretch">
                <Field.Root required>
                  <Field.Label
                    fontWeight="medium"
                    color="whiteAlpha.800">
                    Group Name <Field.RequiredIndicator />
                  </Field.Label>

                  <Input
                    placeholder="e.g., Apartment 4B, Trip 2024"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    bg="whiteAlpha.50"
                    border="1px solid"
                    px={2}
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: "whiteAlpha.300" }}
                    _focus={{
                      borderColor: "teal.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
                      bg: "whiteAlpha.100",
                    }}
                    transition="all 0.2s ease"
                  />

                  <Field.HelperText
                    fontSize="xs"
                    color="whiteAlpha.600">
                    Choose a name that describes your group.
                  </Field.HelperText>
                </Field.Root>

                <Field.Root>
                  <Field.Label
                    fontWeight="medium"
                    color="whiteAlpha.800">
                    Description
                  </Field.Label>

                  <Textarea
                    placeholder="Add a description (optional)"
                    name="description"
                    px={2}
                    py={1}
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    resize="none"
                    bg="whiteAlpha.50"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: "whiteAlpha.300" }}
                    _focus={{
                      borderColor: "teal.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
                      bg: "whiteAlpha.100",
                    }}
                    transition="all 0.2s ease"
                  />
                </Field.Root>
              </VStack>
            </Dialog.Body>

            {/* Footer */}
            <Dialog.Footer pt={6}>
              <HStack
                justify="flex-end"
                w="full"
                gap={4}>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="ghost"
                    color="whiteAlpha.700"
                    _hover={{ bg: "whiteAlpha.100" }}
                    onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>

                <Button
                  bg="teal.500"
                  _hover={{ bg: "teal.400" }}
                  _active={{ bg: "teal.600" }}
                  boxShadow="0 8px 20px rgba(20,184,166,0.3)"
                  onClick={handleSubmit}
                  loading={isPending}
                  px={{ mdDown: 2, md: 3 }}
                  loadingText="Creating...">
                  Create Group
                </Button>
              </HStack>
            </Dialog.Footer>

            {/* Close Button */}
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                color="whiteAlpha.700"
                _hover={{ bg: "whiteAlpha.200" }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default CreateGroupDialog;
