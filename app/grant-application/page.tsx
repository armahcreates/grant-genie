'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Field,
  Input,
  Textarea,
  NativeSelectRoot,
  NativeSelectField,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Card,
  IconButton,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FiUpload, FiPlus, FiTrash2 } from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'
import { useState } from 'react'

interface FormData {
  projectTitle: string
  organizationName: string
  departmentName: string
  grantCategory: string
  projectDescription: string
  personnelCosts: string
  equipmentCosts: string
  indirectCosts: string
  totalBudget: string
  budgetJustification: string
  projectStartDate: string
  projectEndDate: string
}

export default function GrantApplicationPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [milestones, setMilestones] = useState<string[]>([])
  const [deadlines, setDeadlines] = useState<string[]>([])
  const [currentMilestone, setCurrentMilestone] = useState('')
  const [currentDeadline, setCurrentDeadline] = useState('')

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', { ...data, milestones, deadlines })
    // Add your submission logic here
  }

  const handleSaveDraft = () => {
    console.log('Saving draft')
    // Add your save draft logic here
  }

  const addMilestone = () => {
    if (currentMilestone.trim()) {
      setMilestones([...milestones, currentMilestone])
      setCurrentMilestone('')
    }
  }

  const addDeadline = () => {
    if (currentDeadline.trim()) {
      setDeadlines([...deadlines, currentDeadline])
      setCurrentDeadline('')
    }
  }

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const removeDeadline = (index: number) => {
    setDeadlines(deadlines.filter((_, i) => i !== index))
  }

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={8} align="stretch">
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
            <Card.Root>
              <Card.Header>
                <Heading size="md">Basic Information</Heading>
              </Card.Header>
              <Card.Body>
                <VStack gap={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Field.Root required>
                      <Field.Label>Grant project title</Field.Label>
                      <Input
                        placeholder="Enter project title"
                        {...register('projectTitle', { required: true })}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Organization name</Field.Label>
                      <Input
                        placeholder="Enter organization name"
                        {...register('organizationName', { required: true })}
                      />
                    </Field.Root>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Field.Root required>
                      <Field.Label>Department name</Field.Label>
                      <Input
                        placeholder="Enter department name"
                        {...register('departmentName', { required: true })}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Grant category</Field.Label>
                      <NativeSelectRoot>
                        <NativeSelectField
                          placeholder="Select category"
                          {...register('grantCategory', { required: true })}
                        >
                          <option value="education">Education</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="environment">Environment</option>
                          <option value="community">Community Development</option>
                          <option value="arts">Arts & Culture</option>
                          <option value="research">Research</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field.Root>
                  </SimpleGrid>

                  <Field.Root required>
                    <Field.Label>Project description</Field.Label>
                    <Textarea
                      placeholder="Provide a detailed description of your project"
                      rows={6}
                      {...register('projectDescription', { required: true })}
                    />
                  </Field.Root>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Budget Breakdown */}
            <Card.Root>
              <Card.Header>
                <Heading size="md">Budget Breakdown</Heading>
              </Card.Header>
              <Card.Body>
                <VStack gap={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                    <Field.Root required>
                      <Field.Label>Personnel Costs</Field.Label>
                      <Input
                        type="number"
                        placeholder="$0.00"
                        {...register('personnelCosts', { required: true })}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Equipment Costs</Field.Label>
                      <Input
                        type="number"
                        placeholder="$0.00"
                        {...register('equipmentCosts', { required: true })}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Indirect Costs</Field.Label>
                      <Input
                        type="number"
                        placeholder="$0.00"
                        {...register('indirectCosts', { required: true })}
                      />
                    </Field.Root>
                  </SimpleGrid>

                  <Field.Root required>
                    <Field.Label>Total budget</Field.Label>
                    <Input
                      type="number"
                      placeholder="$0.00"
                      {...register('totalBudget', { required: true })}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Budget justification</Field.Label>
                    <Textarea
                      placeholder="Explain how funds will be used to support your project goals"
                      rows={6}
                      {...register('budgetJustification', { required: true })}
                    />
                  </Field.Root>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Project Timeline */}
            <Card.Root>
              <Card.Header>
                <Heading size="md">Project Timeline</Heading>
              </Card.Header>
              <Card.Body>
                <VStack gap={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Field.Root required>
                      <Field.Label>Project start date</Field.Label>
                      <Input
                        type="date"
                        {...register('projectStartDate', { required: true })}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Project end date</Field.Label>
                      <Input
                        type="date"
                        {...register('projectEndDate', { required: true })}
                      />
                    </Field.Root>
                  </SimpleGrid>

                  <Field.Root>
                    <Field.Label>Key Milestones</Field.Label>
                    <HStack>
                      <Textarea
                        placeholder="Add milestone description"
                        rows={2}
                        value={currentMilestone}
                        onChange={(e) => setCurrentMilestone(e.target.value)}
                      />
                      <IconButton
                        aria-label="Add milestone"
                        onClick={addMilestone}
                        colorScheme="blue"
                      >
                        <Icon as={FiPlus} />
                      </IconButton>
                    </HStack>
                    {milestones.length > 0 && (
                      <VStack mt={4} gap={2} align="stretch">
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
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => removeMilestone(index)}
                            >
                              <Icon as={FiTrash2} />
                            </IconButton>
                          </HStack>
                        ))}
                      </VStack>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Important deadlines</Field.Label>
                    <HStack>
                      <Textarea
                        placeholder="Add deadline description"
                        rows={2}
                        value={currentDeadline}
                        onChange={(e) => setCurrentDeadline(e.target.value)}
                      />
                      <IconButton
                        aria-label="Add deadline"
                        onClick={addDeadline}
                        colorScheme="blue"
                      >
                        <Icon as={FiPlus} />
                      </IconButton>
                    </HStack>
                    {deadlines.length > 0 && (
                      <VStack mt={4} gap={2} align="stretch">
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
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => removeDeadline(index)}
                            >
                              <Icon as={FiTrash2} />
                            </IconButton>
                          </HStack>
                        ))}
                      </VStack>
                    )}
                  </Field.Root>

                  <Button
                    variant="outline"
                    size="sm"
                    alignSelf="flex-start"
                    onClick={handleSaveDraft}
                    type="button"
                  >
                    Save as Draft
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Supporting Documents */}
            <Card.Root>
              <Card.Header>
                <Heading size="md">Supporting Documents</Heading>
              </Card.Header>
              <Card.Body>
                <VStack gap={4} align="stretch">
                  <Box
                    border="2px dashed"
                    borderColor="gray.200"
                    borderRadius="lg"
                    p={12}
                    textAlign="center"
                    cursor="pointer"
                    _hover={{ borderColor: 'blue.400', bg: 'blue.50' }}
                    transition="all 0.2s"
                  >
                    <VStack gap={3}>
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
              </Card.Body>
            </Card.Root>

            {/* Action Buttons */}
            <HStack gap={4} justify="flex-end">
              <Button variant="outline" size="lg" type="button">
                Cancel
              </Button>
              <Button colorScheme="blue" size="lg" type="submit">
                Submit Application
              </Button>
            </HStack>
          </VStack>
        </form>
      </Container>
    </MainLayout>
  )
}
