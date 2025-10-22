# Grant Genie

A comprehensive Next.js application with Chakra UI for managing grant applications, tracking compliance, and generating reports.

## Features

- **Modern, Responsive UI** - Built with Chakra UI for a beautiful user experience
- **Grant Search** - Advanced search and filtering to discover funding opportunities
- **Application Management** - Create and manage grant applications with ease
- **Compliance Tracking** - Monitor deadlines, requirements, and submissions
- **Reporting & Analytics** - Generate comprehensive reports and track performance
- **AI-Powered Assistance** - AI Grant Copilot to help with grant management
- **Notifications** - Stay updated with critical alerts and deadlines
- **Resources Hub** - Access templates, guides, and best practices
- **Support Center** - Comprehensive help and documentation
- **Full TypeScript Support** - Type-safe codebase
- **Dark Mode Ready** - Support for light and dark themes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
grant-genie/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Dashboard page
│   ├── grant-search/            # Grant search and discovery
│   ├── grant-application/       # Application creation form
│   ├── compliance-tracker/      # Compliance monitoring
│   ├── reporting/               # Analytics and reports
│   ├── notifications/           # Alerts and notifications
│   ├── resources/               # Resources and AI copilot
│   ├── support/                 # Support center
│   ├── profile/                 # Profile management
│   ├── layout.tsx               # Root layout
│   ├── providers.tsx            # Chakra UI provider
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   └── MainLayout.tsx       # Main layout wrapper
│   ├── Sidebar.tsx              # Alternative sidebar
│   └── AppLayout.tsx            # Alternative layout
└── public/                      # Static assets
```

## Technology Stack

- **Framework:** Next.js 16
- **UI Library:** Chakra UI 3
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Chakra UI
- **Icons:** React Icons (Material Design & Feather)
- **State Management:** React Hooks

## Pages

### Public Pages
- **`/landing`** - Premium landing page with features, pricing, and CTAs

### Main Application (Protected)
- **`/`** - Dashboard with grant statistics and overview
- **`/grant-search`** - Advanced grant search with filters and results
- **`/grant-application`** - Create new grant applications
- **`/compliance-tracker`** - Monitor compliance tasks and deadlines
- **`/reporting`** - Analytics, reports, and performance metrics
- **`/notifications`** - Critical alerts and recent updates
- **`/resources`** - AI Grant Copilot, templates, and guides
- **`/support`** - FAQs and contact support
- **`/profile`** - Profile and organization settings

### Page Features

#### Landing Page (`/landing`)
- Hero section with value proposition
- Key statistics showcase
- Features grid with icons
- Pricing plans (Starter, Professional, Enterprise)
- CTA sections
- Footer with sitemap
- Login and signup modals

#### Dashboard (`/`)
- Total applications, approved, pending, and funding stats
- Recent applications and upcoming deadlines
- Quick access to key functions

#### Grant Search (`/grant-search`)
- Advanced search with keyword filtering
- Filter by category, funding amount, deadline, location
- Detailed grant cards with eligibility criteria
- Bookmark and start applications

#### Grant Application (`/grant-application`)
- Basic information section
- Budget breakdown with cost categories
- Project timeline with milestones
- Document upload with drag-and-drop
- Save as draft functionality

#### Compliance Tracker (`/compliance-tracker`)
- Overview stats (completed, pending, overdue)
- Tabbed view for different task statuses
- Priority indicators and due dates
- Quick upload and submission actions
- Bulk upload and reminder management

#### Reporting (`/reporting`)
- Key metrics (funding secured, success rate, compliance)
- Funding by category breakdown
- Grant performance table with progress
- Custom report builder
- Export to PDF, Excel, CSV

#### Notifications (`/notifications`)
- Critical alerts section
- Recent updates feed
- Filter by type and date range
- Notification preferences toggle
- Mark all as read functionality

#### Resources (`/resources`)
- AI Grant Copilot chatbot
- Application templates (Federal, Foundation, Corporate)
- Best practice guides
- Management tools (calculator, planner, checklist)
- Quick actions dashboard

#### Support (`/support`)
- FAQ accordion with common questions
- Email, phone, and live chat support
- Community resources (guides, tutorials, forum)
- Quick action buttons
- Copyright footer

#### Profile (`/profile`)
- Personal information form
- Organization details
- Address information
- Profile photo upload
- Tabbed settings navigation

## Design Principles

### User Experience
- **Intuitive Navigation** - Clear sidebar with all major sections
- **Consistent Layout** - Uniform design across all pages
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Visual Hierarchy** - Important information highlighted with color and size
- **Accessibility** - Built with Chakra UI's accessible components

### UI Components
- **Cards** - Organize content into digestible sections
- **Tables** - Display data in structured, sortable formats
- **Forms** - User-friendly input fields with validation
- **Badges & Tags** - Quick visual indicators for status
- **Progress Bars** - Show completion and compliance rates
- **Icons** - Material Design and Feather icons for clarity

### Color System
- **Primary Blue** - Main actions and active states
- **Green** - Success, completed items, positive metrics
- **Red** - Alerts, overdue items, critical actions
- **Orange/Yellow** - Warnings, pending items
- **Purple** - Special features, analytics
- **Gray** - Secondary information, borders, backgrounds

## Key Features Highlights

### 1. Advanced Grant Search
- Multi-criteria filtering system
- Real-time search results
- Bookmark functionality
- Detailed grant information cards
- Direct application start

### 2. Comprehensive Application Management
- Step-by-step application forms
- Budget calculator integration
- Timeline management with milestones
- Document upload and management
- Draft saving capability

### 3. Smart Compliance Tracking
- Automated deadline tracking
- Priority-based task organization
- Status indicators (completed, pending, overdue)
- Bulk document upload
- Reminder system

### 4. Powerful Reporting & Analytics
- Visual data representation
- Custom report generation
- Multiple export formats
- Grant performance metrics
- Funding distribution analysis

### 5. AI-Powered Support
- Interactive AI Grant Copilot
- Context-aware assistance
- Template recommendations
- Best practice suggestions

## Development Notes

### Component Architecture
- **Server Components** - Default for better performance
- **Client Components** - Used for interactive features (marked with 'use client')
- **Layout System** - Shared MainLayout wrapper for consistency
- **Reusable Components** - Sidebar, navigation items, card templates

### State Management
- React useState for local component state
- Form state management with controlled components
- Future: Can integrate Redux or Zustand for global state

### Styling Approach
- Chakra UI components for rapid development
- Tailwind CSS for utility classes
- Color mode support (light/dark themes)
- Custom theme configuration

## Future Enhancements

### Planned Features
- [ ] User authentication and authorization
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time notifications with WebSockets
- [ ] Email integration for alerts
- [ ] Advanced data visualization with charts
- [ ] Export templates in multiple formats
- [ ] Calendar integration for deadlines
- [ ] Team collaboration features
- [ ] API integration with grant databases
- [ ] Mobile app version

### Technical Improvements
- [ ] Add unit tests (Jest, React Testing Library)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Implement caching strategies
- [ ] Add error boundaries
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] PWA capabilities
- [ ] Internationalization (i18n)

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please visit the Support Center at `/support` or contact:
- Email: support@grantgenie.com
- Documentation: [Coming Soon]

---

Built with ❤️ using Next.js and Chakra UI
