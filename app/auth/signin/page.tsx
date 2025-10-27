"use client";

import { SignIn } from "@stackframe/stack";
import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { FiAlertCircle, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import NextLink from "next/link";
import { colors } from "@/theme/tokens";

function SignInContent() {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { deepIndigo, softTeal } = colors.brand;

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
        background={`linear-gradient(135deg, ${deepIndigo} 0%, #2D2C5A 50%, #1a1a3e 100%)`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
        position="relative"
        overflow="hidden"
      >
        {/* Background blur effects */}
        <Box
          position="absolute"
          top="-50%"
          right="-10%"
          width="600px"
          height="600px"
          background={softTeal}
          borderRadius="50%"
          filter="blur(120px)"
          opacity={0.15}
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="-30%"
          left="-5%"
          width="400px"
          height="400px"
          background={deepIndigo}
          borderRadius="50%"
          filter="blur(100px)"
          opacity={0.2}
          pointerEvents="none"
        />

        {/* Back to Home Link */}
        <NextLink href="/" style={{ position: 'absolute', top: '32px', left: '32px', zIndex: 2 }}>
          <Box
            color="rgba(255, 255, 255, 0.9)"
            fontSize="14px"
            fontWeight="500"
            cursor="pointer"
            transition="color 0.2s"
            display="flex"
            alignItems="center"
            gap="8px"
            _hover={{ color: softTeal }}
          >
            <FiArrowLeft />
            <Text as="span" display={{ base: "none", sm: "inline" }}>
              Back to Home
            </Text>
          </Box>
        </NextLink>

        {/* Main Auth Card */}
        <Box
          maxW="500px"
          w="full"
          background="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(20px)"
          borderRadius="24px"
          border="1px solid rgba(255, 255, 255, 0.3)"
          boxShadow="0 20px 40px rgba(0, 0, 0, 0.2)"
          position="relative"
          zIndex={1}
          p={{ base: "24px", md: "32px" }}
        >
          <VStack gap="24px" alignItems="stretch">
            {/* Logo */}
            <Text
              fontSize={{ base: "24px", md: "30px" }}
              fontWeight="bold"
              background={`linear-gradient(to right, ${deepIndigo}, ${softTeal})`}
              backgroundClip="text"
              color="transparent"
              textAlign="center"
              mb="8px"
            >
              Headspace Genie
            </Text>

            {/* Heading */}
            <VStack gap="8px" textAlign="center">
              <Heading
                fontSize={{ base: "28px", md: "36px", lg: "42px" }}
                color="white"
                letterSpacing={{ base: "normal", md: "-0.01em", lg: "-0.02em" }}
                lineHeight="1.2"
              >
                Welcome Back
              </Heading>
              <Text color="rgba(255, 255, 255, 0.9)" fontSize={{ base: "14px", md: "16px" }}>
                Access your AI-powered grant writing workspace
              </Text>
            </VStack>

            {/* Loading state */}
            {isLoading && (
              <Box
                p="16px"
                background="rgba(255, 255, 255, 0.2)"
                backdropFilter="blur(10px)"
                borderRadius="24px"
                border="1px solid rgba(255, 255, 255, 0.3)"
              >
                <Box display="flex" gap="12px" justifyContent="center" alignItems="center">
                  <Spinner size="sm" color={softTeal} />
                  <Text color="white" fontSize="14px" fontWeight="500">
                    Signing you in...
                  </Text>
                </Box>
              </Box>
            )}

            {/* Success message */}
            {success && (
              <Box
                p="16px"
                background="linear-gradient(135deg, #10B981 0%, #059669 100%)"
                borderRadius="24px"
                border="1px solid #34D399"
                boxShadow="0 4px 15px rgba(34, 197, 94, 0.3)"
              >
                <Box display="flex" gap="8px" alignItems="center">
                  <FiCheckCircle color="white" size={20} />
                  <Text color="white" fontSize="14px" fontWeight="600">
                    Successfully signed in! Redirecting to dashboard...
                  </Text>
                </Box>
              </Box>
            )}

            {/* Error message */}
            {error && (
              <Box
                p="16px"
                background="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                borderRadius="24px"
                border="1px solid #F87171"
                boxShadow="0 4px 15px rgba(239, 68, 68, 0.3)"
              >
                <Box display="flex" gap="8px" alignItems="center">
                  <FiAlertCircle color="white" size={20} />
                  <Text color="white" fontSize="14px" fontWeight="600">
                    {error}
                  </Text>
                </Box>
              </Box>
            )}

            <SignIn />
          </VStack>
        </Box>
      </Box>
    </TooltipProvider>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <Box
        minH="100vh"
        bg="purple.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="purple.600" />
      </Box>
    }>
      <SignInContent />
    </Suspense>
  );
}
