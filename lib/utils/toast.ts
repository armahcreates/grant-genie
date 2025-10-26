/**
 * Toast Utility Functions
 * 
 * Convenience functions for showing toast notifications throughout the app.
 * Import these instead of useToast hook for cleaner code.
 */

import { useToast } from '@/components/ui/toaster'

/**
 * Common toast messages for the application
 */
export const toastMessages = {
  // Grant Application
  grantApplication: {
    submitted: 'Grant application submitted successfully',
    saved: 'Grant application saved as draft',
    error: 'Failed to submit grant application',
  },
  
  // File Upload
  fileUpload: {
    success: 'File uploaded successfully',
    error: 'Failed to upload file',
    tooLarge: 'File is too large. Maximum size is 10MB',
    invalidType: 'Invalid file type',
  },
  
  // Bookmarks
  bookmarks: {
    added: 'Grant added to bookmarks',
    removed: 'Grant removed from bookmarks',
    error: 'Failed to update bookmark',
  },
  
  // Compliance
  compliance: {
    taskCompleted: 'Compliance task marked as complete',
    documentUploaded: 'Compliance document uploaded successfully',
    reminderSet: 'Reminder set successfully',
    error: 'Failed to update compliance task',
  },
  
  // General
  general: {
    saved: 'Changes saved successfully',
    error: 'An error occurred. Please try again',
    copied: 'Copied to clipboard',
    deleted: 'Item deleted successfully',
  },
} as const

/**
 * Hook for toast notifications with pre-defined messages
 */
export function useAppToast() {
  const toast = useToast()
  
  return {
    // Direct toast methods
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
    
    // Grant application toasts
    grantApplicationSubmitted: () => 
      toast.success(toastMessages.grantApplication.submitted, 'Success'),
    
    grantApplicationSaved: () => 
      toast.success(toastMessages.grantApplication.saved),
    
    grantApplicationError: (error?: string) => 
      toast.error(error || toastMessages.grantApplication.error, 'Error'),
    
    // File upload toasts
    fileUploadSuccess: (filename?: string) => 
      toast.success(
        filename ? `${filename} uploaded successfully` : toastMessages.fileUpload.success,
        'Upload Complete'
      ),
    
    fileUploadError: (error?: string) => 
      toast.error(error || toastMessages.fileUpload.error, 'Upload Failed'),
    
    fileTooLarge: () => 
      toast.warning(toastMessages.fileUpload.tooLarge, 'File Too Large'),
    
    fileInvalidType: () => 
      toast.error(toastMessages.fileUpload.invalidType, 'Invalid File'),
    
    // Bookmark toasts
    bookmarkAdded: (grantTitle?: string) => 
      toast.success(
        grantTitle ? `${grantTitle} added to bookmarks` : toastMessages.bookmarks.added,
        'Bookmarked'
      ),
    
    bookmarkRemoved: (grantTitle?: string) => 
      toast.info(
        grantTitle ? `${grantTitle} removed from bookmarks` : toastMessages.bookmarks.removed,
        'Bookmark Removed'
      ),
    
    bookmarkError: () => 
      toast.error(toastMessages.bookmarks.error, 'Error'),
    
    // Compliance toasts
    complianceTaskCompleted: () => 
      toast.success(toastMessages.compliance.taskCompleted, 'Task Complete'),
    
    complianceDocumentUploaded: () => 
      toast.success(toastMessages.compliance.documentUploaded, 'Document Uploaded'),
    
    complianceReminderSet: () => 
      toast.success(toastMessages.compliance.reminderSet, 'Reminder Set'),
    
    complianceError: (error?: string) => 
      toast.error(error || toastMessages.compliance.error, 'Error'),
    
    // General toasts
    changesSaved: () => 
      toast.success(toastMessages.general.saved),
    
    copiedToClipboard: () => 
      toast.success(toastMessages.general.copied),
    
    itemDeleted: (itemName?: string) => 
      toast.success(
        itemName ? `${itemName} deleted successfully` : toastMessages.general.deleted,
        'Deleted'
      ),
    
    generalError: (error?: string) => 
      toast.error(error || toastMessages.general.error, 'Error'),
  }
}