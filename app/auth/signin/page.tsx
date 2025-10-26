"use client";

import { SignIn } from "@stackframe/stack";
import { Box, Heading, Text, VStack, Spinner, Icon, HStack } from "@chakra-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function SignInPage() {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle successful authentication
  useEffect(() => {
    if (user) {
      setSuccess(true);
      setError(null);
      // Small delay to show success message
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  }, [user, router]);

  // Handle authentication errors
  useEffect(() => {
    const handleError = () => {
      setError("Failed to sign in. Please check your credentials and try again.");
      setIsLoading(false);
    };

    // Listen for authentication errors
    window.addEventListener("stack-auth-error", handleError);

    return () => {
      window.removeEventListener("stack-auth-error", handleError);
    };
  }, []);

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

            {/* Loading state */}
            {isLoading && (
              <Box
                p={4}
                bg="purple.100"
                borderRadius="md"
                border="1px solid"
                borderColor="purple.300"
              >
                <HStack gap={3} justify="center">
                  <Spinner size="sm" color="purple.600" />
                  <Text color="purple.900" fontSize="sm">
                    Signing you in...
                  </Text>
                </HStack>
              </Box>
            )}

            {/* Success message */}
            {success && (
              <Box
                p={4}
                bg="green.50"
                borderRadius="md"
                border="1px solid"
                borderColor="green.300"
              >
                <HStack gap={2}>
                  <Icon as={FiCheckCircle} color="green.600" />
                  <Text color="green.700" fontSize="sm" fontWeight="medium">
                    Successfully signed in! Redirecting to dashboard...
                  </Text>
                </HStack>
              </Box>
            )}

            {/* Error message */}
            {error && (
              <Box
                p={4}
                bg="red.50"
                borderRadius="md"
                border="1px solid"
                borderColor="red.300"
              >
                <HStack gap={2}>
                  <Icon as={FiAlertCircle} color="red.600" />
                  <Text color="red.700" fontSize="sm" fontWeight="medium">
                    {error}
                  </Text>
                </HStack>
              </Box>
            )}

            <SignIn />
          </VStack>
        </Box>
      </Box>
    </TooltipProvider>
  );
}
