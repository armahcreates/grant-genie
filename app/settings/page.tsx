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
  Field,
  Input,
  Textarea,
  Icon,
  SimpleGrid,
  NativeSelectRoot,
  NativeSelectField,
  Avatar,
  Separator,
  Card,
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
  return (
    <Button
      variant="ghost"
      justifyContent="flex-start"
      w="full"
      bg={isActive ? 'blue.50' : 'transparent'}
      color={isActive ? 'blue.600' : 'inherit'}
      fontWeight={isActive ? 'semibold' : 'medium'}
      _hover={{ bg: isActive ? 'blue.50' : 'gray.100' }}
      onClick={onClick}
    >
      <Icon as={icon} />
      {label}
    </Button>
  )
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('personal')

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
          <Card.Root
            w={{ base: 'full', lg: '280px' }}
            h="fit-content"
            flexShrink={0}
          >
            <Card.Body p={4}>
              <VStack gap={2} align="stretch">
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
            </Card.Body>
          </Card.Root>

          {/* Main Content Area */}
          <Card.Root flex={1}>
            <Card.Body p={8}>
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
                    <Avatar.Root size="xl" bg="blue.500">
                      <Avatar.Fallback>SJ</Avatar.Fallback>
                    </Avatar.Root>
                    <Button variant="outline" size="sm">
                      <Icon as={MdCamera} />
                      Change Photo
                    </Button>
                  </Flex>

                  <VStack gap={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                      <Field.Root>
                        <Field.Label>First Name</Field.Label>
                        <Input
                          placeholder="Enter first name"
                          defaultValue="Sarah"
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Last Name</Field.Label>
                        <Input
                          placeholder="Enter last name"
                          defaultValue="Johnson"
                        />
                      </Field.Root>
                    </SimpleGrid>

                    <Field.Root>
                      <Field.Label>Email Address</Field.Label>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        defaultValue="sarah.johnson@nonprofit6.org"
                      />
                    </Field.Root>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                      <Field.Root>
                        <Field.Label>Phone Number</Field.Label>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          defaultValue="+1 (555) 123-4567"
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Job Title</Field.Label>
                        <Input
                          placeholder="Enter job title"
                          defaultValue="Program Director"
                        />
                      </Field.Root>
                    </SimpleGrid>

                    <Field.Root>
                      <Field.Label>Bio</Field.Label>
                      <Textarea
                        placeholder="Tell us about yourself and your role..."
                        rows={4}
                      />
                    </Field.Root>

                    <Separator my={4} />

                    {/* Address Information */}
                    <Heading size="sm" mb={2}>
                      Address Information
                    </Heading>

                    <Field.Root>
                      <Field.Label>Street Address</Field.Label>
                      <Input
                        placeholder="Enter street address"
                        defaultValue="123 Main Street"
                      />
                    </Field.Root>

                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                      <Field.Root>
                        <Field.Label>City</Field.Label>
                        <Input
                          placeholder="Enter city"
                          defaultValue="Springfield"
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>State</Field.Label>
                        <NativeSelectRoot>
                          <NativeSelectField defaultValue="IL">
                            <option value="">Select state</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="CA">California</option>
                            <option value="FL">Florida</option>
                            <option value="IL">Illinois</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                          </NativeSelectField>
                        </NativeSelectRoot>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>ZIP Code</Field.Label>
                        <Input
                          placeholder="Enter ZIP code"
                          defaultValue="62701"
                        />
                      </Field.Root>
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
            </Card.Body>
          </Card.Root>
        </Flex>
      </Container>
    </MainLayout>
  )
}
