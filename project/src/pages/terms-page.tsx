import { LegalPage } from './legal-page';

export function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="July 2026"
      canonical="/terms"
      sections={[
        {
          heading: 'Acceptance of Terms',
          body: [
            'By using FreeQRHub, you agree to these terms of service. If you do not agree, please do not use the platform.',
          ],
        },
        {
          heading: 'Use of the Service',
          body: [
            'FreeQRHub provides a free QR code generation tool. You agree to use the service lawfully and not to create QR codes that direct users to malicious, illegal or harmful content.',
            'You are responsible for the content you encode into QR codes and for ensuring that content complies with applicable laws.',
          ],
        },
        {
          heading: 'Intellectual Property',
          body: [
            'QR codes you generate with FreeQRHub are yours to use freely for personal or commercial purposes. No attribution is required.',
            'The FreeQRHub brand, design and source code remain the property of FreeQRHub.',
          ],
        },
        {
          heading: 'No Warranty',
          body: [
            'FreeQRHub is provided "as is" without warranties of any kind. While we strive for reliability, we cannot guarantee that every QR code will scan perfectly on every device.',
            'Always test your QR codes before distributing them widely.',
          ],
        },
        {
          heading: 'Limitation of Liability',
          body: [
            'FreeQRHub shall not be liable for any indirect, incidental or consequential damages arising from the use of the service.',
          ],
        },
        {
          heading: 'Changes to These Terms',
          body: [
            'We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms.',
          ],
        },
      ]}
    />
  );
}
