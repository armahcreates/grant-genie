'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Avatar,
  Divider,
  List,
  ListItem,
  ListIcon,
  Flex,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiUser, FiBuilding, FiBell, FiLock } from 'react-icons/fi'
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
    { id: 'organization', icon: FiBuilding, label: 'Organization Details' },
    { id: 'notifications', icon: FiBell, label: 'Notification Preferences' },
    { id: 'security', icon: FiLock, label: 'Security Settings' },
  ]

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Profile Management</Heading>
          <Text color="gray.600">Manage your contact information and organization details</Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
          {/* Left Sidebar */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Profile Picture Section */}
              <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                <VStack spacing={4}>
                  <Avatar size="2xl" name="Sarah Johnson" />
                  <Button size="sm" leftIcon={<FiUser />}>
                    Change Photo
                  </Button>
                </VStack>
              </Box>

              {/* Navigation Menu */}
              <Box p={4} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                <List spacing={2}>
                  {menuItems.map((item) => (
                    <ListItem
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
                        <ListIcon as={item.icon} boxSize={5} />
                        <Text ml={2}>{item.label}</Text>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </VStack>
          </GridItem>

          {/* Main Content Area */}
          <GridItem>
            <Box p={8} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
              {activeTab === 'personal' && (
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={2}>Personal Information</Heading>
                    <Text color="gray.600" fontSize="sm">
                      Update your personal details and contact information
                    </Text>
                  </Box>

                  <Divider />

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <FormControl>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>

                  <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <FormControl>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Job Title</FormLabel>
                      <Input
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Grid>

                  <FormControl>
                    <FormLabel>Bio</FormLabel>
                    <Textarea
                      name="bio"
                      placeholder="Tell us about yourself and your role..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </FormControl>

                  <Box>
                    <Heading size="sm" mb={4}>Address Information</Heading>

                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>Street Address</FormLabel>
                        <Input
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                        />
                      </FormControl>

                      <Grid templateColumns={{ base: '1fr', md: '2fr 2fr 1fr' }} gap={4}>
                        <FormControl>
                          <FormLabel>City</FormLabel>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>State</FormLabel>
                          <Select
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
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>ZIP Code</FormLabel>
                          <Input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Grid>
                    </VStack>
                  </Box>

                  <HStack spacing={4} justify="flex-end" pt={4}>
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
