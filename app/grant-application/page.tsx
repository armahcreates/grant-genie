'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Card,
  Badge,
  Textarea,
  IconButton,
} from '@chakra-ui/react'
import { useState, useRef, DragEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  FiUpload,
  FiFileText,
  FiArrowRight,
  FiLoader,
  FiX,
  FiFile,
  FiAlertCircle,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'
import { useGrantGenieStore } from '@/lib/store'
import { useAppToast } from '@/lib/utils/toast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

// File type validation
const ALLOWED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
}
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

interface UploadedFile {
  file: File
  id: string
}

export default function GrantGeniePage() {
  const router = useRouter()
  const toast = useAppToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { formData, setFormData } = useGrantGenieStore()
  
  // File upload state
  const [rfpFiles, setRfpFiles] = useState<UploadedFile[]>([])
  const [teachingFiles, setTeachingFiles] = useState<UploadedFile[]>([])
  const [isDraggingRfp, setIsDraggingRfp] = useState(false)
  const [isDraggingTeaching, setIsDraggingTeaching] = useState(false)
  
  const rfpInputRef = useRef<HTMLInputElement>(null)
  const teachingInputRef = useRef<HTMLInputElement>(null)

  // File validation
  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File "${file.name}" is too large. Maximum size is 10MB.`
    }
    
    const fileType = file.type
    if (!Object.keys(ALLOWED_FILE_TYPES).includes(fileType)) {
      return `File "${file.name}" has an unsupported format. Please upload PDF, DOC, DOCX, or TXT files.`
    }
    
    return null
  }

  // Handle file selection
  const handleFileSelect = (files: FileList | null, type: 'rfp' | 'teaching') => {
    if (!files) return
    
    const newErrors = { ...errors }
    delete newErrors[`${type}Files`]
    
    const validFiles: UploadedFile[] = []
    
    Array.from(files).forEach((file) => {
      const error = validateFile(file)
      if (error) {
        newErrors[`${type}Files`] = error
        toast.fileUploadError(error)
      } else {
        validFiles.push({
          file,
          id: `${Date.now()}-${Math.random()}`,
        })
      }
    })
    
    setErrors(newErrors)
    
    if (type === 'rfp') {
      setRfpFiles((prev) => [...prev, ...validFiles])
    } else {
      setTeachingFiles((prev) => [...prev, ...validFiles])
    }
    
    // Show success toast for valid files
    if (validFiles.length > 0) {
      if (validFiles.length === 1) {
        toast.fileUploadSuccess(validFiles[0].file.name)
      } else {
        toast.success(`${validFiles.length} files uploaded successfully`, 'Upload Complete')
      }
    }
  }

  // Handle drag and drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>, type: 'rfp' | 'teaching') => {
    e.preventDefault()
    if (type === 'rfp') {
      setIsDraggingRfp(true)
    } else {
      setIsDraggingTeaching(true)
    }
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>, type: 'rfp' | 'teaching') => {
    e.preventDefault()
    if (type === 'rfp') {
      setIsDraggingRfp(false)
    } else {
      setIsDraggingTeaching(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, type: 'rfp' | 'teaching') => {
    e.preventDefault()
    if (type === 'rfp') {
      setIsDraggingRfp(false)
    } else {
      setIsDraggingTeaching(false)
    }
    handleFileSelect(e.dataTransfer.files, type)
  }

  // Remove file
  const removeFile = (id: string, type: 'rfp' | 'teaching') => {
    if (type === 'rfp') {
      setRfpFiles((prev) => prev.filter((f) => f.id !== id))
    } else {
      setTeachingFiles((prev) => prev.filter((f) => f.id !== id))
    }
  }

  // Field validation
  const validateField = (field: string, value: string): string | null => {
    if (field === 'projectName' && !value.trim()) {
      return 'Project/Program Name is required'
    }
    if (field === 'funderName' && !value.trim()) {
      return 'Funder Name is required'
    }
    return null
  }

  // Handle field change with validation
  const handleFieldChange = (field: string, value: string) => {
    setFormData({ [field]: value })
    
    const error = validateField(field, value)
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[field] = error
      } else {
        delete newErrors[field]
      }
      return newErrors
    })
  }

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.projectName?.trim() &&
      formData.funderName?.trim() &&
      Object.keys(errors).length === 0
    )
  }

  const handleGenerate = async () => {
    // Validate all required fields
    const newErrors: Record<string, string> = {}
    
    if (!formData.projectName?.trim()) {
      newErrors.projectName = 'Project/Program Name is required'
    }
    if (!formData.funderName?.trim()) {
      newErrors.funderName = 'Funder Name is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please fill in all required fields', 'Validation Error')
      return
    }

    setIsGenerating(true)
    setErrors({})

    try {
      // Navigate to proposal page which will generate the content
      // Form data is already in Zustand store with persistence
      toast.success('Generating your grant proposal...', 'Generation Started')
      router.push('/grant-application/proposal')
    } catch (err) {
      const errorMessage = 'Failed to start generation. Please try again.'
      setErrors({ submit: errorMessage })
      toast.grantApplicationError(errorMessage)
      setIsGenerating(false)
    }
  }

  return (
    <MainLayout>
      <Box minH="100vh" bg="purple.50">
        <Container maxW="container.xl" py={8}>
          <VStack gap={8} align="stretch">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: 'Grant Application', isCurrentPage: true },
              ]}
            />

            {/* Header */}
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Heading size="xl" color="purple.900">
                  Grant Genie
                </Heading>
                <Text color="purple.700">
                  Make it yours and collaborate
                </Text>
              </VStack>
              <Badge colorScheme="purple" fontSize="sm" px={3} py={1}>
                Step 1 of 1
              </Badge>
            </HStack>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
              {/* Left Column - Upload & Teaching */}
              <VStack gap={6} align="stretch">
                {/* Upload Grant Materials */}
                <Card.Root>
                  <Card.Header>
                    <Heading size="md" color="purple.900">
                      Upload Grant Materials
                    </Heading>
                    <Text fontSize="sm" color="purple.700" mt={2}>
                      Upload RFP or Guidelines, or paste the content in text box
                    </Text>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={4} align="stretch">
                      {/* Upload Area */}
                      <input
                        ref={rfpInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        multiple
                        hidden
                        onChange={(e) => handleFileSelect(e.target.files, 'rfp')}
                      />
                      <Box
                        p={8}
                        border="2px dashed"
                        borderColor={isDraggingRfp ? 'purple.500' : errors.rfpFiles ? 'red.400' : 'purple.300'}
                        borderRadius="lg"
                        bg={isDraggingRfp ? 'purple.100' : 'purple.50'}
                        cursor="pointer"
                        textAlign="center"
                        _hover={{ borderColor: 'purple.400', bg: 'purple.100' }}
                        transition="all 0.2s"
                        onClick={() => rfpInputRef.current?.click()}
                        onDragOver={(e) => handleDragOver(e, 'rfp')}
                        onDragLeave={(e) => handleDragLeave(e, 'rfp')}
                        onDrop={(e) => handleDrop(e, 'rfp')}
                      >
                        <VStack gap={3}>
                          <Icon as={FiUpload} boxSize={10} color="purple.600" />
                          <Text color="purple.900" fontWeight="medium">
                            Drop RFP or Guidelines here
                          </Text>
                          <Text fontSize="sm" color="purple.600">
                            Or click to browse (PDF, DOC, DOCX, TXT)
                          </Text>
                        </VStack>
                      </Box>

                      {/* Error message */}
                      {errors.rfpFiles && (
                        <HStack gap={2} color="red.600" fontSize="sm">
                          <Icon as={FiAlertCircle} />
                          <Text>{errors.rfpFiles}</Text>
                        </HStack>
                      )}

                      {/* Uploaded files list */}
                      {rfpFiles.length > 0 && (
                        <VStack gap={2} align="stretch">
                          {rfpFiles.map((uploadedFile) => (
                            <HStack
                              key={uploadedFile.id}
                              p={3}
                              bg="white"
                              borderRadius="md"
                              border="1px solid"
                              borderColor="purple.200"
                              justify="space-between"
                            >
                              <HStack gap={2}>
                                <Icon as={FiFile} color="purple.600" />
                                <Text fontSize="sm" color="purple.900">
                                  {uploadedFile.file.name}
                                </Text>
                                <Text fontSize="xs" color="purple.600">
                                  ({(uploadedFile.file.size / 1024).toFixed(1)} KB)
                                </Text>
                              </HStack>
                              <IconButton
                                aria-label={`Remove file ${uploadedFile.file.name}`}
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => removeFile(uploadedFile.id, 'rfp')}
                                _active={{ transform: 'scale(0.95)' }}
                                _focusVisible={{
                                  outline: '3px solid',
                                  outlineColor: 'red.500',
                                  outlineOffset: '2px'
                                }}
                              >
                                <Icon as={FiX} />
                              </IconButton>
                            </HStack>
                          ))}
                        </VStack>
                      )}

                      {/* Text Input Alternative */}
                      <Textarea
                        placeholder="Or paste foundation's request for proposals, guidelines, and strategic priorities..."
                        rows={6}
                        value={formData.rfpText}
                        onChange={(e) => setFormData({ rfpText: e.target.value })}
                      />
                      <Text fontSize="xs" color="purple.600">
                        (Paste the content or describe in text box)
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>

                {/* Teach the Grant Genie */}
                <Card.Root>
                  <Card.Header>
                    <Heading size="md" color="purple.900">
                      Teach the Grant Genie
                    </Heading>
                    <Text fontSize="sm" color="purple.700" mt={2}>
                      Upload your own past grants and teach the Genie HOW you write
                    </Text>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={4} align="stretch">
                      {/* Upload Area */}
                      <input
                        ref={teachingInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        multiple
                        hidden
                        onChange={(e) => handleFileSelect(e.target.files, 'teaching')}
                      />
                      <Box
                        p={8}
                        border="2px dashed"
                        borderColor={isDraggingTeaching ? 'purple.500' : errors.teachingFiles ? 'red.400' : 'purple.300'}
                        borderRadius="lg"
                        bg={isDraggingTeaching ? 'purple.100' : 'white'}
                        cursor="pointer"
                        textAlign="center"
                        _hover={{ borderColor: 'purple.400', bg: 'purple.50' }}
                        transition="all 0.2s"
                        onClick={() => teachingInputRef.current?.click()}
                        onDragOver={(e) => handleDragOver(e, 'teaching')}
                        onDragLeave={(e) => handleDragLeave(e, 'teaching')}
                        onDrop={(e) => handleDrop(e, 'teaching')}
                      >
                        <VStack gap={3}>
                          <Icon as={FiFileText} boxSize={10} color="purple.600" />
                          <Text color="purple.900" fontWeight="medium">
                            Upload grants, reports, or narratives
                          </Text>
                          <Text fontSize="sm" color="purple.600">
                            that shows HOW you write (PDF, DOC, DOCX, TXT)
                          </Text>
                        </VStack>
                      </Box>

                      {/* Error message */}
                      {errors.teachingFiles && (
                        <HStack gap={2} color="red.600" fontSize="sm">
                          <Icon as={FiAlertCircle} />
                          <Text>{errors.teachingFiles}</Text>
                        </HStack>
                      )}

                      {/* Uploaded files list */}
                      {teachingFiles.length > 0 && (
                        <VStack gap={2} align="stretch">
                          {teachingFiles.map((uploadedFile) => (
                            <HStack
                              key={uploadedFile.id}
                              p={3}
                              bg="white"
                              borderRadius="md"
                              border="1px solid"
                              borderColor="purple.200"
                              justify="space-between"
                            >
                              <HStack gap={2}>
                                <Icon as={FiFile} color="purple.600" />
                                <Text fontSize="sm" color="purple.900">
                                  {uploadedFile.file.name}
                                </Text>
                                <Text fontSize="xs" color="purple.600">
                                  ({(uploadedFile.file.size / 1024).toFixed(1)} KB)
                                </Text>
                              </HStack>
                              <IconButton
                                aria-label={`Remove file ${uploadedFile.file.name}`}
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => removeFile(uploadedFile.id, 'teaching')}
                                _active={{ transform: 'scale(0.95)' }}
                                _focusVisible={{
                                  outline: '3px solid',
                                  outlineColor: 'red.500',
                                  outlineOffset: '2px'
                                }}
                              >
                                <Icon as={FiX} />
                              </IconButton>
                            </HStack>
                          ))}
                        </VStack>
                      )}

                      {/* Text Input Alternative */}
                      <Textarea
                        placeholder="Uploaded grants, reports, or narratives that shows HOW you write. Paste here or upload above..."
                        rows={6}
                        value={formData.teachingMaterials}
                        onChange={(e) => setFormData({ teachingMaterials: e.target.value })}
                      />
                    </VStack>
                  </Card.Body>
                </Card.Root>

                {/* Knowledge Capture */}
                <Card.Root bg="purple.50" border="1px solid" borderColor="purple.200">
                  <Card.Header>
                    <Heading size="sm" color="purple.900">
                      Knowledge Capture
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <Text fontSize="sm" color="purple.700" lineHeight="tall">
                      Grant the proposal will use all the context to learn your writing style and the funder's priorities. Share as much as you can OR AVOID guidance and opt to control your grant style.
                    </Text>
                  </Card.Body>
                </Card.Root>

                {/* Talk to the Genie */}
                <Card.Root bg="purple.50" border="1px solid" borderColor="purple.200">
                  <Card.Header>
                    <Heading size="sm" color="purple.900">
                      Talk to the Genie
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={3} align="stretch">
                      <Text fontSize="sm" color="purple.700">
                        Ask one reflective or question to the Genie to customize:
                      </Text>
                      <Box
                        p={3}
                        bg="white"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="purple.200"
                      >
                        <Text fontSize="sm" color="purple.900" fontStyle="italic">
                          e.g., "How can I incorporate data-driven evidence into my problem statement?"
                        </Text>
                      </Box>
                      <Textarea
                        placeholder="Remember that Smith Foundation prefers concise strategic metrics over general statements..."
                        rows={3}
                      />
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </VStack>

              {/* Right Column - Project Context */}
              <VStack gap={6} align="stretch">
                <Card.Root>
                  <Card.Header>
                    <Heading size="md" color="purple.900">
                      Project Context Fields
                    </Heading>
                    <Text fontSize="sm" color="purple.700" mt={2}>
                      Provide the essential details for your grant proposal
                    </Text>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={6} align="stretch">
                      {/* Project/Program Name */}
                      <VStack align="start" gap={2}>
                        <HStack gap={1}>
                          <Text fontWeight="semibold" color="purple.900">
                            Project/Program Name
                          </Text>
                          <Text color="red.500">*</Text>
                        </HStack>
                        <Input
                          placeholder="Enter project name"
                          value={formData.projectName || ''}
                          onChange={(e) => handleFieldChange('projectName', e.target.value)}
                          borderColor={errors.projectName ? 'red.400' : undefined}
                          _focus={{
                            borderColor: errors.projectName ? 'red.500' : 'purple.500',
                            boxShadow: errors.projectName ? '0 0 0 1px var(--chakra-colors-red-500)' : undefined,
                          }}
                        />
                        {errors.projectName && (
                          <HStack gap={1} color="red.600" fontSize="sm">
                            <Icon as={FiAlertCircle} boxSize={3} />
                            <Text>{errors.projectName}</Text>
                          </HStack>
                        )}
                      </VStack>

                      {/* Funder Name */}
                      <VStack align="start" gap={2}>
                        <HStack gap={1}>
                          <Text fontWeight="semibold" color="purple.900">
                            Funder Name
                          </Text>
                          <Text color="red.500">*</Text>
                        </HStack>
                        <Input
                          placeholder="Enter funder name"
                          value={formData.funderName || ''}
                          onChange={(e) => handleFieldChange('funderName', e.target.value)}
                          borderColor={errors.funderName ? 'red.400' : undefined}
                          _focus={{
                            borderColor: errors.funderName ? 'red.500' : 'purple.500',
                            boxShadow: errors.funderName ? '0 0 0 1px var(--chakra-colors-red-500)' : undefined,
                          }}
                        />
                        {errors.funderName && (
                          <HStack gap={1} color="red.600" fontSize="sm">
                            <Icon as={FiAlertCircle} boxSize={3} />
                            <Text>{errors.funderName}</Text>
                          </HStack>
                        )}
                      </VStack>

                      {/* Funding Deadline */}
                      <VStack align="start" gap={2}>
                        <Text fontWeight="semibold" color="purple.900">
                          Funding Deadline
                        </Text>
                        <Input
                          type="date"
                          value={formData.deadline || ''}
                          onChange={(e) => handleFieldChange('deadline', e.target.value)}
                        />
                      </VStack>

                      {/* Estimated Grant Amount */}
                      <VStack align="start" gap={2}>
                        <Text fontWeight="semibold" color="purple.900">
                          Estimated Grant Amount
                        </Text>
                        <Input
                          placeholder="$50,000"
                          value={formData.fundingAmount || ''}
                          onChange={(e) => handleFieldChange('fundingAmount', e.target.value)}
                        />
                      </VStack>
                    </VStack>
                  </Card.Body>
                </Card.Root>

                {/* Input Summary Preview */}
                <Card.Root bg="purple.50" border="1px solid" borderColor="purple.200">
                  <Card.Header>
                    <Heading size="sm" color="purple.900">
                      Input Summary
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={3} align="stretch">
                      <Box>
                        <Text fontSize="xs" color="purple.600" mb={1}>
                          Grant Materials
                        </Text>
                        <Text fontSize="sm" color="purple.900">
                          {rfpFiles.length > 0
                            ? `${rfpFiles.length} file${rfpFiles.length > 1 ? 's' : ''} uploaded`
                            : formData.rfpText
                            ? 'RFP content provided'
                            : 'Not provided yet'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="purple.600" mb={1}>
                          Teaching Materials
                        </Text>
                        <Text fontSize="sm" color="purple.900">
                          {teachingFiles.length > 0
                            ? `${teachingFiles.length} file${teachingFiles.length > 1 ? 's' : ''} uploaded`
                            : formData.teachingMaterials
                            ? 'Writing samples provided'
                            : 'Not provided yet'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="purple.600" mb={1}>
                          Project Name
                        </Text>
                        <Text fontSize="sm" color="purple.900">
                          {formData.projectName || 'Not entered'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="purple.600" mb={1}>
                          Funder
                        </Text>
                        <Text fontSize="sm" color="purple.900">
                          {formData.funderName || 'Not specified'}
                        </Text>
                      </Box>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </VStack>
            </SimpleGrid>

            {/* Error Message */}
            {errors.submit && (
              <Card.Root bg="red.50" border="1px solid" borderColor="red.300">
                <Card.Body>
                  <HStack gap={2}>
                    <Icon as={FiAlertCircle} color="red.700" />
                    <Text color="red.700" fontWeight="medium">
                      {errors.submit}
                    </Text>
                  </HStack>
                </Card.Body>
              </Card.Root>
            )}

            {/* Generate Button */}
            <HStack justify="center" pt={4}>
              <Button
                size="lg"
                colorScheme="purple"
                px={12}
                onClick={handleGenerate}
                disabled={isGenerating || !isFormValid()}
                opacity={!isFormValid() && !isGenerating ? 0.6 : 1}
                cursor={!isFormValid() && !isGenerating ? 'not-allowed' : 'pointer'}
                _active={{ transform: 'scale(0.98)' }}
                _disabled={{
                  opacity: 0.6,
                  cursor: 'not-allowed',
                  _hover: { bg: undefined }
                }}
              >
                {isGenerating ? (
                  <>
                    <Icon as={FiLoader} className="animate-spin" mr={2} />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Draft
                    <Icon as={FiArrowRight} ml={2} />
                  </>
                )}
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </MainLayout>
  )
}
