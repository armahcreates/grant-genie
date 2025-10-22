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
  Image,
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
  FiArrowRight,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiClock,
  FiTarget,
  FiAward,
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
      title: 'AI-Powered Discovery',
      description: 'Find the perfect grants with intelligent matching algorithms that understand your organization\'s unique needs and mission.',
    },
    {
      icon: FiFileText,
      title: 'Smart Application Builder',
      description: 'Streamline applications with AI-assisted writing, automated forms, and reusable templates that save hours of work.',
    },
    {
      icon: FiCheckCircle,
      title: 'Automated Compliance',
      description: 'Never miss a deadline with intelligent reminders, automated tracking, and real-time compliance monitoring.',
    },
    {
      icon: FiBarChart2,
      title: 'Advanced Analytics',
      description: 'Gain deep insights into your grant portfolio with comprehensive reporting and predictive success metrics.',
    },
    {
      icon: FiBell,
      title: 'Instant Notifications',
      description: 'Stay ahead with real-time alerts for new opportunities, deadline changes, and application updates.',
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Work seamlessly together with role-based access, shared workflows, and real-time collaboration tools.',
    },
  ]

  const benefits = [
    {
      icon: FiZap,
      title: 'Save Time',
      description: 'Reduce grant application time from weeks to days with AI automation',
    },
    {
      icon: FiTarget,
      title: 'Find Better Matches',
      description: 'Discover grants perfectly aligned with your mission',
    },
    {
      icon: FiShield,
      title: 'Stay Compliant',
      description: 'Automated tracking ensures you never miss requirements',
    },
  ]

  const highlights = [
    {
      icon: FiClock,
      value: 'Save Hours',
      label: 'AI-Powered Automation',
    },
    {
      icon: FiAward,
      value: 'Smart Matching',
      label: 'Perfect Grant Fits',
    },
    {
      icon: FiTrendingUp,
      value: 'Better Results',
      label: 'Data-Driven Insights',
    },
    {
      icon: FiShield,
      value: 'Never Miss',
      label: 'Deadline Tracking',
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
        'AI grant discovery',
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
        'Advanced AI matching',
        'Priority support',
        'Advanced analytics',
        'Up to 5 users',
        'Custom templates',
        'API access',
      ],
      highlighted: true,
      badge: 'MOST POPULAR',
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

  return (
    <Box bg="white">
      {/* Navigation */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(12px)"
        borderBottom="1px"
        borderColor="purple.100"
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            <HStack gap={2}>
              <Box w={10} h={10} bg="purple.600" borderRadius="xl" display="flex" alignItems="center" justifyContent="center">
                <Icon as={FiZap} color="white" boxSize={6} />
              </Box>
              <Heading size="lg" bgGradient="linear(to-r, purple.600, purple.800)" bgClip="text">
                Headspace Genie
              </Heading>
            </HStack>
            <HStack gap={4}>
              <Button variant="ghost" onClick={() => setLoginModalOpen(true)} color="purple.700" fontWeight="medium">
                Log In
              </Button>
              <Button
                colorScheme="purple"
                onClick={() => setSignupModalOpen(true)}
                size="md"
                px={6}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                Get Started
                <Icon as={FiArrowRight} ml={2} />
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        pt={32}
        pb={20}
        bgGradient="linear(to-br, purple.50, white, purple.50)"
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12}>
            <VStack align="start" gap={8}>
              <Badge
                colorScheme="purple"
                fontSize="sm"
                px={4}
                py={2}
                borderRadius="full"
                textTransform="none"
                fontWeight="semibold"
              >
                <HStack gap={2}>
                  <Icon as={FiZap} />
                  <Text color="purple.800">AI-Powered Grant Management</Text>
                </HStack>
              </Badge>

              <Heading
                size="3xl"
                lineHeight="1.2"
                bgGradient="linear(to-r, purple.800, purple.600)"
                bgClip="text"
              >
                Secure More Funding in Less Time
              </Heading>

              <Text fontSize="xl" color="purple.900" lineHeight="tall">
                Discover grants, streamline applications, and manage compliance—all powered by AI. Built for modern nonprofits and organizations ready to maximize their impact.
              </Text>

              <HStack gap={4} pt={4}>
                <Button
                  size="lg"
                  colorScheme="purple"
                  px={8}
                  py={7}
                  fontSize="lg"
                  onClick={() => setSignupModalOpen(true)}
                  _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                  transition="all 0.2s"
                >
                  Start Free Trial
                  <Icon as={FiArrowRight} ml={2} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="purple.600"
                  color="purple.700"
                  px={8}
                  py={7}
                  fontSize="lg"
                  _hover={{ bg: 'purple.50' }}
                >
                  Watch Demo
                </Button>
              </HStack>

              <HStack gap={8} pt={4}>
                <HStack>
                  <Icon as={FiCheck} color="purple.600" />
                  <Text fontSize="sm" color="purple.800">No credit card required</Text>
                </HStack>
                <HStack>
                  <Icon as={FiCheck} color="purple.600" />
                  <Text fontSize="sm" color="purple.800">14-day free trial</Text>
                </HStack>
              </HStack>
            </VStack>

            <Box position="relative">
              <Box
                borderRadius="2xl"
                overflow="hidden"
                shadow="2xl"
                border="8px solid white"
                transform="perspective(1000px) rotateY(-5deg)"
                transition="all 0.3s"
                _hover={{ transform: 'perspective(1000px) rotateY(0deg)' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
                  alt="Team collaboration on grant management"
                  w="full"
                  h="500px"
                  objectFit="cover"
                />
              </Box>
              <Box
                position="absolute"
                bottom={-6}
                right={-6}
                bg="white"
                p={6}
                borderRadius="xl"
                shadow="xl"
                border="1px solid"
                borderColor="purple.100"
              >
                <VStack align="start" gap={2}>
                  <HStack gap={2}>
                    <Box w={3} h={3} bg="purple.500" borderRadius="full" />
                    <Text fontSize="sm" fontWeight="semibold" color="purple.900">AI-Powered</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.600">Smart</Text>
                  <Text fontSize="xs" color="purple.700">Grant Matching</Text>
                </VStack>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>

        {/* Decorative gradient orbs */}
        <Box
          position="absolute"
          top="20%"
          left="-10%"
          w="500px"
          h="500px"
          bg="purple.200"
          borderRadius="full"
          filter="blur(100px)"
          opacity={0.3}
          zIndex={0}
        />
        <Box
          position="absolute"
          bottom="10%"
          right="-5%"
          w="400px"
          h="400px"
          bg="purple.300"
          borderRadius="full"
          filter="blur(100px)"
          opacity={0.2}
          zIndex={0}
        />
      </Box>

      {/* Highlights Section */}
      <Box bg="white" py={16} borderTop="1px" borderBottom="1px" borderColor="purple.100">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            {highlights.map((item, index) => (
              <VStack key={index}>
                <Flex
                  w={16}
                  h={16}
                  bg="purple.100"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  mb={3}
                >
                  <Icon as={item.icon} boxSize={8} color="purple.600" />
                </Flex>
                <Heading size="lg" color="purple.800">
                  {item.value}
                </Heading>
                <Text color="purple.700" fontSize="md" fontWeight="medium" textAlign="center">
                  {item.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box bg="purple.50" py={20}>
        <Container maxW="container.xl">
          <VStack gap={16}>
            <VStack gap={4} textAlign="center" maxW="3xl">
              <Badge colorScheme="purple" fontSize="sm" px={4} py={2} borderRadius="full" textTransform="none">
                <Text color="purple.800">Why Choose Headspace Genie</Text>
              </Badge>
              <Heading size="2xl" color="purple.900">
                Built for Modern Organizations
              </Heading>
              <Text fontSize="lg" color="purple.800">
                Experience the difference that intelligent automation and AI-powered insights can make for your grant management
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
              {benefits.map((benefit, index) => (
                <Card.Root
                  key={index}
                  bg="white"
                  border="1px solid"
                  borderColor="purple.200"
                  _hover={{
                    shadow: 'xl',
                    borderColor: 'purple.400',
                    transform: 'translateY(-4px)',
                  }}
                  transition="all 0.3s"
                >
                  <Card.Body p={8}>
                    <VStack align="center" gap={4} textAlign="center">
                      <Flex
                        w={16}
                        h={16}
                        bg="purple.100"
                        borderRadius="full"
                        align="center"
                        justify="center"
                      >
                        <Icon as={benefit.icon} boxSize={8} color="purple.600" />
                      </Flex>
                      <Heading size="lg" color="purple.900">{benefit.title}</Heading>
                      <Text color="purple.800" fontSize="lg">{benefit.description}</Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Features Section with Image */}
      <Box py={24}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={16}>
            <Box>
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=600&fit=crop"
                alt="Grant management dashboard with analytics"
                borderRadius="2xl"
                shadow="2xl"
              />
            </Box>

            <VStack align="start" gap={8}>
              <Badge colorScheme="purple" fontSize="sm" px={4} py={2} borderRadius="full" textTransform="none">
                <Text color="purple.800">Features</Text>
              </Badge>
              <Heading size="2xl" lineHeight="shorter" color="purple.900">
                Everything You Need to Succeed
              </Heading>
              <Text fontSize="lg" color="purple.800">
                Comprehensive tools powered by AI to streamline your entire grant management workflow
              </Text>

              <VStack gap={4} align="stretch" w="full">
                {features.map((feature, index) => (
                  <HStack
                    key={index}
                    p={4}
                    borderRadius="lg"
                    bg="purple.50"
                    align="start"
                    _hover={{ bg: 'purple.100' }}
                    transition="all 0.2s"
                  >
                    <Flex
                      w={10}
                      h={10}
                      bg="purple.100"
                      borderRadius="lg"
                      align="center"
                      justify="center"
                      flexShrink={0}
                    >
                      <Icon as={feature.icon} boxSize={5} color="purple.600" />
                    </Flex>
                    <VStack align="start" gap={1}>
                      <Text fontWeight="semibold" color="purple.900">{feature.title}</Text>
                      <Text fontSize="sm" color="purple.800">{feature.description}</Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box bg="purple.900" color="white" py={24}>
        <Container maxW="container.xl">
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Badge bg="purple.700" color="white" fontSize="sm" px={4} py={2} borderRadius="full" textTransform="none">
                How It Works
              </Badge>
              <Heading size="2xl" color="white">
                Get Started in Minutes
              </Heading>
              <Text fontSize="lg" color="purple.200" maxW="2xl">
                Our intuitive platform makes grant management simple and efficient
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
              <Card.Root bg="white" border="none">
                <Card.Body p={8}>
                  <VStack align="start" gap={6}>
                    <Flex
                      w={12}
                      h={12}
                      bg="purple.100"
                      borderRadius="full"
                      align="center"
                      justify="center"
                    >
                      <Text fontSize="2xl" fontWeight="bold" color="purple.600">1</Text>
                    </Flex>
                    <VStack align="start" gap={3}>
                      <Heading size="md" color="purple.900">Create Your Profile</Heading>
                      <Text color="purple.800" lineHeight="tall">
                        Tell us about your organization and mission. Our AI will customize the experience to match your needs.
                      </Text>
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <Card.Root bg="white" border="none">
                <Card.Body p={8}>
                  <VStack align="start" gap={6}>
                    <Flex
                      w={12}
                      h={12}
                      bg="purple.100"
                      borderRadius="full"
                      align="center"
                      justify="center"
                    >
                      <Text fontSize="2xl" fontWeight="bold" color="purple.600">2</Text>
                    </Flex>
                    <VStack align="start" gap={3}>
                      <Heading size="md" color="purple.900">Discover Grants</Heading>
                      <Text color="purple.800" lineHeight="tall">
                        Browse AI-recommended grants perfectly matched to your organization. Filter by amount, deadline, and category.
                      </Text>
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <Card.Root bg="white" border="none">
                <Card.Body p={8}>
                  <VStack align="start" gap={6}>
                    <Flex
                      w={12}
                      h={12}
                      bg="purple.100"
                      borderRadius="full"
                      align="center"
                      justify="center"
                    >
                      <Text fontSize="2xl" fontWeight="bold" color="purple.600">3</Text>
                    </Flex>
                    <VStack align="start" gap={3}>
                      <Heading size="md" color="purple.900">Apply & Track</Heading>
                      <Text color="purple.800" lineHeight="tall">
                        Use our smart application builder and automated compliance tracking to stay organized and on time.
                      </Text>
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box py={24}>
        <Container maxW="container.xl">
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Badge colorScheme="purple" fontSize="sm" px={4} py={2} borderRadius="full" textTransform="none">
                <Text color="purple.800">Pricing</Text>
              </Badge>
              <Heading size="2xl" color="purple.900">Simple, Transparent Pricing</Heading>
              <Text fontSize="lg" color="purple.800" maxW="2xl">
                Choose the perfect plan for your organization. Start free, upgrade anytime.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} w="full">
              {pricingPlans.map((plan, index) => (
                <Card.Root
                  key={index}
                  bg="white"
                  borderWidth="2px"
                  borderColor={plan.highlighted ? 'purple.600' : 'purple.200'}
                  position="relative"
                  transform={plan.highlighted ? 'scale(1.05)' : 'scale(1)'}
                  shadow={plan.highlighted ? '2xl' : 'md'}
                  _hover={{
                    shadow: 'xl',
                    transform: plan.highlighted ? 'scale(1.08)' : 'scale(1.02)',
                  }}
                  transition="all 0.3s"
                >
                  {plan.badge && (
                    <Badge
                      position="absolute"
                      top={-3}
                      left="50%"
                      transform="translateX(-50%)"
                      colorScheme="purple"
                      fontSize="sm"
                      px={4}
                      py={1}
                      borderRadius="full"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                  <Card.Body p={8}>
                    <VStack align="stretch" gap={6}>
                      <VStack align="start" gap={2}>
                        <Text fontWeight="semibold" fontSize="lg" color="purple.900">
                          {plan.name}
                        </Text>
                        <HStack align="baseline">
                          <Heading size="3xl" bgGradient="linear(to-r, purple.600, purple.800)" bgClip="text">
                            {plan.price}
                          </Heading>
                          <Text color="purple.700" fontSize="lg">{plan.period}</Text>
                        </HStack>
                        <Text color="purple.800">{plan.description}</Text>
                      </VStack>

                      <Button
                        size="lg"
                        colorScheme={plan.highlighted ? 'purple' : 'gray'}
                        variant={plan.highlighted ? 'solid' : 'outline'}
                        onClick={() => setSignupModalOpen(true)}
                        w="full"
                        py={6}
                      >
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                      </Button>

                      <VStack gap={3} align="start" pt={2}>
                        {plan.features.map((feature, idx) => (
                          <HStack key={idx} gap={3}>
                            <Icon as={FiCheck} color="purple.600" boxSize={5} />
                            <Text color="purple.800">{feature}</Text>
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
      </Box>

      {/* CTA Section */}
      <Box
        bgGradient="linear(to-br, purple.600, purple.900)"
        color="white"
        py={24}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack gap={8} textAlign="center">
            <Heading size="3xl" maxW="4xl" color="white">
              Ready to Transform Your Grant Management?
            </Heading>
            <Text fontSize="xl" maxW="3xl" color="purple.100">
              Join forward-thinking organizations using Headspace Genie to streamline their grant process and secure more funding.
            </Text>
            <HStack gap={4} pt={4}>
              <Button
                size="lg"
                bg="white"
                color="purple.900"
                px={8}
                py={7}
                fontSize="lg"
                onClick={() => setSignupModalOpen(true)}
                _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                transition="all 0.2s"
              >
                Start Your Free Trial
                <Icon as={FiArrowRight} ml={2} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                px={8}
                py={7}
                fontSize="lg"
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                Schedule a Demo
              </Button>
            </HStack>
            <HStack gap={8} pt={4}>
              <HStack>
                <Icon as={FiCheck} />
                <Text fontSize="sm" color="purple.100">No credit card required</Text>
              </HStack>
              <HStack>
                <Icon as={FiCheck} />
                <Text fontSize="sm" color="purple.100">14-day free trial</Text>
              </HStack>
              <HStack>
                <Icon as={FiCheck} />
                <Text fontSize="sm" color="purple.100">Cancel anytime</Text>
              </HStack>
            </HStack>
          </VStack>
        </Container>

        {/* Decorative elements */}
        <Box
          position="absolute"
          top="-20%"
          right="-10%"
          w="600px"
          h="600px"
          bg="purple.500"
          borderRadius="full"
          filter="blur(120px)"
          opacity={0.3}
        />
      </Box>

      {/* Footer */}
      <Box bg="gray.900" color="gray.300" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={12} mb={12}>
            <VStack align="start" gap={4}>
              <HStack gap={2}>
                <Box w={10} h={10} bg="purple.600" borderRadius="xl" display="flex" alignItems="center" justifyContent="center">
                  <Icon as={FiZap} color="white" boxSize={6} />
                </Box>
                <Heading size="md" color="white">
                  Headspace Genie
                </Heading>
              </HStack>
              <Text fontSize="sm" color="gray.400" lineHeight="tall">
                AI-powered grant management for modern organizations. Secure more funding in less time.
              </Text>
            </VStack>

            <VStack align="start" gap={3}>
              <Text fontWeight="semibold" color="white" mb={2}>Product</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Features</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Pricing</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Security</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Integrations</Text>
            </VStack>

            <VStack align="start" gap={3}>
              <Text fontWeight="semibold" color="white" mb={2}>Company</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>About</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Blog</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Careers</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Press</Text>
            </VStack>

            <VStack align="start" gap={3}>
              <Text fontWeight="semibold" color="white" mb={2}>Support</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Help Center</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Contact Us</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>Status</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'white' }}>API Docs</Text>
            </VStack>
          </SimpleGrid>

          <Box pt={8} borderTop="1px" borderColor="gray.800" textAlign="center">
            <Text fontSize="sm" color="gray.500">
              © 2025 Headspace Genie. All rights reserved. Built with ❤️ for organizations making a difference.
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
