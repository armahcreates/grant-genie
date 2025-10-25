"use client";

import { SignUp } from "@stackframe/stack";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function SignUpPage() {
  return (
    <TooltipProvider>
      <Box minH="100vh" bg="purple.50" display="flex" alignItems="center" py={12}>
        <Container maxW="md">
          <VStack gap={8} align="stretch">
            <VStack gap={2} textAlign="center">
              <Heading size="2xl" color="purple.900">
                Get Started
              </Heading>
              <Text color="purple.700" fontSize="lg">
                Create your HeadspaceGenie account
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
              <SignUp />
            </Box>
          </VStack>
        </Container>
      </Box>
    </TooltipProvider>
  );
}
