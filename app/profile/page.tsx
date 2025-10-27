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
  Switch,
  Card,
  Badge,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiUser, FiBell, FiLock, FiShield, FiMail, FiSmartphone, FiGlobe } from 'react-icons/fi'
import { MdBusiness } from 'react-icons/md'
import MainLayout from '@/components/layout/MainLayout'
import { useAppToast } from '@/lib/utils/toast'

export default function ProfilePage() {
  const toast = useAppToast()
  const [activeTab, setActiveTab] = useState('personal')
  const [isSaving, setIsSaving] = useState(false)
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
    // Organization
    orgName: 'Nonprofit Organization',
    orgType: 'nonprofit',
    taxId: '12-3456789',
    orgWebsite: 'https://nonprofit.org',
    orgPhone: '+1 (555) 987-6543',
    orgEmail: 'contact@nonprofit.org',
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    deadlineReminders: true,
    complianceAlerts: true,
    grantMatches: true,
    weeklyDigest: true,
  })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/user/profile', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (!response.ok) throw new Error('Failed to save')

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast.success('Profile updated successfully', 'Your changes have been saved')
    } catch (error) {
      toast.error('Failed to save profile', 'Please try again')
    } finally {
      setIsSaving(false)
    }
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
          <Heading size="lg" mb={2} color="purple.900">Profile Management</Heading>
          <Text color="purple.800">Manage your contact information and organization details</Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
          {/* Left Sidebar */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* Profile Picture Section */}
              <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                <VStack gap={4}>
                  <Avatar.Root size="2xl" bg="purple.500">
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
                      bg={activeTab === item.id ? 'purple.50' : 'transparent'}
                      color={activeTab === item.id ? 'purple.600' : 'purple.800'}
                      fontWeight={activeTab === item.id ? 'semibold' : 'normal'}
                      _hover={{ bg: activeTab === item.id ? 'purple.50' : 'gray.50' }}
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
                    <Heading size="md" mb={2} color="purple.900">Personal Information</Heading>
                    <Text color="purple.700" fontSize="sm">
                      Update your personal details and contact information
                    </Text>
                  </Box>

                  <Separator />

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <Field.Root>
                      <Field.Label color="purple.900" fontWeight="medium">First Name</Field.Label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        color="purple.900"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label color="purple.900" fontWeight="medium">Last Name</Field.Label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        color="purple.900"
                      />
                    </Field.Root>
                  </Grid>

                  <Field.Root>
                    <Field.Label color="purple.900" fontWeight="medium">Email Address</Field.Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      color="purple.900"
                    />
                  </Field.Root>

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <Field.Root>
                      <Field.Label color="purple.900" fontWeight="medium">Phone Number</Field.Label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        color="purple.900"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label color="purple.900" fontWeight="medium">Job Title</Field.Label>
                      <Input
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        color="purple.900"
                      />
                    </Field.Root>
                  </Grid>

                  <Field.Root>
                    <Field.Label color="purple.900" fontWeight="medium">Bio</Field.Label>
                    <Textarea
                      name="bio"
                      placeholder="Tell us about yourself and your role..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      color="purple.900"
                      _placeholder={{ color: 'gray.500' }}
                    />
                  </Field.Root>

                  <Box>
                    <Heading size="sm" mb={4} color="purple.900">Address Information</Heading>

                    <VStack gap={4} align="stretch">
                      <Field.Root>
                        <Field.Label color="purple.900" fontWeight="medium">Street Address</Field.Label>
                        <Input
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                          color="purple.900"
                        />
                      </Field.Root>

                      <Grid templateColumns={{ base: '1fr', md: '2fr 2fr 1fr' }} gap={4}>
                        <Field.Root>
                          <Field.Label color="purple.900" fontWeight="medium">City</Field.Label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            color="purple.900"
                          />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label color="purple.900" fontWeight="medium">State</Field.Label>
                          <NativeSelectRoot>
                            <NativeSelectField
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              color="purple.900"
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
                          <Field.Label color="purple.900" fontWeight="medium">ZIP Code</Field.Label>
                          <Input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            color="purple.900"
                          />
                        </Field.Root>
                      </Grid>
                    </VStack>
                  </Box>

                  <HStack gap={4} justify="flex-end" pt={4}>
                    <Button variant="outline" disabled={isSaving}>Cancel</Button>
                    <Button
                      colorScheme="purple"
                      onClick={handleSave}
                      loading={isSaving}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </HStack>
                </VStack>
              )}

              {activeTab === 'organization' && (
                <VStack gap={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={2} color="purple.900">Organization Details</Heading>
                    <Text color="purple.700" fontSize="sm">
                      Manage your organization's information and settings
                    </Text>
                  </Box>

                  <Separator />

                  <Field.Root>
                    <Field.Label color="purple.900" fontWeight="medium">Organization Name</Field.Label>
                    <Input
                      name="orgName"
                      value={formData.orgName}
                      onChange={handleInputChange}
                      color="purple.900"
                    />
                  </Field.Root>

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <Field.Root>
                      <Field.Label color="purple.900" fontWeight="medium">Organization Type</Field.Label>
                      <NativeSelectRoot>
                        <NativeSelectField
                          name="orgType"
                          value={formData.orgType}
                          onChange={handleInputChange}
                          color="purple.900"
                        >
                          <option value="nonprofit">Nonprofit Organization</option>
                          <option value="educational">Educational Institution</option>
                          <option value="government">Government Agency</option>
                          <option value="research">Research Institution</option>
                          <option value="community">Community Organization</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label color="purple.900" fontWeight="medium">Tax ID / EIN</Field.Label>
                      <Input
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleInputChange}
                        color="purple.900"
                        placeholder="XX-XXXXXXX"
                      />
                    </Field.Root>
                  </Grid>

                  <Field.Root>
                    <Field.Label color="purple.900" fontWeight="medium">Organization Website</Field.Label>
                    <Input
                      name="orgWebsite"
                      type="url"
                      value={formData.orgWebsite}
                      onChange={handleInputChange}
                      color="purple.900"
                      placeholder="https://yourorganization.org"
                    />
                  </Field.Root>

                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <Field.Root>
                      <Field.Label color="purple.900" fontWeight="medium">Organization Phone</Field.Label>
                      <Input
                        name="orgPhone"
                        type="tel"
                        value={formData.orgPhone}
                        onChange={handleInputChange}
                        color="purple.900"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label color="purple.900" fontWeight="medium">Organization Email</Field.Label>
                      <Input
                        name="orgEmail"
                        type="email"
                        value={formData.orgEmail}
                        onChange={handleInputChange}
                        color="purple.900"
                      />
                    </Field.Root>
                  </Grid>

                  <Card.Root variant="outline" borderColor="purple.200" bg="purple.50">
                    <Card.Body>
                      <HStack gap={3}>
                        <Icon as={FiShield} boxSize={5} color="purple.600" />
                        <Box flex={1}>
                          <Text fontWeight="semibold" color="purple.900" mb={1}>Verification Status</Text>
                          <Text fontSize="sm" color="purple.700">
                            Your organization is verified. This helps you access exclusive grant opportunities.
                          </Text>
                        </Box>
                        <Badge colorScheme="green" size="lg">Verified</Badge>
                      </HStack>
                    </Card.Body>
                  </Card.Root>

                  <HStack gap={4} justify="flex-end" pt={4}>
                    <Button variant="outline" disabled={isSaving}>Cancel</Button>
                    <Button
                      colorScheme="purple"
                      onClick={handleSave}
                      loading={isSaving}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </HStack>
                </VStack>
              )}

              {activeTab === 'notifications' && (
                <VStack gap={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={2} color="purple.900">Notification Preferences</Heading>
                    <Text color="purple.700" fontSize="sm">
                      Choose how and when you want to be notified about grant activities
                    </Text>
                  </Box>

                  <Separator />

                  <Box>
                    <Heading size="sm" mb={4} color="purple.900">Notification Channels</Heading>
                    <VStack gap={4} align="stretch">
                      <HStack justify="space-between" p={4} border="1px" borderColor="gray.200" borderRadius="md">
                        <HStack gap={3}>
                          <Icon as={FiMail} boxSize={5} color="purple.600" />
                          <Box>
                            <Text fontWeight="medium" color="purple.900">Email Notifications</Text>
                            <Text fontSize="sm" color="purple.700">Receive updates via email</Text>
                          </Box>
                        </HStack>
                        <Switch.Root
                          checked={formData.emailNotifications}
                          onCheckedChange={(e: any) => setFormData(prev => ({ ...prev, emailNotifications: !!e.checked }))}
                        >
                          <Switch.Thumb />
                        </Switch.Root>
                      </HStack>

                      <HStack justify="space-between" p={4} border="1px" borderColor="gray.200" borderRadius="md">
                        <HStack gap={3}>
                          <Icon as={FiBell} boxSize={5} color="purple.600" />
                          <Box>
                            <Text fontWeight="medium" color="purple.900">Push Notifications</Text>
                            <Text fontSize="sm" color="purple.700">Get instant alerts in your browser</Text>
                          </Box>
                        </HStack>
                        <Switch.Root
                          checked={formData.pushNotifications}
                          onCheckedChange={(e: any) => setFormData(prev => ({ ...prev, pushNotifications: !!e.checked }))}
                        >
                          <Switch.Thumb />
                        </Switch.Root>
                      </HStack>

                      <HStack justify="space-between" p={4} border="1px" borderColor="gray.200" borderRadius="md">
                        <HStack gap={3}>
                          <Icon as={FiSmartphone} boxSize={5} color="purple.600" />
                          <Box>
                            <Text fontWeight="medium" color="purple.900">SMS Notifications</Text>
                            <Text fontSize="sm" color="purple.700">Text messages for urgent updates</Text>
                          </Box>
                        </HStack>
                        <Switch.Root
                          checked={formData.smsNotifications}
                          onCheckedChange={(e: any) => setFormData(prev => ({ ...prev, smsNotifications: !!e.checked }))}
                        >
                          <Switch.Thumb />
                        </Switch.Root>
                      </HStack>
                    </VStack>
                  </Box>

                  <Separator />

                  <Box>
                    <Heading size="sm" mb={4} color="purple.900">Alert Types</Heading>
                    <VStack gap={3} align="stretch">
                      <HStack justify="space-between" p={3} _hover={{ bg: 'gray.50' }} borderRadius="md">
                        <Text color="purple.900">Deadline Reminders</Text>
                        <Switch.Root
                          checked={formData.deadlineReminders}
                          onCheckedChange={(e: any) => setFormData(prev => ({ ...prev, deadlineReminders: !!e.checked }))}
                        >
                          <Switch.Thumb />
                        </Switch.Root>
                      </HStack>

                      <HStack justify="space-between" p={3} _hover={{ bg: 'gray.50' }} borderRadius="md">
                        <Text color="purple.900">Compliance Alerts</Text>
                        <Switch.Root
                          checked={formData.complianceAlerts}
                          onCheckedChange={(e: any) => setFormData(prev => ({ ...prev, complianceAlerts: !!e.checked }))}
                        >
                          <Switch.Thumb />
                        </Switch.Root>
                      </HStack>

                      <HStack justify="space-between" p={3} _hover={{ bg: 'gray.50' }} borderRadius="md">
                        <Text color="purple.900">New Grant Matches</Text>
                        <Switch.Root
                          checked={formData.grantMatches}
                          onCheckedChange={(e: any) => setFormData(prev => ({ ...prev, grantMatches: !!e.checked }))}
                        >
                          <Switch.Thumb />
                        </Switch.Root>
                      </HStack>

                      <HStack justify="space-between" p={3} _hover={{ bg: 'gray.50' }} borderRadius="md">
                        <Text color="purple.900">Weekly Activity Digest</Text>
                        <Switch.Root
                          checked={formData.weeklyDigest}
                          onCheckedChange={(e: any) => setFormData(prev => ({ ...prev, weeklyDigest: !!e.checked }))}
                        >
                          <Switch.Thumb />
                        </Switch.Root>
                      </HStack>
                    </VStack>
                  </Box>

                  <HStack gap={4} justify="flex-end" pt={4}>
                    <Button variant="outline" disabled={isSaving}>Reset to Default</Button>
                    <Button
                      colorScheme="purple"
                      onClick={handleSave}
                      loading={isSaving}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </HStack>
                </VStack>
              )}

              {activeTab === 'security' && (
                <VStack gap={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={2} color="purple.900">Security Settings</Heading>
                    <Text color="purple.700" fontSize="sm">
                      Manage your account security and authentication methods
                    </Text>
                  </Box>

                  <Separator />

                  <Box>
                    <Heading size="sm" mb={4} color="purple.900">Change Password</Heading>
                    <VStack gap={4} align="stretch">
                      <Field.Root>
                        <Field.Label color="purple.900" fontWeight="medium">Current Password</Field.Label>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          color="purple.900"
                          _placeholder={{ color: 'gray.500' }}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label color="purple.900" fontWeight="medium">New Password</Field.Label>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          color="purple.900"
                          _placeholder={{ color: 'gray.500' }}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label color="purple.900" fontWeight="medium">Confirm New Password</Field.Label>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          color="purple.900"
                          _placeholder={{ color: 'gray.500' }}
                        />
                      </Field.Root>

                      <Button colorScheme="purple" alignSelf="flex-start">
                        Update Password
                      </Button>
                    </VStack>
                  </Box>

                  <Separator />

                  <Box>
                    <Heading size="sm" mb={4} color="purple.900">Two-Factor Authentication</Heading>
                    <Card.Root variant="outline" borderColor={twoFactorEnabled ? 'green.200' : 'gray.200'} bg={twoFactorEnabled ? 'green.50' : 'white'}>
                      <Card.Body>
                        <HStack justify="space-between" mb={4}>
                          <HStack gap={3}>
                            <Icon as={FiShield} boxSize={6} color={twoFactorEnabled ? 'green.600' : 'gray.600'} />
                            <Box>
                              <Text fontWeight="semibold" color="purple.900" mb={1}>
                                {twoFactorEnabled ? 'Enabled' : 'Not Enabled'}
                              </Text>
                              <Text fontSize="sm" color="purple.700">
                                Add an extra layer of security to your account
                              </Text>
                            </Box>
                          </HStack>
                          <Switch.Root
                            checked={twoFactorEnabled}
                            onCheckedChange={(e: any) => setTwoFactorEnabled(!!e.checked)}
                          >
                            <Switch.Thumb />
                          </Switch.Root>
                        </HStack>

                        {twoFactorEnabled && (
                          <VStack gap={3} align="stretch" pt={3} borderTop="1px" borderColor="gray.200">
                            <Text fontSize="sm" color="purple.700">
                              Two-factor authentication is active. You'll need to enter a code from your authenticator app when signing in.
                            </Text>
                            <HStack gap={2}>
                              <Button size="sm" variant="outline">
                                View Recovery Codes
                              </Button>
                              <Button size="sm" variant="outline">
                                Reset 2FA
                              </Button>
                            </HStack>
                          </VStack>
                        )}
                      </Card.Body>
                    </Card.Root>
                  </Box>

                  <Separator />

                  <Box>
                    <Heading size="sm" mb={4} color="purple.900">Active Sessions</Heading>
                    <VStack gap={3} align="stretch">
                      <HStack justify="space-between" p={4} border="1px" borderColor="gray.200" borderRadius="md">
                        <HStack gap={3}>
                          <Icon as={FiGlobe} boxSize={5} color="purple.600" />
                          <Box>
                            <Text fontWeight="medium" color="purple.900">Current Session</Text>
                            <Text fontSize="sm" color="purple.700">Springfield, IL • Chrome on Windows</Text>
                          </Box>
                        </HStack>
                        <Badge colorScheme="green">Active Now</Badge>
                      </HStack>

                      <HStack justify="space-between" p={4} border="1px" borderColor="gray.200" borderRadius="md">
                        <HStack gap={3}>
                          <Icon as={FiSmartphone} boxSize={5} color="purple.600" />
                          <Box>
                            <Text fontWeight="medium" color="purple.900">Mobile Device</Text>
                            <Text fontSize="sm" color="purple.700">Last active 2 hours ago</Text>
                          </Box>
                        </HStack>
                        <Button size="sm" variant="outline" colorScheme="red">
                          Revoke
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>

                  <Card.Root variant="outline" borderColor="red.200" bg="red.50">
                    <Card.Body>
                      <Heading size="sm" color="red.800" mb={2}>Danger Zone</Heading>
                      <Text fontSize="sm" color="red.700" mb={4}>
                        Once you delete your account, there is no going back. Please be certain.
                      </Text>
                      <Button size="sm" colorScheme="red" variant="outline">
                        Delete Account
                      </Button>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              )}
            </Box>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
    </MainLayout>
  )
}
