"use client";

import { SignUp } from "@stackframe/stack";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function SignUpPage() {
  return (
    <TooltipProvider>
      <Box
        minH="100vh"
        bg="purple.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        <Box maxW="400px" w="full">
          <VStack gap={6} align="stretch">
            <VStack gap={1} textAlign="center">
              <Heading size="xl" color="purple.900">
                Get Started
              </Heading>
              <Text color="purple.700" fontSize="sm">
                Create your Headspace Genie account
              </Text>
            </VStack>

            <SignUp />
          </VStack>
        </Box>
      </Box>
    </TooltipProvider>
  );
}
