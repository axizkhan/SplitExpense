import React from "react";
import { Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Field, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { withMask } from "use-mask-input";
import WalletLogo from "../../logo/WalletLogo";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen   ">
      {/* main container */}
      <div className="flex flex-col gap-5">
        {/* header */}
        <div className="flex flex-col w-full items-center">
          {/* logo */}
          <div>
            <WalletLogo size={80} />
          </div>
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
            <Input placeholder="Enter your email" />
            <Field.HelperText>We'll never share your email.</Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter your email" />
          </Field.Root>
        </div>
        {/* bottom  */}
        <div className="flex flex-col gap-3 w-full items-center">
          {/* signup button */}
          <Button
            variant="solid"
            className="w-full">
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

export default Login;
