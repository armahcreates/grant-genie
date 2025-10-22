'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Icon,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import {
  FiDownload,
  FiTrendingUp,
  FiDollarSign,
  FiFileText,
  FiCheckCircle,
  FiPieChart,
  FiBarChart2,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'

export default function ReportingPage() {
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const recentGrants = [
    {
      name: 'Community Development Grant',
      amount: '$150,000',
      status: 'Active',
      progress: 65,
      endDate: 'Dec 2025',
    },
    {
      name: 'Education Innovation Fund',
      amount: '$75,000',
      status: 'Active',
      progress: 45,
      endDate: 'Jun 2025',
    },
    {
      name: 'Healthcare Access Program',
      amount: '$200,000',
      status: 'Active',
      progress: 80,
      endDate: 'Mar 2026',
    },
    {
      name: 'Youth Development Fund',
      amount: '$60,000',
      status: 'Completed',
      progress: 100,
      endDate: 'Dec 2024',
    },
  ]

  const fundingByCategory = [
    { category: 'Healthcare', amount: '$200,000', percentage: 41 },
    { category: 'Community Development', amount: '$150,000', percentage: 31 },
    { category: 'Education', amount: '$75,000', percentage: 15 },
    { category: 'Youth Services', amount: '$60,000', percentage: 13 },
  ]

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between">
            <Box>
              <Heading size="lg" mb={2}>
                Reporting & Analytics
              </Heading>
              <Text color="gray.600">
                Track your grant performance and generate comprehensive reports
              </Text>
            </Box>
            <HStack>
              <Select w="200px" defaultValue="2025">
                <option value="2025">Year: 2025</option>
                <option value="2024">Year: 2024</option>
                <option value="2023">Year: 2023</option>
              </Select>
              <Button leftIcon={<Icon as={FiDownload} />} colorScheme="blue">
                Export Report
              </Button>
            </HStack>
          </HStack>

          {/* Key Metrics */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Total Funding Secured</StatLabel>
                  <HStack spacing={2} align="baseline">
                    <Icon as={FiDollarSign} color="green.500" boxSize={6} />
                    <StatNumber>$485,000</StatNumber>
                  </HStack>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.5% from last year
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Active Grants</StatLabel>
                  <HStack spacing={2} align="baseline">
                    <Icon as={FiFileText} color="blue.500" boxSize={6} />
                    <StatNumber>12</StatNumber>
                  </HStack>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    3 new this month
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Success Rate</StatLabel>
                  <HStack spacing={2} align="baseline">
                    <Icon as={FiCheckCircle} color="purple.500" boxSize={6} />
                    <StatNumber>68%</StatNumber>
                  </HStack>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12% improvement
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Compliance Rate</StatLabel>
                  <HStack spacing={2} align="baseline">
                    <Icon as={FiTrendingUp} color="orange.500" boxSize={6} />
                    <StatNumber>94%</StatNumber>
                  </HStack>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    On track
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Charts Section */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {/* Funding by Category */}
            <Card>
              <CardHeader>
                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiPieChart} color="blue.500" />
                    <Heading size="md">Funding by Category</Heading>
                  </HStack>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {fundingByCategory.map((item, index) => (
                    <Box key={index}>
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" fontWeight="medium">
                          {item.category}
                        </Text>
                        <HStack>
                          <Text fontSize="sm" color="gray.600">
                            {item.amount}
                          </Text>
                          <Badge>{item.percentage}%</Badge>
                        </HStack>
                      </HStack>
                      <Progress
                        value={item.percentage}
                        size="sm"
                        colorScheme="blue"
                        borderRadius="full"
                      />
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Application Timeline */}
            <Card>
              <CardHeader>
                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiBarChart2} color="purple.500" />
                    <Heading size="md">Application Timeline</Heading>
                  </HStack>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="sm">Q1 2025</Text>
                    <Badge colorScheme="green">8 Applications</Badge>
                  </HStack>
                  <Progress value={80} size="sm" colorScheme="green" borderRadius="full" />

                  <HStack justify="space-between">
                    <Text fontSize="sm">Q4 2024</Text>
                    <Badge colorScheme="blue">6 Applications</Badge>
                  </HStack>
                  <Progress value={60} size="sm" colorScheme="blue" borderRadius="full" />

                  <HStack justify="space-between">
                    <Text fontSize="sm">Q3 2024</Text>
                    <Badge colorScheme="purple">5 Applications</Badge>
                  </HStack>
                  <Progress value={50} size="sm" colorScheme="purple" borderRadius="full" />

                  <HStack justify="space-between">
                    <Text fontSize="sm">Q2 2024</Text>
                    <Badge colorScheme="orange">4 Applications</Badge>
                  </HStack>
                  <Progress value={40} size="sm" colorScheme="orange" borderRadius="full" />
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Grant Performance Table */}
          <Card>
            <CardHeader>
              <Heading size="md">Grant Performance Overview</Heading>
            </CardHeader>
            <CardBody>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Grant Name</Th>
                    <Th>Award Amount</Th>
                    <Th>Status</Th>
                    <Th>Progress</Th>
                    <Th>End Date</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentGrants.map((grant, index) => (
                    <Tr key={index}>
                      <Td fontWeight="medium">{grant.name}</Td>
                      <Td>{grant.amount}</Td>
                      <Td>
                        <Badge
                          colorScheme={grant.status === 'Active' ? 'green' : 'gray'}
                        >
                          {grant.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={3}>
                          <Progress
                            value={grant.progress}
                            size="sm"
                            colorScheme="blue"
                            w="100px"
                            borderRadius="full"
                          />
                          <Text fontSize="sm">{grant.progress}%</Text>
                        </HStack>
                      </Td>
                      <Td fontSize="sm">{grant.endDate}</Td>
                      <Td>
                        <Button size="xs" variant="outline">
                          View Report
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          {/* Report Templates */}
          <Card>
            <CardHeader>
              <Heading size="md">Report Templates</Heading>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <Card variant="outline">
                  <CardBody>
                    <VStack spacing={3}>
                      <Icon as={FiFileText} boxSize={8} color="blue.500" />
                      <Text fontWeight="medium">Financial Summary</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        Comprehensive financial report across all grants
                      </Text>
                      <Button size="sm" w="full" leftIcon={<Icon as={FiDownload} />}>
                        Generate
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>

                <Card variant="outline">
                  <CardBody>
                    <VStack spacing={3}>
                      <Icon as={FiBarChart2} boxSize={8} color="purple.500" />
                      <Text fontWeight="medium">Impact Report</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        Measure program outcomes and community impact
                      </Text>
                      <Button size="sm" w="full" leftIcon={<Icon as={FiDownload} />}>
                        Generate
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>

                <Card variant="outline">
                  <CardBody>
                    <VStack spacing={3}>
                      <Icon as={FiCheckCircle} boxSize={8} color="green.500" />
                      <Text fontWeight="medium">Compliance Report</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        Track compliance status and requirements
                      </Text>
                      <Button size="sm" w="full" leftIcon={<Icon as={FiDownload} />}>
                        Generate
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </CardBody>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <Heading size="md">Custom Report Builder</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <Select placeholder="Select Date Range">
                    <option value="last-month">Last Month</option>
                    <option value="last-quarter">Last Quarter</option>
                    <option value="last-year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </Select>

                  <Select placeholder="Select Grant(s)">
                    <option value="all">All Grants</option>
                    <option value="active">Active Grants Only</option>
                    <option value="completed">Completed Grants Only</option>
                  </Select>

                  <Select placeholder="Export Format">
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel (XLSX)</option>
                    <option value="csv">CSV</option>
                  </Select>
                </SimpleGrid>

                <Divider />

                <HStack justify="flex-end">
                  <Button variant="outline">Preview</Button>
                  <Button colorScheme="blue" leftIcon={<Icon as={FiDownload} />}>
                    Generate Custom Report
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </MainLayout>
  )
}
