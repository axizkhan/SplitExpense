import React from "react";
import { Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Field, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { withMask } from "use-mask-input";
import WalletLogo from "../../logo/WalletLogo";

function Signup() {
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
              Create Account
            </Heading>
            <Text>Start managing shared expenses easily</Text>
          </div>
        </div>
        {/* body  */}
        <div className="flex flex-col gap-2">
          <Field.Root required>
            <Field.Label>
              First Name <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter your email" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Last Name <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter your email" />
          </Field.Root>
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
          <Field.Root>
            <Field.Label>
              Mobile Number <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder=" 999999999"
              ref={withMask(" 9999999999")}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              UPI ID <Field.RequiredIndicator />
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
            Sign Up <RiArrowRightLine />{" "}
          </Button>
          {/* login page link */}
          <Text className="">
            Already have an accounts?{" "}
            <Link
              variant="underline"
              href="https://chakra-ui.com"
              colorPalette="teal">
              Login
            </Link>{" "}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Signup;
