'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  Icon,
  Badge,
  Flex,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  FiCheck,
  FiSearch,
  FiFileText,
  FiCheckCircle,
  FiBarChart2,
  FiBell,
  FiUsers,
} from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import LoginModal from '@/components/auth/LoginModal'
import SignupModal from '@/components/auth/SignupModal'

export default function LandingPage() {
  const router = useRouter()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)

  const features = [
    {
      icon: FiSearch,
      title: 'Smart Grant Search',
      description: 'AI-powered search to find the perfect grants for your organization',
    },
    {
      icon: FiFileText,
      title: 'Application Management',
      description: 'Streamline your application process with intelligent forms and templates',
    },
    {
      icon: FiCheckCircle,
      title: 'Compliance Tracking',
      description: 'Never miss a deadline with automated reminders and tracking',
    },
    {
      icon: FiBarChart2,
      title: 'Analytics & Reporting',
      description: 'Comprehensive insights into your grant portfolio and performance',
    },
    {
      icon: FiBell,
      title: 'Real-time Notifications',
      description: 'Stay informed with instant alerts for deadlines and opportunities',
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with role-based access and permissions',
    },
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small organizations getting started',
      features: [
        'Up to 5 active grants',
        'Basic grant search',
        'Email support',
        'Essential reporting',
        '1 user account',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing organizations with expanding needs',
      features: [
        'Unlimited grants',
        'Advanced AI search',
        'Priority support',
        'Advanced analytics',
        'Up to 5 users',
        'Custom templates',
        'API access',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited users',
        'White-label options',
        'SLA guarantee',
        'Training & onboarding',
      ],
      highlighted: false,
    },
  ]

  const stats = [
    { value: '$500M+', label: 'Grants Secured' },
    { value: '10,000+', label: 'Organizations' },
    { value: '95%', label: 'Success Rate' },
    { value: '24/7', label: 'Support' },
  ]

  return (
    <Box>
      {/* Navigation */}
      <Box
        position="sticky"
        top={0}
        zIndex={10}
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        backdropFilter="blur(10px)"
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            <Heading size="lg" color="blue.500">
              Grant Genie
            </Heading>
            <HStack gap={4}>
              <Button variant="ghost" onClick={() => setLoginModalOpen(true)}>
                Log In
              </Button>
              <Button colorScheme="blue" onClick={() => setSignupModalOpen(true)}>
                Get Started
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box bgGradient="linear(to-r, blue.400, purple.500)" color="white" py={20}>
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            <Badge colorScheme="yellow" fontSize="md" px={3} py={1}>
              AI-Powered Grant Management
            </Badge>
            <Heading size="3xl" maxW="900px">
              Simplify Grant Management, Maximize Funding Success
            </Heading>
            <Text fontSize="xl" maxW="700px" opacity={0.9}>
              Join thousands of organizations using Grant Genie to discover, apply for, and
              manage grants with AI-powered intelligence.
            </Text>
            <HStack gap={4} pt={4}>
              <Button size="lg" colorScheme="yellow" onClick={() => setSignupModalOpen(true)}>
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" colorScheme="whiteAlpha">
                Watch Demo
              </Button>
            </HStack>
            <Text fontSize="sm" opacity={0.8}>
              No credit card required • 14-day free trial • Cancel anytime
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxW="container.xl" py={12}>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
          {stats.map((stat, index) => (
            <VStack key={index}>
              <Heading size="2xl" color="blue.500">
                {stat.value}
              </Heading>
              <Text color="gray.600" fontSize="lg">
                {stat.label}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.xl">
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Heading size="2xl">Everything You Need to Succeed</Heading>
              <Text fontSize="lg" color="gray.600" maxW="600px">
                Comprehensive tools to streamline your entire grant management process
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
              {features.map((feature, index) => (
                <Card.Root key={index} bg="white">
                  <Card.Body>
                    <VStack align="start" gap={4}>
                      <Flex
                        w={12}
                        h={12}
                        bg="blue.100"
                        borderRadius="lg"
                        align="center"
                        justify="center"
                      >
                        <Icon as={feature.icon} boxSize={6} color="blue.500" />
                      </Flex>
                      <Heading size="md">{feature.title}</Heading>
                      <Text color="gray.600">{feature.description}</Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Container maxW="container.xl" py={20}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading size="2xl">Simple, Transparent Pricing</Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              Choose the plan that fits your organization's needs
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} w="full">
            {pricingPlans.map((plan, index) => (
              <Card.Root
                key={index}
                bg="white"
                borderWidth={plan.highlighted ? '2px' : '1px'}
                borderColor={plan.highlighted ? 'blue.500' : 'gray.200'}
                position="relative"
              >
                {plan.highlighted && (
                  <Badge
                    position="absolute"
                    top={-3}
                    left="50%"
                    transform="translateX(-50%)"
                    colorScheme="blue"
                    fontSize="sm"
                    px={3}
                    py={1}
                  >
                    MOST POPULAR
                  </Badge>
                )}
                <Card.Body>
                  <VStack align="stretch" gap={6}>
                    <VStack align="start" gap={2}>
                      <Text fontWeight="semibold" fontSize="lg">
                        {plan.name}
                      </Text>
                      <HStack align="baseline">
                        <Heading size="2xl">{plan.price}</Heading>
                        <Text color="gray.600">{plan.period}</Text>
                      </HStack>
                      <Text color="gray.600">{plan.description}</Text>
                    </VStack>

                    <Button
                      size="lg"
                      colorScheme={plan.highlighted ? 'blue' : 'gray'}
                      variant={plan.highlighted ? 'solid' : 'outline'}
                      onClick={() => setSignupModalOpen(true)}
                    >
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                    </Button>

                    <VStack gap={3} align="start">
                      {plan.features.map((feature, idx) => (
                        <HStack key={idx}>
                          <Icon as={FiCheck} color="green.500" />
                          <Text>{feature}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg="blue.500" color="white" py={20}>
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            <Heading size="2xl">Ready to Transform Your Grant Management?</Heading>
            <Text fontSize="xl" maxW="700px">
              Join thousands of successful organizations using Grant Genie to secure more
              funding and streamline their operations.
            </Text>
            <HStack gap={4}>
              <Button size="lg" colorScheme="yellow" onClick={() => setSignupModalOpen(true)}>
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="outline" colorScheme="whiteAlpha">
                Schedule a Demo
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.50" py={12}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={8}>
            <VStack align="start" gap={4}>
              <Heading size="md" color="blue.500">
                Grant Genie
              </Heading>
              <Text fontSize="sm" color="gray.600">
                AI-powered grant management for modern organizations.
              </Text>
            </VStack>

            <VStack align="start" gap={2}>
              <Text fontWeight="semibold">Product</Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                Features
              </Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                Pricing
              </Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                Security
              </Text>
            </VStack>

            <VStack align="start" gap={2}>
              <Text fontWeight="semibold">Company</Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                About
              </Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                Blog
              </Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                Careers
              </Text>
            </VStack>

            <VStack align="start" gap={2}>
              <Text fontWeight="semibold">Support</Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                Help Center
              </Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                Contact Us
              </Text>
              <Text fontSize="sm" color="gray.600" cursor="pointer">
                Status
              </Text>
            </VStack>
          </SimpleGrid>

          <Box pt={8} mt={8} borderTop="1px" borderColor="gray.200" textAlign="center">
            <Text fontSize="sm" color="gray.600">
              © 2025 Grant Genie. All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setLoginModalOpen(false)
          setSignupModalOpen(true)
        }}
      />
      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setSignupModalOpen(false)
          setLoginModalOpen(true)
        }}
      />
    </Box>
  )
}
