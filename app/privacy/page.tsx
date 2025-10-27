export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: '#3C3B6E' }}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div style={{ lineHeight: '1.8', color: '#333' }}>
        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>1. Information We Collect</h2>
        <p>We collect information you provide directly to us when you:</p>
        <ul style={{ marginLeft: '24px', marginTop: '12px' }}>
          <li>Create an account</li>
          <li>Use our AI services to generate content</li>
          <li>Upload documents for AI training</li>
          <li>Contact our support team</li>
          <li>Subscribe to our newsletter</li>
        </ul>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul style={{ marginLeft: '24px', marginTop: '12px' }}>
          <li>Provide, maintain, and improve our services</li>
          <li>Train AI models on your organization's writing style (with your permission)</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, and support messages</li>
          <li>Respond to your comments and questions</li>
        </ul>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>3. Data Security</h2>
        <p>We take data security seriously and implement appropriate technical and organizational measures to protect your data, including:</p>
        <ul style={{ marginLeft: '24px', marginTop: '12px' }}>
          <li>256-bit encryption for data in transit and at rest</li>
          <li>Regular security audits and penetration testing</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Secure data centers with SOC 2 Type II compliance</li>
        </ul>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>4. Data Ownership</h2>
        <p>You retain full ownership of all content you create using HeadspaceGenie.ai. We do not claim any ownership rights to your generated content, uploaded documents, or data.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>5. Third-Party Services</h2>
        <p>We use select third-party services to operate our platform:</p>
        <ul style={{ marginLeft: '24px', marginTop: '12px' }}>
          <li>OpenAI for AI model access</li>
          <li>Authentication providers for secure login</li>
          <li>Payment processors for billing</li>
          <li>Analytics tools to improve our service</li>
        </ul>
        <p style={{ marginTop: '12px' }}>These providers have access only to the information necessary to perform their functions and are obligated to protect your data.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>6. Data Retention</h2>
        <p>We retain your data for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time by contacting us.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul style={{ marginLeft: '24px', marginTop: '12px' }}>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Export your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>8. GDPR Compliance</h2>
        <p>For users in the European Union, we comply with GDPR requirements. You have additional rights under GDPR, including the right to data portability and the right to lodge a complaint with a supervisory authority.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>9. Children's Privacy</h2>
        <p>Our services are not intended for children under 13. We do not knowingly collect information from children under 13.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>10. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of significant changes via email or through our service.</p>

        <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px', color: '#3C3B6E' }}>11. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@headspacegenie.ai" style={{ color: '#5CE1E6' }}>privacy@headspacegenie.ai</a></p>
      </div>

      <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <a href="/" style={{ color: '#5CE1E6', textDecoration: 'none' }}>← Back to Home</a>
      </div>
    </div>
  )
}