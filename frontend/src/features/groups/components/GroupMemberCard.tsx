import {
  Badge,
  Box,
  Heading,
  HStack,
  IconButton,
  Menu,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PaymentDialog } from "@/features/payments/components";

interface GroupMemberCardProps {
  i: number;
  member: { name: string; amount: string; color: string; status: string };
  memberId?: string;
  memberName?: string;
  groupId?: string;
  balance?: number;
  onPaymentClick?: (
    memberId: string,
    memberName: string,
    balance: number,
  ) => void;
}

function GroupMemberCard({
  i,
  member,
  memberId,
  memberName,
  groupId,
  balance,
}: GroupMemberCardProps) {
  const navigate = useNavigate();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleMenuSelect = (value: string) => {
    if (value === "journal" && groupId && memberId) {
      navigate(`/group/${groupId}/journal/${memberId}`);
    } else if (value === "payment") {
      setIsPaymentOpen(true);
    }
  };

  return (
    <Box
      key={i}
      p={{ base: 5, md: 6 }}
      bg="linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)"
      borderRadius="2xl"
      border="1px solid"
      borderColor="slate.700"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-6px)",
        bg: "linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 1) 100%)",
        borderColor: "slate.600",
        boxShadow: "0 8px 20px rgba(34, 197, 94, 0.2)",
      }}>
      <HStack
        justify="space-between"
        align="start">
        <VStack
          align="start"
          gap={2}>
          <Heading
            size="sm"
            color="slate.100"
            fontWeight="700">
            {member.name}
          </Heading>
          <Badge
            colorPalette={member.color}
            // @ts-ignore
            fontSize="xs"
            fontWeight="600"
            px={{ mdDown: 1, md: 2 }}>
            {member.status}
          </Badge>
        </VStack>

        {/* Menu with Journal and Payment options */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              size="sm"
              variant="ghost"
              color="slate.300"
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
              minW="190px"
              p="6px"
              bg="rgba(26, 35, 50, 0.96)"
              backdropFilter="blur(14px)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="lg"
              boxShadow="0 12px 32px rgba(0,0,0,0.45)"
              zIndex={1000}>
              {/* JOURNAL */}
              <Menu.Item
                value="journal"
                borderRadius="md"
                px="3"
                py="2"
                fontSize="sm"
                fontWeight="500"
                color="slate.200"
                transition="all 0.15s ease"
                _hover={{
                  bg: "whiteAlpha.100",
                  color: "white",
                }}
                _active={{
                  bg: "whiteAlpha.200",
                }}
                onClick={() => handleMenuSelect("journal")}>
                <HStack gap="2">
                  <Text>Journal</Text>
                </HStack>
              </Menu.Item>

              {/* PAYMENT (Primary Action) */}
              <Menu.Item
                value="payment"
                mt="4px"
                borderRadius="md"
                px="3"
                py="2"
                fontSize="sm"
                fontWeight="600"
                color="green.300"
                transition="all 0.15s ease"
                _hover={{
                  bg: "rgba(34,197,94,0.15)",
                  color: "green.200",
                }}
                _active={{
                  bg: "rgba(34,197,94,0.25)",
                }}
                onClick={() => handleMenuSelect("payment")}>
                <HStack gap="2">
                  <Text>Payment</Text>
                </HStack>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </HStack>

      <Text
        mt={5}
        fontSize="2xl"
        fontWeight="800"
        bg="linear-gradient(135deg, #22c55e 0%, #10b981 100%)"
        bgClip="text"
        color="transparent">
        {member.amount}
      </Text>

      {/* Payment Dialog - Rendered outside menu */}
      {memberId && memberName !== undefined && balance !== undefined && (
        <PaymentDialog
          memberId={memberId}
          memberName={memberName}
          groupId={groupId || ""}
          balance={balance}
          isOpen={isPaymentOpen}
          onOpenChange={setIsPaymentOpen}
        />
      )}
    </Box>
  );
}

export default GroupMemberCard;
