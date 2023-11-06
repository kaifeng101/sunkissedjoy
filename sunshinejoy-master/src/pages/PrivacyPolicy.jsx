import React from "react";
import Layout from "../components/Layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
        <div className="p-16 px-32 max-xl:px-24 max-lg:px-12 max-sm:pt-28 max-sm:px-10 max-xs:px-4">
            <div className="text-3xl font-semibold">Privacy Policy for SunkissedJoy</div>
            <div className="w-[60px] h-[4px] bg-primary mt-2 px-2"></div>

            <div className="mt-6">
                  At SunkissedJoy, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website and services. By using our website and services, you consent to the practices described in this policy.
            </div>

            <div className="space-y-8 mt-10">
                <div className="">
                    <div className="text-xl font-semibold">1. Information We Collect</div>
                    <div className="mt-5">a. Personal Information: When you place an order or create an account, we may collect personal information such as your name, email address, shipping address, and payment details.</div>
                    <div className="mt-2">b. User-Generated Content: Any content you create, upload, or provide, including personalized designs and messages for your gifts, may be collected and used to fulfill your orders.</div>
                    <div className="mt-2">c. Communications: We may collect information from your communications with us, including emails, chat, or other forms of contact.</div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">2. How We Use Your Information</div>
                    <div className="mt-5">a. Order Processing: We use your information to process and fulfill your orders, including creating personalized gifts and arranging delivery.</div>
                    <div className="mt-2">b. Customer Support: Your information helps us provide effective customer support, answer your questions, and address any issues you may encounter.</div>
                    <div className="mt-2">c. Communications: We may send you transactional emails, such as order confirmations and shipping updates. We may also use your contact information to send you promotional or marketing materials. You can opt out of marketing communications at any time.</div>
                    <div className="mt-2">d. Use of Shared Content, Including Pictures</div>
                    <div className="mt-2">di. Promotional and Content Creation Purposes: SunkissedJoy may use user-generated content, including personalized designs, messages, and pictures you create and send, for promotional and content creation purposes on our website and associated marketing materials. This may include displaying images of personalized gifts as examples for other customers. However, we respect your privacy, and we will not use your content, including pictures, for these purposes unless you explicitly request not to do so.</div>
                    <div className="mt-2">dii. Opting Out: If you do not wish to have your content, including pictures, used for promotional or content creation purposes, please contact us at <u>Sunkissedjoy.co@gmail.com</u> and make your request. We will respect your choice and refrain from using your content, including pictures, for these purposes.</div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">3. Data Security</div>
                    <div className="mt-5">We take data security seriously and employ industry-standard measures to protect your information. All sensitive data, such as payment details, is encrypted and transmitted securely. We conduct regular security audits and implement best practices to ensure your data remains safe.</div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">4. Sharing Your Information</div>
                    <div className="mt-5">a. Third Parties: We may share your information with third-party service providers, such as payment processors and shipping companies, to fulfill your orders. These service providers have their own privacy policies and practices.</div>
                    <div className="mt-2">b. Legal Compliance: We may disclose your information when required by law or to protect our rights, privacy, safety, or property.</div>    
                </div>

                <div className="">
                    <div className="text-xl font-semibold">5. Cookies and Analytics</div>
                    <div className="mt-5">We use cookies and analytics tools to gather information about your use of our website. This data helps us improve your user experience and the functionality of our website. You can manage your cookie preferences in your browser settings</div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">6. Your Rights</div>
                    <div className="mt-5">You have the right to:</div>
                    <div className="mt-2 ml-4">
                        <ul className="ml-4" style={{ listStyle: 'unset' }}>
                            <li>Access and review the personal information we hold about you.</li>
                            <li>Correct any inaccuracies in your personal information.</li>
                            <li>Delete your personal information, except for data we are required to retain for legal or administrative purposes.</li>
                        </ul>
                    </div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">7. Changes to this Privacy Policy</div>
                    <div className="mt-5">We may update this Privacy Policy from time to time. When we make changes, we will update the effective date at the top of the policy. We encourage you to review this policy periodically.</div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">8. Contact Us</div>
                    <div className="mt-5">If you have questions or concerns about this Privacy Policy, please contact us at <u>Sunkissedjoy.co@gmail.com</u></div>
                </div>
            </div>
      </div>
    </Layout>
  );
};
export default PrivacyPolicy;