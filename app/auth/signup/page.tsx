"use client";

import { SignUp } from "@stackframe/stack";
import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { FiAlertCircle, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import NextLink from "next/link";
import { colors } from "@/theme/tokens";

function SignUpContent() {
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
        router.push("/onboarding");
      }, 1000);
    }
  }, [user, router]);

  // Handle authentication errors
  useEffect(() => {
    const handleError = () => {
      setError("Failed to create account. Please try again or use a different email.");
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
            color="whiteAlpha.900"
            fontSize="sm"
            fontWeight="semibold"
            cursor="pointer"
            transition="all 0.2s"
            display="flex"
            alignItems="center"
            gap={2}
            bg="whiteAlpha.200"
            backdropFilter="blur(10px)"
            px={4}
            py={2}
            borderRadius="full"
            border="1px solid"
            borderColor="whiteAlpha.300"
            _hover={{
              color: softTeal,
              bg: "whiteAlpha.300",
              borderColor: softTeal,
              transform: "translateY(-2px)"
            }}
          >
            <FiArrowLeft />
            <Text as="span" display={{ base: "none", sm: "inline" }}>
              Back to Home
            </Text>
          </Box>
        </NextLink>

        {/* Main Auth Card */}
        <Box
          maxW="540px"
          w="full"
          bg="white"
          borderRadius="3xl"
          border="2px solid"
          borderColor="whiteAlpha.400"
          boxShadow="0 30px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          position="relative"
          zIndex={1}
          p={{ base: 8, md: 10 }}
          _before={{
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '3xl',
            padding: '2px',
            background: `linear-gradient(135deg, ${softTeal}, ${deepIndigo})`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: 0.3,
          }}
        >
          <VStack gap={8} alignItems="stretch">
            {/* Logo */}
            <VStack gap={3}>
              <Box
                w={16}
                h={16}
                bgGradient={`linear(135deg, ${deepIndigo}, ${softTeal})`}
                borderRadius="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow={`0 8px 20px ${softTeal}40`}
                position="relative"
                _before={{
                  content: '""',
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '2xl',
                  padding: '2px',
                  background: `linear-gradient(135deg, ${softTeal}, ${deepIndigo})`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0.5,
                }}
              >
                <Text fontSize="3xl" fontWeight="bold" color="white">
                  H
                </Text>
              </Box>
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                bgGradient={`linear(to-r, ${deepIndigo}, ${softTeal})`}
                bgClip="text"
                textAlign="center"
                letterSpacing="-0.02em"
              >
                Headspace Genie
              </Text>
            </VStack>

            {/* Heading */}
            <VStack gap={2} textAlign="center">
              <Heading
                size={{ base: "xl", md: "2xl" }}
                color={deepIndigo}
                letterSpacing="-0.02em"
                lineHeight="1.1"
              >
                Create Your Account
              </Heading>
              <Text color="purple.700" fontSize={{ base: "sm", md: "md" }}>
                Start your journey to effortless grant success
              </Text>
            </VStack>

            {/* Loading state */}
            {isLoading && (
              <Box
                p={5}
                bg="purple.50"
                borderRadius="xl"
                border="2px solid"
                borderColor="purple.200"
              >
                <Box display="flex" gap={3} justifyContent="center" alignItems="center">
                  <Spinner size="sm" color={softTeal} />
                  <Text color={deepIndigo} fontSize="sm" fontWeight="semibold">
                    Creating your account...
                  </Text>
                </Box>
              </Box>
            )}

            {/* Success message */}
            {success && (
              <Box
                p={5}
                bg="green.50"
                borderRadius="xl"
                border="2px solid"
                borderColor="green.400"
                boxShadow="0 4px 15px rgba(34, 197, 94, 0.15)"
              >
                <Box display="flex" gap={3} alignItems="center">
                  <FiCheckCircle color="#10B981" size={20} />
                  <Text color="green.800" fontSize="sm" fontWeight="semibold">
                    Account created! Redirecting to onboarding...
                  </Text>
                </Box>
              </Box>
            )}

            {/* Error message */}
            {error && (
              <Box
                p={5}
                bg="red.50"
                borderRadius="xl"
                border="2px solid"
                borderColor="red.400"
                boxShadow="0 4px 15px rgba(239, 68, 68, 0.15)"
              >
                <Box display="flex" gap={3} alignItems="center">
                  <FiAlertCircle color="#EF4444" size={20} />
                  <Text color="red.800" fontSize="sm" fontWeight="semibold">
                    {error}
                  </Text>
                </Box>
              </Box>
            )}

            <SignUp />
          </VStack>
        </Box>
      </Box>
    </TooltipProvider>
  );
}

export default function SignUpPage() {
  const { deepIndigo } = colors.brand;

  return (
    <Suspense fallback={
      <Box
        minH="100vh"
        bgGradient={`linear(135deg, ${deepIndigo}, #2D2C5A, #1a1a3e)`}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="white" />
          <Text color="white" fontSize="lg" fontWeight="semibold">
            Loading...
          </Text>
        </VStack>
      </Box>
    }>
      <SignUpContent />
    </Suspense>
  );
}
