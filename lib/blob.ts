import { put, del, list, head } from '@vercel/blob'

/**
 * Upload a file to Vercel Blob storage
 * @param file - File or Blob to upload
 * @param pathname - Optional pathname for the file
 * @returns Blob metadata including URL
 */
export async function uploadFile(file: File | Blob, pathname?: string) {
  const filename = pathname || (file instanceof File ? file.name : 'unnamed-file')

  const blob = await put(filename, file, {
    access: 'public',
  })

  return blob
}

/**
 * Delete a file from Vercel Blob storage
 * @param url - The blob URL to delete
 */
export async function deleteFile(url: string) {
  await del(url)
}

/**
 * List all files in Vercel Blob storage
 * @param options - Optional filtering options
 */
export async function listFiles(options?: { prefix?: string; limit?: number }) {
  const { blobs } = await list(options)
  return blobs
}

/**
 * Get file metadata from Vercel Blob storage
 * @param url - The blob URL
 */
export async function getFileMetadata(url: string) {
  const blob = await head(url)
  return blob
}
