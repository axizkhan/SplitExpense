import { Heading } from "@chakra-ui/react";
import { Field, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { useLogin } from "../hooks";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function LoginPage() {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* main container */}
      <div className="flex flex-col gap-5 w-full max-w-md px-4">
        {/* header */}
        <div className="flex flex-col w-full items-center">
          {/* logo */}
          <div>{/* <WalletLogo size={80} /> */}</div>
          {/* header text  */}
          <div className="flex flex-col w-full items-center">
            <Heading
              as="h1"
              size="xl">
              Welcome Back
            </Heading>
            <Text>Login to track your shared expenses</Text>
          </div>
        </div>
        {/* body  */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2">
          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Field.HelperText>We'll never share your email.</Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field.Root>

          {/* bottom  */}
          <div className="flex flex-col gap-3 w-full items-center mt-4">
            {/* login button */}
            <Button
              type="submit"
              variant="solid"
              className="w-full"
              disabled={isPending}
              colorScheme="teal">
              Log In <RiArrowRightLine />
            </Button>
            {/* signup page link */}
            <Text className="">
              Don't have an account?{" "}
              <RouterLink to="/signup">
                <span className="text-teal-600 hover:underline">Sign up</span>
              </RouterLink>
            </Text>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
