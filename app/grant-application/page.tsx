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
  SimpleGrid,
  Divider,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  IconButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiUpload, FiCalendar, FiPlus, FiTrash2 } from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'

export default function GrantApplicationPage() {
  const [formData, setFormData] = useState({
    projectTitle: '',
    organizationName: '',
    departmentName: '',
    grantCategory: '',
    projectDescription: '',
    personnelCosts: '',
    equipmentCosts: '',
    indirectCosts: '',
    totalBudget: '',
    budgetJustification: '',
    projectStartDate: '',
    projectEndDate: '',
    keyMilestones: '',
    importantDeadlines: '',
  })

  const [milestones, setMilestones] = useState<string[]>([])
  const [deadlines, setDeadlines] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData)
    // Add your save draft logic here
  }

  const addMilestone = () => {
    if (formData.keyMilestones.trim()) {
      setMilestones([...milestones, formData.keyMilestones])
      setFormData(prev => ({ ...prev, keyMilestones: '' }))
    }
  }

  const addDeadline = () => {
    if (formData.importantDeadlines.trim()) {
      setDeadlines([...deadlines, formData.importantDeadlines])
      setFormData(prev => ({ ...prev, importantDeadlines: '' }))
    }
  }

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const removeDeadline = (index: number) => {
    setDeadlines(deadlines.filter((_, i) => i !== index))
  }

  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2}>
              Create New Grant Application
            </Heading>
            <Text color="gray.600">
              Fill out the form below to start a new grant application. All required fields must be completed.
            </Text>
          </Box>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <Heading size="md">Basic Information</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Grant project title</FormLabel>
                    <Input
                      name="projectTitle"
                      placeholder="Enter project title"
                      value={formData.projectTitle}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Organization name</FormLabel>
                    <Input
                      name="organizationName"
                      placeholder="Enter organization name"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Department name</FormLabel>
                    <Input
                      name="departmentName"
                      placeholder="Enter department name"
                      value={formData.departmentName}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Grant category</FormLabel>
                    <Select
                      name="grantCategory"
                      placeholder="Select category"
                      value={formData.grantCategory}
                      onChange={handleInputChange}
                    >
                      <option value="education">Education</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="environment">Environment</option>
                      <option value="community">Community Development</option>
                      <option value="arts">Arts & Culture</option>
                      <option value="research">Research</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Project description</FormLabel>
                  <Textarea
                    name="projectDescription"
                    placeholder="Provide a detailed description of your project"
                    rows={6}
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* Budget Breakdown */}
          <Card>
            <CardHeader>
              <Heading size="md">Budget Breakdown</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Personnel Costs</FormLabel>
                    <Input
                      name="personnelCosts"
                      type="number"
                      placeholder="$0.00"
                      value={formData.personnelCosts}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Equipment Costs</FormLabel>
                    <Input
                      name="equipmentCosts"
                      type="number"
                      placeholder="$0.00"
                      value={formData.equipmentCosts}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Indirect Costs</FormLabel>
                    <Input
                      name="indirectCosts"
                      type="number"
                      placeholder="$0.00"
                      value={formData.indirectCosts}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Total budget</FormLabel>
                  <Input
                    name="totalBudget"
                    type="number"
                    placeholder="$0.00"
                    value={formData.totalBudget}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Budget justification</FormLabel>
                  <Textarea
                    name="budgetJustification"
                    placeholder="Explain how funds will be used to support your project goals"
                    rows={6}
                    value={formData.budgetJustification}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* Project Timeline */}
          <Card>
            <CardHeader>
              <Heading size="md">Project Timeline</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Project start date</FormLabel>
                    <Input
                      name="projectStartDate"
                      type="date"
                      value={formData.projectStartDate}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Project end date</FormLabel>
                    <Input
                      name="projectEndDate"
                      type="date"
                      value={formData.projectEndDate}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel>Key Milestones</FormLabel>
                  <HStack>
                    <Textarea
                      name="keyMilestones"
                      placeholder="Add milestone description"
                      rows={2}
                      value={formData.keyMilestones}
                      onChange={handleInputChange}
                    />
                    <IconButton
                      aria-label="Add milestone"
                      icon={<Icon as={FiPlus} />}
                      onClick={addMilestone}
                      colorScheme="blue"
                    />
                  </HStack>
                  {milestones.length > 0 && (
                    <VStack mt={4} spacing={2} align="stretch">
                      {milestones.map((milestone, index) => (
                        <HStack
                          key={index}
                          p={3}
                          bg="gray.50"
                          borderRadius="md"
                          justify="space-between"
                        >
                          <Text>{milestone}</Text>
                          <IconButton
                            aria-label="Remove milestone"
                            icon={<Icon as={FiTrash2} />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => removeMilestone(index)}
                          />
                        </HStack>
                      ))}
                    </VStack>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Important deadlines</FormLabel>
                  <HStack>
                    <Textarea
                      name="importantDeadlines"
                      placeholder="Add deadline description"
                      rows={2}
                      value={formData.importantDeadlines}
                      onChange={handleInputChange}
                    />
                    <IconButton
                      aria-label="Add deadline"
                      icon={<Icon as={FiPlus} />}
                      onClick={addDeadline}
                      colorScheme="blue"
                    />
                  </HStack>
                  {deadlines.length > 0 && (
                    <VStack mt={4} spacing={2} align="stretch">
                      {deadlines.map((deadline, index) => (
                        <HStack
                          key={index}
                          p={3}
                          bg="gray.50"
                          borderRadius="md"
                          justify="space-between"
                        >
                          <Text>{deadline}</Text>
                          <IconButton
                            aria-label="Remove deadline"
                            icon={<Icon as={FiTrash2} />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => removeDeadline(index)}
                          />
                        </HStack>
                      ))}
                    </VStack>
                  )}
                </FormControl>

                <Button
                  variant="outline"
                  size="sm"
                  alignSelf="flex-start"
                  onClick={handleSaveDraft}
                >
                  Save as Draft
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {/* Supporting Documents */}
          <Card>
            <CardHeader>
              <Heading size="md">Supporting Documents</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box
                  border="2px dashed"
                  borderColor={borderColor}
                  borderRadius="lg"
                  p={12}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ borderColor: 'blue.400', bg: 'blue.50' }}
                  transition="all 0.2s"
                >
                  <VStack spacing={3}>
                    <Icon as={FiUpload} boxSize={12} color="gray.400" />
                    <Text fontWeight="medium" color="gray.700">
                      Drag and drop files here, or click to browse
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Supported file types: PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                    </Text>
                  </VStack>
                </Box>

                <Text fontSize="sm" color="gray.600">
                  Attachments can include: <strong>Budget spreadsheets, Letters of support, Project timeline documents</strong>
                </Text>
              </VStack>
            </CardBody>
          </Card>

          {/* Action Buttons */}
          <HStack spacing={4} justify="flex-end">
            <Button variant="outline" size="lg">
              Cancel
            </Button>
            <Button colorScheme="blue" size="lg">
              Submit Application
            </Button>
          </HStack>
        </VStack>
      </Container>
    </MainLayout>
  )
}
