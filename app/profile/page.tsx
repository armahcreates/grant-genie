'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Field,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Avatar,
  Separator,
  Icon,
  Flex,
  NativeSelectRoot,
  NativeSelectField,
  List,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiUser, FiBell, FiLock } from 'react-icons/fi'
import { MdBusiness } from 'react-icons/md'
import MainLayout from '@/components/layout/MainLayout'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal')
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@nonprofit9.org',
    phone: '+1 (555) 123-4667',
    jobTitle: 'Program Director',
    bio: '',
    streetAddress: '123 Main Street',
    city: 'Springfield',
    state: 'Illinois',
    zipCode: '62701',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    console.log('Saving changes:', formData)
    // Add your save logic here
  }

  const menuItems = [
    { id: 'personal', icon: FiUser, label: 'Personal Information' },
    { id: 'organization', icon: MdBusiness, label: 'Organization Details' },
    { id: 'notifications', icon: FiBell, label: 'Notification Preferences' },
    { id: 'security', icon: FiLock, label: 'Security Settings' },
  ]

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
      <VStack gap={6} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Profile Management</Heading>
          <Text color="gray.600">Manage your contact information and organization details</Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
          {/* Left Sidebar */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* Profile Picture Section */}
              <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                <VStack gap={4}>
                  <Avatar.Root size="2xl" bg="blue.500">
                    <Avatar.Fallback>SJ</Avatar.Fallback>
                  </Avatar.Root>
                  <Button size="sm">
                    <Icon as={FiUser} />
                    Change Photo
                  </Button>
                </VStack>
              </Box>

              {/* Navigation Menu */}
              <Box p={4} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                <List.Root gap={2}>
                  {menuItems.map((item) => (
                    <List.Item
                      key={item.id}
                      p={3}
                      borderRadius="md"
                      cursor="pointer"
                      bg={activeTab === item.id ? 'blue.50' : 'transparent'}
                      color={activeTab === item.id ? 'blue.600' : 'gray.700'}
                      fontWeight={activeTab === item.id ? 'semibold' : 'normal'}
                      _hover={{ bg: activeTab === item.id ? 'blue.50' : 'gray.50' }}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <Flex align="center">
                        <Icon as={item.icon} boxSize={5} mr={2} />
                        <Text>{item.label}</Text>
                      </Flex>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            </VStack>
          </GridItem>

          {/* Main Content Area */}
          <GridItem>
            <Box p={8} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
              {activeTab === 'personal' && (
                <VStack gap={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={2}>Personal Information</Heading>
                    <Text color="gray.600" fontSize="sm">
                      Update your personal details and contact information
                    </Text>
                  </Box>

                  <Separator />

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <Field.Root>
                      <Field.Label>First Name</Field.Label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Last Name</Field.Label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </Field.Root>
                  </Grid>

                  <Field.Root>
                    <Field.Label>Email Address</Field.Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Field.Root>

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <Field.Root>
                      <Field.Label>Phone Number</Field.Label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Job Title</Field.Label>
                      <Input
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                      />
                    </Field.Root>
                  </Grid>

                  <Field.Root>
                    <Field.Label>Bio</Field.Label>
                    <Textarea
                      name="bio"
                      placeholder="Tell us about yourself and your role..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </Field.Root>

                  <Box>
                    <Heading size="sm" mb={4}>Address Information</Heading>

                    <VStack gap={4} align="stretch">
                      <Field.Root>
                        <Field.Label>Street Address</Field.Label>
                        <Input
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                        />
                      </Field.Root>

                      <Grid templateColumns={{ base: '1fr', md: '2fr 2fr 1fr' }} gap={4}>
                        <Field.Root>
                          <Field.Label>City</Field.Label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label>State</Field.Label>
                          <NativeSelectRoot>
                            <NativeSelectField
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                            >
                              <option value="Illinois">Illinois</option>
                              <option value="California">California</option>
                              <option value="New York">New York</option>
                              <option value="Texas">Texas</option>
                              <option value="Florida">Florida</option>
                              {/* Add more states as needed */}
                            </NativeSelectField>
                          </NativeSelectRoot>
                        </Field.Root>

                        <Field.Root>
                          <Field.Label>ZIP Code</Field.Label>
                          <Input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                          />
                        </Field.Root>
                      </Grid>
                    </VStack>
                  </Box>

                  <HStack gap={4} justify="flex-end" pt={4}>
                    <Button variant="outline">Cancel</Button>
                    <Button colorScheme="blue" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </HStack>
                </VStack>
              )}

              {activeTab === 'organization' && (
                <Box>
                  <Heading size="md" mb={4}>Organization Details</Heading>
                  <Text color="gray.600">Organization settings will be displayed here.</Text>
                </Box>
              )}

              {activeTab === 'notifications' && (
                <Box>
                  <Heading size="md" mb={4}>Notification Preferences</Heading>
                  <Text color="gray.600">Notification settings will be displayed here.</Text>
                </Box>
              )}

              {activeTab === 'security' && (
                <Box>
                  <Heading size="md" mb={4}>Security Settings</Heading>
                  <Text color="gray.600">Security settings will be displayed here.</Text>
                </Box>
              )}
            </Box>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
    </MainLayout>
  )
}
