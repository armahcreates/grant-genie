export default function TermsOfService() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: '#3C3B6E' }}>Terms of Service</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div style={{ lineHeight: '1.8', color: '#333' }}>
        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>1. Acceptance of Terms</h2>
        <p>By accessing and using HeadspaceGenie.ai ("Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>2. Use License</h2>
        <p>Permission is granted to temporarily use the Service for personal or organizational use. This is the grant of a license, not a transfer of title.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>3. Beta Program</h2>
        <p>HeadspaceGenie.ai is currently in beta. The Service is provided "as is" and we make no guarantees about uptime, data persistence, or feature availability during the beta period.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>4. User Data</h2>
        <p>You retain all rights to any content you create using the Service. We do not claim ownership of your generated content, documents, or data.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>5. Acceptable Use</h2>
        <p>You agree not to use the Service to:</p>
        <ul style={{ marginLeft: '24px', marginTop: '12px' }}>
          <li>Generate harmful, illegal, or discriminatory content</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights of others</li>
          <li>Attempt to reverse engineer or exploit the Service</li>
        </ul>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>6. Billing and Cancellation</h2>
        <p>Subscriptions are billed monthly. You may cancel at any time from your account settings. Cancellations take effect at the end of the current billing period. No refunds for partial months.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>7. Disclaimer</h2>
        <p>The Service is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted or error-free.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>8. Limitation of Liability</h2>
        <p>HeadspaceGenie.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>9. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the Service constitutes acceptance of modified terms.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>10. Contact</h2>
        <p>For questions about these Terms, contact us at: <a href="mailto:hello@headspacegenie.ai" style={{ color: '#5CE1E6' }}>hello@headspacegenie.ai</a></p>
      </div>

      <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <a href="/" style={{ color: '#5CE1E6', textDecoration: 'none' }}>← Back to Home</a>
      </div>
    </div>
  )
}