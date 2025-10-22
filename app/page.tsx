'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { MdDescription, MdTrendingUp, MdCheckCircle, MdPending } from 'react-icons/md'
import MainLayout from '@/components/layout/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          <Heading size="lg" mb={2}>
            Dashboard
          </Heading>
          <Text color="gray.600">
            Welcome back! Here's an overview of your grant activities.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Card>
            <CardBody>
              <Flex align="center" gap={4}>
                <Flex
                  bg="blue.100"
                  borderRadius="lg"
                  p={3}
                  align="center"
                  justify="center"
                >
                  <Icon as={MdDescription} boxSize={6} color="blue.600" />
                </Flex>
                <Stat>
                  <StatLabel>Total Applications</StatLabel>
                  <StatNumber>24</StatNumber>
                  <StatHelpText>+3 this month</StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Flex align="center" gap={4}>
                <Flex
                  bg="green.100"
                  borderRadius="lg"
                  p={3}
                  align="center"
                  justify="center"
                >
                  <Icon as={MdCheckCircle} boxSize={6} color="green.600" />
                </Flex>
                <Stat>
                  <StatLabel>Approved</StatLabel>
                  <StatNumber>12</StatNumber>
                  <StatHelpText>50% success rate</StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Flex align="center" gap={4}>
                <Flex
                  bg="orange.100"
                  borderRadius="lg"
                  p={3}
                  align="center"
                  justify="center"
                >
                  <Icon as={MdPending} boxSize={6} color="orange.600" />
                </Flex>
                <Stat>
                  <StatLabel>Pending</StatLabel>
                  <StatNumber>8</StatNumber>
                  <StatHelpText>Awaiting review</StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Flex align="center" gap={4}>
                <Flex
                  bg="purple.100"
                  borderRadius="lg"
                  p={3}
                  align="center"
                  justify="center"
                >
                  <Icon as={MdTrendingUp} boxSize={6} color="purple.600" />
                </Flex>
                <Stat>
                  <StatLabel>Total Funding</StatLabel>
                  <StatNumber fontSize="lg">$485K</StatNumber>
                  <StatHelpText>Awarded grants</StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <Card>
            <CardHeader>
              <Heading size="md">Recent Applications</Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.600">
                Your recent grant applications will be displayed here.
              </Text>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Upcoming Deadlines</Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.600">
                Important deadlines and reminders will be shown here.
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </MainLayout>
  )
}
