import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import OtpInput from "react-otp-input";

interface OtpVerificationDialogProps {
  email: string;
  onVerified: (accessToken: string) => void;
  onClose: () => void;
}

export function OtpVerificationDialog({
  email,
  onVerified,
  onClose,
}: OtpVerificationDialogProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Email verified!", status: "success" });
        onVerified(data.data.accessToken);
      } else {
        toast({
          title: "Invalid OTP",
          description: data.message,
          status: "error",
        });
      }
    } catch (err) {
      toast({ title: "Error verifying OTP", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={6}
      bg="white"
      borderRadius="xl"
      boxShadow="lg"
      minW="340px">
      <VStack gap={4}>
        <Heading size="md">Verify your Email</Heading>
        <Text
          fontSize="sm"
          color="gray.600">
          Enter the 6-digit OTP sent to <b>{email}</b>
        </Text>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          isInputNum
          shouldAutoFocus
          inputStyle={{
            width: "2.5rem",
            height: "2.5rem",
            margin: "0 0.5rem",
            fontSize: "1.5rem",
            borderRadius: 8,
            border: "1px solid #CBD5E0",
            background: "#F7FAFC",
          }}
          containerStyle={{ justifyContent: "center" }}
        />
        <HStack gap={2}>
          <Button
            onClick={onClose}
            variant="ghost">
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleVerify}
            isLoading={loading}
            isDisabled={otp.length !== 6}>
            Verify
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
