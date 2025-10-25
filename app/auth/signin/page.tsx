"use client";

import { SignIn } from "@stackframe/stack";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function SignInPage() {
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
                Welcome Back
              </Heading>
              <Text color="purple.700" fontSize="sm">
                Sign in to continue to Headspace Genie
              </Text>
            </VStack>

            <SignIn />
          </VStack>
        </Box>
      </Box>
    </TooltipProvider>
  );
}
