'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Avatar,
  Icon,
  Card,
  CardBody,
  useColorModeValue,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdPerson, MdBusiness, MdNotifications, MdSecurity, MdCamera } from 'react-icons/md'
import MainLayout from '@/components/layout/MainLayout'

interface SectionTabProps {
  icon: any
  label: string
  isActive?: boolean
  onClick: () => void
}

const SectionTab = ({ icon, label, isActive, onClick }: SectionTabProps) => {
  const activeColor = useColorModeValue('blue.600', 'blue.200')
  const activeBg = useColorModeValue('blue.50', 'blue.900')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Button
      variant="ghost"
      justifyContent="flex-start"
      leftIcon={<Icon as={icon} />}
      w="full"
      bg={isActive ? activeBg : 'transparent'}
      color={isActive ? activeColor : 'inherit'}
      fontWeight={isActive ? 'semibold' : 'medium'}
      _hover={{ bg: isActive ? activeBg : hoverBg }}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('personal')
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          <Heading size="lg" mb={2}>
            Profile Management
          </Heading>
          <Text color="gray.600">
            Manage your contact information and organization details
          </Text>
        </Box>

        <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
          {/* Left Sidebar Navigation */}
          <Card
            w={{ base: 'full', lg: '280px' }}
            h="fit-content"
            flexShrink={0}
          >
            <CardBody p={4}>
              <VStack spacing={2} align="stretch">
                <SectionTab
                  icon={MdPerson}
                  label="Personal Information"
                  isActive={activeSection === 'personal'}
                  onClick={() => setActiveSection('personal')}
                />
                <SectionTab
                  icon={MdBusiness}
                  label="Organization Details"
                  isActive={activeSection === 'organization'}
                  onClick={() => setActiveSection('organization')}
                />
                <SectionTab
                  icon={MdNotifications}
                  label="Notification Preferences"
                  isActive={activeSection === 'notifications'}
                  onClick={() => setActiveSection('notifications')}
                />
                <SectionTab
                  icon={MdSecurity}
                  label="Security Settings"
                  isActive={activeSection === 'security'}
                  onClick={() => setActiveSection('security')}
                />
              </VStack>
            </CardBody>
          </Card>

          {/* Main Content Area */}
          <Card flex={1}>
            <CardBody p={8}>
              {activeSection === 'personal' && (
                <Box>
                  <Heading size="md" mb={2}>
                    Personal Information
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    Update your personal details and contact information
                  </Text>

                  {/* Profile Photo */}
                  <Flex align="center" gap={4} mb={8}>
                    <Avatar
                      size="xl"
                      name="Sarah Johnson"
                      bg="blue.500"
                    />
                    <Button
                      leftIcon={<Icon as={MdCamera} />}
                      variant="outline"
                      size="sm"
                    >
                      Change Photo
                    </Button>
                  </Flex>

                  <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          placeholder="Enter first name"
                          defaultValue="Sarah"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          placeholder="Enter last name"
                          defaultValue="Johnson"
                        />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        defaultValue="sarah.johnson@nonprofit6.org"
                      />
                    </FormControl>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          defaultValue="+1 (555) 123-4567"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Job Title</FormLabel>
                        <Input
                          placeholder="Enter job title"
                          defaultValue="Program Director"
                        />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl>
                      <FormLabel>Bio</FormLabel>
                      <Textarea
                        placeholder="Tell us about yourself and your role..."
                        rows={4}
                      />
                    </FormControl>

                    <Divider my={4} />

                    {/* Address Information */}
                    <Heading size="sm" mb={2}>
                      Address Information
                    </Heading>

                    <FormControl>
                      <FormLabel>Street Address</FormLabel>
                      <Input
                        placeholder="Enter street address"
                        defaultValue="123 Main Street"
                      />
                    </FormControl>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input
                          placeholder="Enter city"
                          defaultValue="Springfield"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>State</FormLabel>
                        <Select defaultValue="IL">
                          <option value="">Select state</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="CA">California</option>
                          <option value="FL">Florida</option>
                          <option value="IL">Illinois</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>ZIP Code</FormLabel>
                        <Input
                          placeholder="Enter ZIP code"
                          defaultValue="62701"
                        />
                      </FormControl>
                    </SimpleGrid>

                    {/* Action Buttons */}
                    <Flex justify="flex-end" gap={4} pt={4}>
                      <Button variant="outline">
                        Cancel
                      </Button>
                      <Button colorScheme="blue">
                        Save Changes
                      </Button>
                    </Flex>
                  </VStack>
                </Box>
              )}

              {activeSection === 'organization' && (
                <Box>
                  <Heading size="md" mb={2}>
                    Organization Details
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    Manage your organization information
                  </Text>
                  <Text color="gray.500">
                    Organization settings content will be displayed here...
                  </Text>
                </Box>
              )}

              {activeSection === 'notifications' && (
                <Box>
                  <Heading size="md" mb={2}>
                    Notification Preferences
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    Control how and when you receive notifications
                  </Text>
                  <Text color="gray.500">
                    Notification preferences content will be displayed here...
                  </Text>
                </Box>
              )}

              {activeSection === 'security' && (
                <Box>
                  <Heading size="md" mb={2}>
                    Security Settings
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    Manage your password and security preferences
                  </Text>
                  <Text color="gray.500">
                    Security settings content will be displayed here...
                  </Text>
                </Box>
              )}
            </CardBody>
          </Card>
        </Flex>
      </Container>
    </MainLayout>
  )
}
