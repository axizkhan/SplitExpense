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
import { useState } from "react";
import { useSignup } from "@/features/auth/hooks";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useToast } from "@/shared/toastService";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    upiId: "",
  });

  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData as any, {
      onSuccess: () => {
        toast.success("Signup Successful", "Account created successfully!");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "Signup failed. Please try again.";
        toast.error("Signup Failed", errorMessage);
      },
    });
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
        maxW="480px"
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
                Manage shared expenses effortlessly
              </Text>
            </VStack>
          </VStack>

          {/* Signup Heading */}
          <VStack
            gap={2}
            width="100%">
            <Heading
              size="lg"
              color="text.primary"
              textAlign="center">
              Create Account
            </Heading>
            <Text
              color="text.muted"
              fontSize="sm"
              textAlign="center">
              Join thousands splitting expenses smartly
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
          gap={4}>
          {/* Name Fields Row */}
          <HStack
            gap={4}
            width="100%">
            {/* First Name */}
            <Field.Root
              required
              width="100%">
              <Field.Label
                color="text.primary"
                fontSize="sm"
                fontWeight="600"
                mb={2}>
                First Name
              </Field.Label>
              <Input
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
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

            {/* Last Name */}
            <Field.Root
              required
              width="100%">
              <Field.Label
                color="text.primary"
                fontSize="sm"
                fontWeight="600"
                mb={2}>
                Last Name
              </Field.Label>
              <Input
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                bg="bg.secondary"
                px={2}
                borderColor="slate.700"
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
          </HStack>

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
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              bg="bg.secondary"
              px={2}
              borderColor="slate.700"
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
              name="password"
              type="password"
              px={2}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              bg="bg.secondary"
              borderColor="slate.700"
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

          {/* Optional Fields */}
          <HStack
            gap={4}
            width="100%">
            {/* Mobile Number */}
            <Field.Root width="100%">
              <Field.Label
                color="text.primary"
                fontSize="sm"
                fontWeight="600"
                mb={2}>
                Mobile Number
              </Field.Label>
              <Input
                name="mobileNumber"
                placeholder="9999999999"
                value={formData.mobileNumber}
                px={2}
                onChange={handleChange}
                bg="bg.secondary"
                borderColor="slate.700"
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

            {/* UPI ID */}
            <Field.Root width="100%">
              <Field.Label
                color="text.primary"
                fontSize="sm"
                fontWeight="600"
                mb={2}>
                UPI ID
              </Field.Label>
              <Input
                name="upiId"
                placeholder="user@upi"
                value={formData.upiId}
                onChange={handleChange}
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
          </HStack>

          {/* Sign Up Button */}
          <Button
            type="submit"
            width="100%"
            bg="teal.500"
            color="white"
            height="44px"
            fontSize="sm"
            fontWeight="600"
            disabled={isPending}
            mt={2}
            _hover={{
              bg: "teal.600",
            }}
            _active={{
              bg: "teal.700",
            }}
            transition="all 0.2s"
            gap={2}>
            {isPending ? "Creating Account..." : "Sign Up"}
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
              Already have an account?
            </Text>
            <RouterLink to="/login">
              <Text
                as="span"
                color="teal.400"
                fontWeight="600"
                cursor="pointer"
                _hover={{ color: "teal.300", textDecoration: "underline" }}>
                Log in
              </Text>
            </RouterLink>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

export default Signup;
