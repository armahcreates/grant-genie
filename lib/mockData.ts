// Mock Data for Grant Genie Application

export interface Grant {
  id: string
  title: string
  organization: string
  amount: string
  deadline: string
  category: string
  status: 'Open' | 'Closing Soon' | 'Closed'
  description: string
  eligibility: string[]
  matchScore: number
}

export interface Application {
  id: string
  grantTitle: string
  organization: string
  amount: string
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected'
  submittedDate?: string
  deadline: string
  progress: number
}

export interface ComplianceItem {
  id: string
  grantName: string
  requirement: string
  dueDate: string
  status: 'Completed' | 'In Progress' | 'Overdue' | 'Upcoming'
  priority: 'High' | 'Medium' | 'Low'
}

export interface Notification {
  id: string
  type: 'critical' | 'update' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface GrantReport {
  name: string
  amount: string
  status: 'Active' | 'Completed' | 'Pending'
  progress: number
  endDate: string
}

// Mock Grants Database
export const mockGrants: Grant[] = [
  {
    id: 'G001',
    title: 'Community Health Initiative Grant',
    organization: 'National Health Foundation',
    amount: '$250,000',
    deadline: '2025-12-15',
    category: 'Healthcare',
    status: 'Open',
    description: 'Funding to support community-based health programs, preventive care initiatives, and health education in underserved areas. Priority given to programs addressing chronic disease management.',
    eligibility: ['Non-profit 501(c)(3)', 'Healthcare Focus', 'Community Serving'],
    matchScore: 95
  },
  {
    id: 'G002',
    title: 'Education Innovation Fund',
    organization: 'State Education Department',
    amount: '$150,000',
    deadline: '2025-11-30',
    category: 'Education',
    status: 'Closing Soon',
    description: 'Support for innovative educational programs, STEM initiatives, and technology integration in K-12 schools. Must demonstrate measurable student outcomes.',
    eligibility: ['Educational Institution', 'K-12 Focus', 'Innovation Track Record'],
    matchScore: 88
  },
  {
    id: 'G003',
    title: 'Environmental Conservation Project',
    organization: 'Green Earth Alliance',
    amount: '$100,000',
    deadline: '2026-01-31',
    category: 'Environment',
    status: 'Open',
    description: 'Funding for environmental conservation, habitat restoration, and sustainability education programs. Preference for projects with community engagement.',
    eligibility: ['Environmental Focus', 'Community Impact', 'Sustainability Plan'],
    matchScore: 82
  },
  {
    id: 'G004',
    title: 'Arts & Culture Development Grant',
    organization: 'National Endowment for the Arts',
    amount: '$75,000',
    deadline: '2025-12-01',
    category: 'Arts & Culture',
    status: 'Open',
    description: 'Support for arts organizations, cultural programs, and community arts initiatives. Projects should promote cultural diversity and accessibility.',
    eligibility: ['Arts Organization', 'Public Programming', 'Community Access'],
    matchScore: 78
  },
  {
    id: 'G005',
    title: 'Youth Development Program',
    organization: 'Youth Futures Foundation',
    amount: '$200,000',
    deadline: '2025-11-15',
    category: 'Community Development',
    status: 'Closing Soon',
    description: 'Funding for youth mentorship, after-school programs, and career development initiatives for ages 13-18. Must include evaluation metrics.',
    eligibility: ['Youth Serving', 'Mentorship Program', 'Measurable Outcomes'],
    matchScore: 91
  },
  {
    id: 'G006',
    title: 'Small Business Development Grant',
    organization: 'Economic Development Corporation',
    amount: '$50,000',
    deadline: '2026-02-28',
    category: 'Economic Development',
    status: 'Open',
    description: 'Support for small business incubators, entrepreneurship training, and microenterprise development in economically disadvantaged communities.',
    eligibility: ['Economic Development', 'Small Business Focus', 'Community Impact'],
    matchScore: 75
  },
  {
    id: 'G007',
    title: 'Senior Services Expansion',
    organization: 'Aging Services Network',
    amount: '$125,000',
    deadline: '2025-12-20',
    category: 'Healthcare',
    status: 'Open',
    description: 'Funding to expand senior services including meal programs, transportation, health screenings, and social engagement activities for adults 65+.',
    eligibility: ['Senior Services', 'Healthcare Component', 'Transportation Access'],
    matchScore: 85
  },
  {
    id: 'G008',
    title: 'Technology Access Initiative',
    organization: 'Digital Equity Foundation',
    amount: '$180,000',
    deadline: '2025-11-25',
    category: 'Technology',
    status: 'Closing Soon',
    description: 'Bridge the digital divide through technology access programs, digital literacy training, and broadband expansion in underserved communities.',
    eligibility: ['Technology Focus', 'Digital Literacy', 'Underserved Communities'],
    matchScore: 89
  }
]

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: 'A001',
    grantTitle: 'Community Health Initiative Grant',
    organization: 'National Health Foundation',
    amount: '$250,000',
    status: 'Under Review',
    submittedDate: '2025-10-15',
    deadline: '2025-12-15',
    progress: 100
  },
  {
    id: 'A002',
    grantTitle: 'Youth Development Program',
    organization: 'Youth Futures Foundation',
    amount: '$200,000',
    status: 'Draft',
    deadline: '2025-11-15',
    progress: 65
  },
  {
    id: 'A003',
    grantTitle: 'Senior Services Expansion',
    organization: 'Aging Services Network',
    amount: '$125,000',
    status: 'Submitted',
    submittedDate: '2025-10-20',
    deadline: '2025-12-20',
    progress: 100
  },
  {
    id: 'A004',
    grantTitle: 'Education Innovation Fund',
    organization: 'State Education Department',
    amount: '$150,000',
    status: 'Approved',
    submittedDate: '2025-09-01',
    deadline: '2025-11-30',
    progress: 100
  },
  {
    id: 'A005',
    grantTitle: 'Arts & Culture Development Grant',
    organization: 'National Endowment for the Arts',
    amount: '$75,000',
    status: 'Draft',
    deadline: '2025-12-01',
    progress: 35
  }
]

// Mock Compliance Items
export const mockCompliance: ComplianceItem[] = [
  {
    id: 'C001',
    grantName: 'Education Innovation Fund',
    requirement: 'Quarterly Progress Report',
    dueDate: '2025-11-01',
    status: 'Upcoming',
    priority: 'High'
  },
  {
    id: 'C002',
    grantName: 'Education Innovation Fund',
    requirement: 'Financial Audit Submission',
    dueDate: '2025-10-25',
    status: 'Overdue',
    priority: 'High'
  },
  {
    id: 'C003',
    grantName: 'Community Health Initiative Grant',
    requirement: 'Mid-Year Impact Assessment',
    dueDate: '2025-11-15',
    status: 'In Progress',
    priority: 'Medium'
  },
  {
    id: 'C004',
    grantName: 'Senior Services Expansion',
    requirement: 'Beneficiary Data Report',
    dueDate: '2025-10-30',
    status: 'Upcoming',
    priority: 'Medium'
  },
  {
    id: 'C005',
    grantName: 'Education Innovation Fund',
    requirement: 'Annual Program Evaluation',
    dueDate: '2025-09-15',
    status: 'Completed',
    priority: 'High'
  },
  {
    id: 'C006',
    grantName: 'Community Health Initiative Grant',
    requirement: 'Budget Reconciliation',
    dueDate: '2025-12-01',
    status: 'Upcoming',
    priority: 'Low'
  }
]

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'critical',
    title: 'Deadline Approaching',
    message: 'Financial Audit for Education Innovation Fund is overdue. Please submit immediately to avoid compliance issues.',
    timestamp: '2025-10-21T10:30:00Z',
    read: false
  },
  {
    id: 'N002',
    type: 'critical',
    title: 'Application Deadline',
    message: 'Youth Development Program application deadline is in 5 days (Nov 15, 2025). Current progress: 65%.',
    timestamp: '2025-10-21T09:15:00Z',
    read: false
  },
  {
    id: 'N003',
    type: 'update',
    title: 'Application Status Update',
    message: 'Your application for Community Health Initiative Grant is now under review. Expected decision: 6-8 weeks.',
    timestamp: '2025-10-20T14:20:00Z',
    read: false
  },
  {
    id: 'N004',
    type: 'update',
    title: 'New Grant Opportunity',
    message: 'A new grant matching your profile (95% match) has been posted: Technology Access Initiative - $180,000.',
    timestamp: '2025-10-20T11:00:00Z',
    read: true
  },
  {
    id: 'N005',
    type: 'info',
    title: 'Quarterly Report Due',
    message: 'Reminder: Quarterly Progress Report for Education Innovation Fund is due November 1, 2025.',
    timestamp: '2025-10-19T08:00:00Z',
    read: true
  },
  {
    id: 'N006',
    type: 'update',
    title: 'Grant Approved!',
    message: 'Congratulations! Your application for Education Innovation Fund has been approved for $150,000.',
    timestamp: '2025-10-18T16:45:00Z',
    read: true
  },
  {
    id: 'N007',
    type: 'info',
    title: 'Upcoming Compliance Task',
    message: 'Mid-Year Impact Assessment for Community Health Initiative Grant is due in 25 days.',
    timestamp: '2025-10-17T10:00:00Z',
    read: true
  },
  {
    id: 'N008',
    type: 'update',
    title: 'Document Uploaded',
    message: 'Supporting documents have been successfully uploaded to your Senior Services Expansion application.',
    timestamp: '2025-10-16T13:30:00Z',
    read: true
  }
]

// Mock Team Members
export const mockTeam: TeamMember[] = [
  {
    id: 'T001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@nonprofit.org',
    role: 'Program Director'
  },
  {
    id: 'T002',
    name: 'Michael Chen',
    email: 'michael.chen@nonprofit.org',
    role: 'Grant Writer'
  },
  {
    id: 'T003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@nonprofit.org',
    role: 'Financial Manager'
  },
  {
    id: 'T004',
    name: 'David Thompson',
    email: 'david.thompson@nonprofit.org',
    role: 'Compliance Officer'
  }
]

// Mock Reporting Data
export const mockGrantReports: GrantReport[] = [
  {
    name: 'Education Innovation Fund',
    amount: '$150,000',
    status: 'Active',
    progress: 75,
    endDate: 'Dec 2025'
  },
  {
    name: 'Community Health Initiative',
    amount: '$250,000',
    status: 'Active',
    progress: 45,
    endDate: 'Jun 2026'
  },
  {
    name: 'Senior Services Expansion',
    amount: '$125,000',
    status: 'Active',
    progress: 60,
    endDate: 'Mar 2026'
  },
  {
    name: 'Youth Mentorship Program',
    amount: '$85,000',
    status: 'Completed',
    progress: 100,
    endDate: 'Sep 2025'
  },
  {
    name: 'Arts Education Grant',
    amount: '$60,000',
    status: 'Active',
    progress: 90,
    endDate: 'Nov 2025'
  }
]

// Dashboard Statistics
export const mockDashboardStats = {
  activeGrants: 12,
  totalFunding: '$1,245,000',
  upcomingDeadlines: 3,
  complianceRate: 94
}

// Funding by Category
export const mockFundingByCategory = [
  { category: 'Healthcare', amount: '$450,000', percentage: 36 },
  { category: 'Education', amount: '$350,000', percentage: 28 },
  { category: 'Community Development', amount: '$245,000', percentage: 20 },
  { category: 'Arts & Culture', amount: '$125,000', percentage: 10 },
  { category: 'Environment', amount: '$75,000', percentage: 6 }
]

// Recent Activity
export const mockRecentActivity = [
  {
    id: 'RA001',
    action: 'Application Submitted',
    grant: 'Community Health Initiative Grant',
    user: 'Sarah Johnson',
    timestamp: '2 hours ago'
  },
  {
    id: 'RA002',
    action: 'Report Uploaded',
    grant: 'Education Innovation Fund',
    user: 'Michael Chen',
    timestamp: '5 hours ago'
  },
  {
    id: 'RA003',
    action: 'Grant Approved',
    grant: 'Education Innovation Fund',
    user: 'System',
    timestamp: '1 day ago'
  },
  {
    id: 'RA004',
    action: 'Compliance Task Completed',
    grant: 'Senior Services Expansion',
    user: 'David Thompson',
    timestamp: '2 days ago'
  },
  {
    id: 'RA005',
    action: 'Draft Created',
    grant: 'Youth Development Program',
    user: 'Emily Rodriguez',
    timestamp: '3 days ago'
  }
]
