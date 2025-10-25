"use client";

import { SignIn } from "@stackframe/stack";
import { Box, Container, Heading, Text, VStack, Portal } from "@chakra-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function SignInPage() {
  return (
    <TooltipProvider>
      <Box minH="100vh" bg="purple.50" display="flex" alignItems="center" py={12}>
        <Container maxW="md">
          <VStack gap={8} align="stretch">
            <VStack gap={2} textAlign="center">
              <Heading size="2xl" color="purple.900">
                Welcome Back
              </Heading>
              <Text color="purple.700" fontSize="lg">
                Sign in to continue to HeadspaceGenie
              </Text>
            </VStack>

            <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="xl"
              border="1px solid"
              borderColor="purple.100"
            >
              <SignIn />
            </Box>
          </VStack>
        </Container>
      </Box>
    </TooltipProvider>
  );
}
