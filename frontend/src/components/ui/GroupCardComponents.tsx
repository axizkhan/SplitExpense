import React from "react";

import {
  Avatar,
  Button,
  Card,
  HStack,
  Stack,
  Strong,
  Text,
} from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";

function GroupCardComponents() {
  return (
    <Card.Root width="320px">
      <Card.Body>
        <HStack
          mb="6"
          gap="3">
          <div>
            <GrGroup />
          </div>

          <Text
            color="fg.muted"
            textStyle="sm">
            Apartment 4B
          </Text>
        </HStack>
        <Card.Description>
          Shared living expenses, rent, utilities, and groucery runs for the
          flat
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Stack gap="0">
          <Text
            color="fg.muted"
            textStyle="sm">
            Member: 5
          </Text>
          <Text
            color="fg.muted"
            textStyle="sm">
            created: june 2024
          </Text>
        </Stack>
        <Button
          variant="subtle"
          colorPalette="blue"
          flex="1">
          <LuCheck />
          Open Group
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default GroupCardComponents;
