import { Heading } from "@chakra-ui/react";
import { Field, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { useState } from "react";
import { useSignup } from "../../src/features/auth/hooks";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useToast } from "../../src/shared/toastService";
import WalletLogo from "../../logo/WalletLogo";

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
    <div className="flex items-center justify-center min-h-screen">
      {/* main container */}
      <div className="flex flex-col gap-5 w-full max-w-md px-4">
        {/* header */}
        <div className="flex flex-col w-full items-center">
          {/* logo */}
          <div>
            <WalletLogo size={80} />
          </div>
          {/* header text  */}
          <div className="flex flex-col w-full items-center">
            <Heading
              as="h1"
              size="xl">
              Create Account
            </Heading>
            <Text>Start managing shared expenses easily</Text>
          </div>
        </div>
        {/* body  */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2">
          <Field.Root required>
            <Field.Label>
              First Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Last Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <Field.HelperText>We'll never share your email.</Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Mobile Number</Field.Label>
            <Input
              name="mobileNumber"
              placeholder="9999999999"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>UPI ID</Field.Label>
            <Input
              name="upiId"
              placeholder="user@upi"
              value={formData.upiId}
              onChange={handleChange}
            />
          </Field.Root>

          {/* bottom  */}
          <div className="flex flex-col gap-3 w-full items-center mt-4">
            {/* signup button */}
            <Button
              type="submit"
              variant="solid"
              className="w-full"
              disabled={isPending}
              colorScheme="teal">
              Sign Up <RiArrowRightLine />
            </Button>
            {/* login page link */}
            <Text className="">
              Already have an account?{" "}
              <RouterLink to="/login">
                <span className="text-teal-600 hover:underline">Login</span>
              </RouterLink>
            </Text>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
