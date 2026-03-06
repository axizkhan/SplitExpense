import { HStack, Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AppBranding() {
  const navigate = useNavigate();
  return (
    <HStack
      justify="flex-start"
      align="center"
      gap={2}
      mb={8}
      cursor="pointer"
      onClick={() => navigate("/dashboard")}
      transition="all 0.2s"
      _hover={{ opacity: 0.8 }}>
      <Box
        bg="linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
        p={1.5}
        borderRadius="md"
        border="1px solid"
        borderColor="slate.700">
        <Image
          src="/image.png"
          alt="Splitly Logo"
          height="24px"
          width="24px"
          objectFit="contain"
        />
      </Box>
      <Text
        color="text.primary"
        fontSize="sm"
        fontWeight="600">
        Splitly
      </Text>
    </HStack>
  );
}
