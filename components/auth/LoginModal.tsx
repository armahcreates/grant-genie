'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  HStack,
  Divider,
  Link,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup?: () => void
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      login({
        id: '1',
        email: email,
        name: 'Sarah Johnson',
        organization: 'Nonprofit Organization',
      })

      toast({
        title: 'Success',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setIsLoading(false)
      onClose()
      router.push('/')
    }, 1000)
  }

  const handleGoogleLogin = () => {
    toast({
      title: 'Coming Soon',
      description: 'Google login will be available soon',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent>
        <ModalHeader>Welcome Back</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </FormControl>

            <HStack w="full" justify="space-between">
              <Checkbox
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember me
              </Checkbox>
              <Link color="blue.500" fontSize="sm">
                Forgot password?
              </Link>
            </HStack>

            <Button
              colorScheme="blue"
              w="full"
              onClick={handleLogin}
              isLoading={isLoading}
            >
              Log In
            </Button>

            <HStack w="full">
              <Divider />
              <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                or continue with
              </Text>
              <Divider />
            </HStack>

            <Button
              w="full"
              variant="outline"
              leftIcon={
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path
                    fill="#4285F4"
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  />
                  <path
                    fill="#34A853"
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"
                  />
                  <path
                    fill="#EA4335"
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  />
                </svg>
              }
              onClick={handleGoogleLogin}
            >
              Google
            </Button>

            <Text fontSize="sm" textAlign="center">
              Don't have an account?{' '}
              <Link
                color="blue.500"
                fontWeight="semibold"
                onClick={() => {
                  onClose()
                  onSwitchToSignup?.()
                }}
              >
                Sign up
              </Link>
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
