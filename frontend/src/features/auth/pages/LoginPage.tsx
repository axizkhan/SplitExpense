import React from "react";
import { Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Field, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { withMask } from "use-mask-input";
import { useLogin } from "../hooks";
import { useState } from "react";
// import WalletLogo from "../../logo/WalletLogo";

function LoginPage() {
  const { mutate, error, isPending } = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    mutate({ email, password });
  };
  return (
    <div className="flex items-center justify-center h-screen   ">
      {/* main container */}
      <div className="flex flex-col gap-5">
        {/* header */}
        <div className="flex flex-col w-full items-center">
          {/* logo */}
          <div>{/* <WalletLogo size={80} /> */}</div>
          {/* header text  */}
          <div className="flex flex-col w-full items-center ">
            <Heading
              as="h1"
              size="xl">
              Welcome Back
            </Heading>
            <Text>Login to track your shared expenses</Text>
          </div>
        </div>
        {/* body  */}
        <div className="flex flex-col gap-2">
          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Enter your email"
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
              placeholder="Enter your email"
              value={password}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>
        </div>
        {/* bottom  */}
        <div className="flex flex-col gap-3 w-full items-center">
          {/* signup button */}
          <Button
            variant="solid"
            className="w-full"
            disabled={isPending}>
            Log In <RiArrowRightLine />{" "}
          </Button>
          {/* login page link */}
          <Text className="">
            Dont have an account?{" "}
            <Link
              variant="underline"
              href="https://chakra-ui.com"
              colorPalette="teal">
              Sign up
            </Link>{" "}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
