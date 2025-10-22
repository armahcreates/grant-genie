'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  CardBody,
  CardHeader,
  Icon,
  Link,
  Divider,
  List,
  ListItem,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import {
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiBook,
  FiVideo,
  FiUsers,
  FiCalendar,
  FiAward,
  FiAlertCircle,
  FiStar,
  FiCreditCard,
  FiHelpCircle,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'

export default function SupportPage() {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const accordionBg = useColorModeValue('white', 'gray.800')

  const faqs = [
    {
      question: 'How do I search for relevant grants?',
      answer:
        'Use the Grant Search feature to filter by category, funding amount, deadline, and eligibility criteria. Our AI will suggest grants that match your organization profile.',
    },
    {
      question: 'What documents do I need for grant applications?',
      answer:
        'Typically you\'ll need your organization\'s tax-exempt status, financial statements, project/budget, and organizational information. Each grant may have specific requirements.',
    },
    {
      question: 'How does the compliance tracker work?',
      answer:
        'The compliance tracker monitors deadlines, required reports, and documentation. It sends automated reminders and helps ensure you meet all grant compliance requirements.',
    },
    {
      question: 'Can I collaborate with team members on applications?',
      answer:
        'Yes! You can invite team members to your organization account, assign roles and permissions, and collaborate on grant applications in real-time.',
    },
    {
      question: 'How do I generate reports for funders?',
      answer:
        'Navigate to the Reporting section and select the type of report you need. You can customize reports with specific metrics, timelines, and export them in various formats.',
    },
    {
      question: 'What if I need help with my application?',
      answer:
        'Our support team is available 24/7 via email, phone, or live chat. You can also access our video tutorials, community forum, and schedule a consultation with our grant experts.',
    },
  ]

  const communityResources = [
    { name: 'User Guide', icon: FiBook },
    { name: 'Video Tutorials', icon: FiVideo },
    { name: 'Community Forum', icon: FiUsers },
    { name: 'Webinars', icon: FiCalendar },
    { name: 'Best Practices', icon: FiAward },
  ]

  const quickActions = [
    { name: 'Report a Bug', icon: FiAlertCircle },
    { name: 'Request Feature', icon: FiStar },
    { name: 'Account Issues', icon: FiHelpCircle },
    { name: 'Billing Questions', icon: FiCreditCard },
  ]

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2}>
              Support Center
            </Heading>
            <Text color="gray.600">
              Find answers to your questions and get help with AI Grant Managed
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            {/* Left Column - FAQs */}
            <GridItem>
              <Card>
                <CardHeader>
                  <Heading size="md">Frequently Asked Questions</Heading>
                </CardHeader>
                <CardBody>
                  <Accordion allowToggle>
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} border="none" mb={2}>
                        <h2>
                          <AccordionButton
                            bg={accordionBg}
                            border="1px"
                            borderColor={borderColor}
                            borderRadius="md"
                            _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                            _expanded={{ bg: useColorModeValue('blue.50', 'blue.900') }}
                            py={4}
                          >
                            <Box flex="1" textAlign="left" fontWeight="medium">
                              {faq.question}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pt={4} color="gray.600">
                          {faq.answer}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardBody>
              </Card>
            </GridItem>

            {/* Right Column - Contact & Resources */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                {/* Contact Support */}
                <Card>
                  <CardHeader>
                    <Heading size="md">Contact Support</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {/* Email Support */}
                      <HStack spacing={3} align="start">
                        <Icon as={FiMail} boxSize={5} color="blue.500" mt={1} />
                        <Box flex={1}>
                          <Text fontWeight="semibold" mb={1}>
                            Email Support
                          </Text>
                          <Link
                            href="mailto:support@aigrantmanaged.com"
                            color="blue.500"
                            fontSize="sm"
                          >
                            support@aigrantmanaged.com
                          </Link>
                        </Box>
                      </HStack>

                      <Divider />

                      {/* Phone Support */}
                      <HStack spacing={3} align="start">
                        <Icon as={FiPhone} boxSize={5} color="blue.500" mt={1} />
                        <Box flex={1}>
                          <Text fontWeight="semibold" mb={1}>
                            Phone Support
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            1-800-XXX-XXXX
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Available 24/7
                          </Text>
                        </Box>
                      </HStack>

                      <Divider />

                      {/* Live Chat */}
                      <HStack spacing={3} align="start">
                        <Icon as={FiMessageCircle} boxSize={5} color="blue.500" mt={1} />
                        <Box flex={1}>
                          <Text fontWeight="semibold" mb={1}>
                            Live Chat
                          </Text>
                          <Text fontSize="sm" color="gray.600" mb={3}>
                            Available M-F
                          </Text>
                          <Text fontSize="sm" color="gray.500" mb={3}>
                            9am-5pm EST
                          </Text>
                          <Button colorScheme="blue" w="full" size="sm">
                            Start Live Chat
                          </Button>
                        </Box>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Community Resources */}
                <Card>
                  <CardHeader>
                    <Heading size="md">Community Resources</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={2} align="stretch">
                      {communityResources.map((resource, index) => (
                        <HStack
                          key={index}
                          p={3}
                          borderRadius="md"
                          cursor="pointer"
                          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                          transition="all 0.2s"
                        >
                          <Icon as={resource.icon} boxSize={5} color="gray.500" />
                          <Text fontSize="sm">{resource.name}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <Heading size="md">Quick Actions</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={2} align="stretch">
                      {quickActions.map((action, index) => (
                        <HStack
                          key={index}
                          p={3}
                          borderRadius="md"
                          cursor="pointer"
                          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                          transition="all 0.2s"
                        >
                          <Icon as={action.icon} boxSize={5} color="gray.500" />
                          <Text fontSize="sm">{action.name}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </GridItem>
          </Grid>

          {/* Footer */}
          <Box textAlign="center" py={8} borderTop="1px" borderColor={borderColor}>
            <Text fontSize="sm" color="gray.500">
              © 2025 AI Grant Managed. All rights reserved.
            </Text>
          </Box>
        </VStack>
      </Container>
    </MainLayout>
  )
}
