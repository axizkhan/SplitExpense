import {
  Box,
  Heading,
  Field,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { useLogin } from "../hooks";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useToast } from "@/shared/toastService";

function LoginPage() {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Login Successful", "Welcome back!");
          navigate("/dashboard");
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Login failed. Please try again.";
          toast.error("Login Failed", errorMessage);
        },
      },
    );
  };

  return (
    <Box
      minH="100vh"
      bg="bg.primary"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={8}
      px={4}>
      {/* Main Container */}
      <VStack
        width="100%"
        maxW="420px"
        gap={8}>
        {/* Header Section */}
        <VStack
          gap={6}
          width="100%">
          {/* Logo and App Name */}
          <VStack gap={3}>
            <Box
              bg="linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
              p={4}
              borderRadius="2xl"
              border="1px solid"
              borderColor="slate.700">
              <Image
                src="/image.png"
                alt="Splitly Logo"
                height="64px"
                width="64px"
                objectFit="contain"
              />
            </Box>
            <VStack gap={1}>
              <Heading
                size="2xl"
                color="text.primary"
                fontWeight="800"
                textAlign="center">
                Splitly
              </Heading>
              <Text
                color="text.secondary"
                fontSize="sm"
                textAlign="center">
                Track shared expenses with ease
              </Text>
            </VStack>
          </VStack>

          {/* Login Heading */}
          <VStack
            gap={2}
            width="100%">
            <Heading
              size="lg"
              color="text.primary"
              textAlign="center">
              Welcome Back
            </Heading>
            <Text
              color="text.muted"
              fontSize="sm"
              textAlign="center">
              Login to continue managing your groups
            </Text>
          </VStack>
        </VStack>

        {/* Form Section */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={5}>
          {/* Email Field */}
          <Field.Root required>
            <Field.Label
              color="text.primary"
              fontSize="sm"
              fontWeight="600"
              mb={2}>
              Email Address
            </Field.Label>
            <Input
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="bg.secondary"
              borderColor="slate.700"
              color="text.primary"
              _placeholder={{ color: "text.muted" }}
              px={2}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)",
              }}
              _hover={{
                borderColor: "slate.600",
              }}
              height="44px"
              fontSize="sm"
            />
            <Field.HelperText
              color="text.muted"
              fontSize="xs"
              mt={1}>
              We'll never share your email.
            </Field.HelperText>
          </Field.Root>

          {/* Password Field */}
          <Field.Root required>
            <Field.Label
              color="text.primary"
              fontSize="sm"
              fontWeight="600"
              mb={2}>
              Password
            </Field.Label>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="bg.secondary"
              borderColor="slate.700"
              px={2}
              color="text.primary"
              _placeholder={{ color: "text.muted" }}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)",
              }}
              _hover={{
                borderColor: "slate.600",
              }}
              height="44px"
              fontSize="sm"
            />
          </Field.Root>

          {/* Login Button */}
          <Button
            type="submit"
            width="100%"
            bg="teal.500"
            color="white"
            height="44px"
            fontSize="sm"
            fontWeight="600"
            disabled={isPending}
            _hover={{
              bg: "teal.600",
            }}
            _active={{
              bg: "teal.700",
            }}
            transition="all 0.2s"
            gap={2}>
            {isPending ? "Logging in..." : "Log In"}
            <RiArrowRightLine />
          </Button>
        </Box>

        {/* Footer Section */}
        <VStack
          gap={4}
          width="100%">
          <Box
            width="100%"
            height="1px"
            bg="linear-gradient(90deg, transparent, slate.700, transparent)"
          />
          <HStack
            gap={1}
            justify="center"
            flexWrap="wrap"
            width="100%">
            <Text
              color="text.muted"
              fontSize="sm">
              Don't have an account?
            </Text>
            <RouterLink to="/signup">
              <Text
                as="span"
                color="teal.400"
                fontWeight="600"
                cursor="pointer"
                _hover={{ color: "teal.300", textDecoration: "underline" }}>
                Sign up
              </Text>
            </RouterLink>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

export default LoginPage;
