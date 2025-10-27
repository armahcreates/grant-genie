import { Box, Container, Spinner, VStack, Text } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="purple.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.sm">
        <VStack gap={4}>
          <Spinner size="xl" color="purple.600" />
          <Text color="purple.900" fontSize="lg" fontWeight="medium">
            Loading...
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
