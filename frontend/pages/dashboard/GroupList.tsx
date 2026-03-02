import React from "react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { Text } from "@chakra-ui/react";
import { Avatar, Card, HStack, Stack, Strong } from "@chakra-ui/react";

function GroupList() {
  return (
    <div className="flex flex-col">
      <head className="flex flex-col">
        {/* text  */}
        <div>
          <Heading size="xl">Your Groups</Heading>
          <Text>Manage and track shared expenses</Text>
        </div>
        {/* button  */}
        <Button>
          <HiOutlinePlus /> Create Group
        </Button>
      </head>
      <body className="flex flex-col">
        {/* heading */}
        <Heading size={"lg"}>All groups</Heading>
        {/* main container  */}
        <div className="flex flex-col"></div>
      </body>
      <footer></footer>
    </div>
  );
}

export default GroupList;
