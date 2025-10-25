"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  Card,
  Progress,
  Icon,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";
import {
  FiUser,
  FiBriefcase,
  FiTarget,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";

function OnboardingContent() {
  const router = useRouter();
  const user = useUser({ or: "redirect" });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    organizationName: "",
    organizationType: "",
    role: "",
    goals: [] as string[],
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const organizationTypes = [
    "Nonprofit Organization",
    "Foundation",
    "Educational Institution",
    "Government Agency",
    "Social Enterprise",
    "Other",
  ];

  const goalOptions = [
    "Find Grant Opportunities",
    "Write Grant Proposals",
    "Practice Donor Conversations",
    "Track Compliance & Reporting",
    "Manage Team Collaboration",
    "Learn Fundraising Best Practices",
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    // Save onboarding data to user metadata
    try {
      await user.update({
        clientMetadata: {
          onboarded: "true",
          organizationName: formData.organizationName,
          organizationType: formData.organizationType,
          role: formData.role,
          goals: formData.goals.join(","),
        },
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    }
  };

  return (
    <Box minH="100vh" bg="purple.50" py={{ base: 8, md: 12 }}>
      <Container maxW="4xl">
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack gap={2} textAlign="center">
            <Heading size={{ base: "xl", md: "2xl" }} color="purple.900">
              Welcome to HeadspaceGenie
            </Heading>
            <Text color="purple.700" fontSize={{ base: "md", md: "lg" }}>
              Let's get you set up in just a few steps
            </Text>
          </VStack>

          {/* Progress */}
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" color="purple.700" fontWeight="medium">
                Step {step} of {totalSteps}
              </Text>
              <Text fontSize="sm" color="purple.700">
                {Math.round(progress)}% Complete
              </Text>
            </HStack>
            <Progress.Root value={progress} colorPalette="purple">
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          </Box>

          {/* Onboarding Steps */}
          <Card.Root bg="white" p={{ base: 6, md: 8 }} borderRadius="2xl" boxShadow="xl">
            <Card.Body>
              {step === 1 && (
                <VStack gap={6} align="stretch">
                  <HStack gap={3}>
                    <Icon
                      as={FiUser}
                      boxSize={8}
                      color="purple.600"
                      p={2}
                      bg="purple.50"
                      borderRadius="lg"
                    />
                    <VStack align="start" gap={0}>
                      <Heading size={{ base: "md", md: "lg" }} color="purple.900">
                        About You
                      </Heading>
                      <Text color="purple.700" fontSize={{ base: "sm", md: "md" }}>
                        Tell us a bit about yourself
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack gap={4} align="stretch" mt={4}>
                    <VStack align="start" gap={2}>
                      <Text fontWeight="medium" color="purple.900">
                        Full Name
                      </Text>
                      <Input
                        size={{ base: "md", md: "lg" }}
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </VStack>

                    <VStack align="start" gap={2}>
                      <Text fontWeight="medium" color="purple.900">
                        Your Role
                      </Text>
                      <Input
                        size={{ base: "md", md: "lg" }}
                        placeholder="e.g., Executive Director, Development Manager"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      />
                    </VStack>
                  </VStack>
                </VStack>
              )}

              {step === 2 && (
                <VStack gap={6} align="stretch">
                  <HStack gap={3}>
                    <Icon
                      as={FiBriefcase}
                      boxSize={8}
                      color="purple.600"
                      p={2}
                      bg="purple.50"
                      borderRadius="lg"
                    />
                    <VStack align="start" gap={0}>
                      <Heading size={{ base: "md", md: "lg" }} color="purple.900">
                        Your Organization
                      </Heading>
                      <Text color="purple.700" fontSize={{ base: "sm", md: "md" }}>
                        Help us understand your mission
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack gap={4} align="stretch" mt={4}>
                    <VStack align="start" gap={2}>
                      <Text fontWeight="medium" color="purple.900">
                        Organization Name
                      </Text>
                      <Input
                        size={{ base: "md", md: "lg" }}
                        placeholder="Enter your organization name"
                        value={formData.organizationName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organizationName: e.target.value,
                          })
                        }
                      />
                    </VStack>

                    <VStack align="start" gap={2}>
                      <Text fontWeight="medium" color="purple.900">
                        Organization Type
                      </Text>
                      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={2} w="full">
                        {organizationTypes.map((type) => (
                          <Button
                            key={type}
                            variant={
                              formData.organizationType === type
                                ? "solid"
                                : "outline"
                            }
                            colorScheme="purple"
                            onClick={() =>
                              setFormData({ ...formData, organizationType: type })
                            }
                            size={{ base: "sm", md: "md" }}
                            textAlign="left"
                            justifyContent="flex-start"
                          >
                            {formData.organizationType === type && (
                              <Icon as={FiCheck} mr={2} />
                            )}
                            {type}
                          </Button>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  </VStack>
                </VStack>
              )}

              {step === 3 && (
                <VStack gap={6} align="stretch">
                  <HStack gap={3}>
                    <Icon
                      as={FiTarget}
                      boxSize={8}
                      color="purple.600"
                      p={2}
                      bg="purple.50"
                      borderRadius="lg"
                    />
                    <VStack align="start" gap={0}>
                      <Heading size={{ base: "md", md: "lg" }} color="purple.900">
                        Your Goals
                      </Heading>
                      <Text color="purple.700" fontSize={{ base: "sm", md: "md" }}>
                        What would you like to accomplish?
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack gap={2} align="stretch" mt={4}>
                    <Text fontSize={{ base: "sm", md: "md" }} color="purple.700" mb={2}>
                      Select all that apply:
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={2}>
                      {goalOptions.map((goal) => (
                        <Button
                          key={goal}
                          variant={
                            formData.goals.includes(goal) ? "solid" : "outline"
                          }
                          colorScheme="purple"
                          onClick={() => handleGoalToggle(goal)}
                          size={{ base: "sm", md: "md" }}
                          textAlign="left"
                          justifyContent="flex-start"
                        >
                          {formData.goals.includes(goal) && (
                            <Icon as={FiCheck} mr={2} />
                          )}
                          {goal}
                        </Button>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </VStack>
              )}

              {/* Navigation Buttons */}
              <HStack justify="space-between" mt={8}>
                <Button
                  variant="outline"
                  colorScheme="purple"
                  onClick={handleBack}
                  disabled={step === 1}
                  size={{ base: "md", md: "lg" }}
                >
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    colorScheme="purple"
                    onClick={handleNext}
                    size={{ base: "md", md: "lg" }}
                  >
                    Continue
                    <Icon as={FiArrowRight} ml={2} />
                  </Button>
                ) : (
                  <Button
                    colorScheme="purple"
                    onClick={handleComplete}
                    size={{ base: "md", md: "lg" }}
                  >
                    Complete Setup
                    <Icon as={FiCheck} ml={2} />
                  </Button>
                )}
              </HStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
}

function LoadingFallback() {
  return (
    <Box minH="100vh" bg="purple.50" display="flex" alignItems="center" justifyContent="center">
      <VStack gap={4}>
        <Spinner size="xl" colorPalette="purple" borderWidth="4px" />
        <Text color="purple.700">Loading...</Text>
      </VStack>
    </Box>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OnboardingContent />
    </Suspense>
  );
}
