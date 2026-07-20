import { LegalPage } from './legal-page';

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="July 2026"
      canonical="/privacy"
      sections={[
        {
          heading: 'Our Commitment to Privacy',
          body: [
            'FreeQRHub is built with a privacy-first approach. We believe that creating a QR code should not require you to surrender your personal data.',
            'QR codes are generated entirely in your browser. The content you enter never leaves your device unless you explicitly choose to save it to your local browser history.',
          ],
        },
        {
          heading: 'Information We Do Not Collect',
          body: [
            'We do not require accounts, and we do not collect names, email addresses or payment information to use the generator.',
            'The content you encode into QR codes is processed locally in your browser and is not transmitted to or stored on our servers.',
          ],
        },
        {
          heading: 'Local Storage',
          body: [
            'To provide a better experience, FreeQRHub stores your recently generated QR codes in your browser\'s local storage. This data never leaves your device and can be cleared at any time from the generator or your browser settings.',
          ],
        },
        {
          heading: 'Cookies',
          body: [
            'FreeQRHub does not use tracking cookies. We may use essential cookies in the future for functionality, but never for advertising or cross-site tracking.',
          ],
        },
        {
          heading: 'Future Features',
          body: [
            'If we introduce accounts or cloud-saved QR codes in the future, this policy will be updated with clear opt-in consent and data handling details.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            'If you have questions about this privacy policy, please contact us at hello@freeqrhub.com.',
          ],
        },
      ]}
    />
  );
}
