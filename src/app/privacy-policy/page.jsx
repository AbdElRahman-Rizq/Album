"use client";

import Banner from "@/components/shared/banner";
import innerBanner from "@/assets/images/inner-banner.jpg";

export default function PrivacyPolicy() {
  return (
    <>
      <Banner innerBanner={innerBanner}>Privacy Policy</Banner>
      <div className="container mx-auto px-6 py-10 max-w-4xl bg-gray-50">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b-4 border-blue-500">
            Effective Date: January 1, 2024
          </h2>

          {[
            {
              title: "Introduction",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  Welcome to <span className="font-bold text-blue-600">Album Travel</span>! We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website and use our services.
                </p>
              )
            },
            {
              title: "Information We Collect",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Personal Information:</span> When you book a trip, subscribe to our newsletter, or contact us, we may collect personal details such as your name, email address, phone number, and payment information.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Usage Data:</span> We collect information on how you interact with our website, including IP addresses, browser type, pages visited, and the date and time of your visit.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Cookies:</span> We use cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences and improve our services.
                  </p>
                </div>
              )
            },
            {
              title: "How We Use Your Information",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We use the collected information for the following purposes:
                  </p>
                  <ul className="list-disc pl-6">
                    <li className="text-gray-700 leading-relaxed">To process bookings and transactions.</li>
                    <li className="text-gray-700 leading-relaxed">To send promotional materials and newsletters (you can opt-out at any time).</li>
                    <li className="text-gray-700 leading-relaxed">To improve our website and services.</li>
                    <li className="text-gray-700 leading-relaxed">To respond to your inquiries and provide customer support.</li>
                    <li className="text-gray-700 leading-relaxed">To comply with legal obligations.</li>
                  </ul>
                </div>
              )
            },
            {
              title: "Sharing Your Information",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We do not sell or rent your personal information to third parties. We may share your data with:
                  </p>
                  <ul className="list-disc pl-6">
                    <li className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-blue-600">Service Providers:</span> Trusted partners who assist us in operating our website and conducting our business.
                    </li>
                    <li className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-blue-600">Legal Authorities:</span> If required by law or to protect our rights and property.
                    </li>
                  </ul>
                </div>
              )
            },
            {
              title: "Data Security",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                </p>
              )
            },
            {
              title: "Your Rights",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6">
                    <li className="text-gray-700 leading-relaxed">Access the personal information we hold about you.</li>
                    <li className="text-gray-700 leading-relaxed">Request corrections to any inaccurate data.</li>
                    <li className="text-gray-700 leading-relaxed">Request the deletion of your personal data.</li>
                    <li className="text-gray-700 leading-relaxed">Opt-out of receiving marketing communications.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    To exercise these rights, please contact us at <span className="text-blue-600 font-semibold">info@albumtravel.com</span>.
                  </p>
                </div>
              )
            },
            {
              title: "Changes to This Privacy Policy",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
                </p>
              )
            }
          ].map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-200 pb-2">
                {section.title}
              </h3>
              {section.content}
            </div>
          ))}

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              To exercise your rights or if you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-bold text-blue-600">Phone:</span>{" "}
                <span className="text-gray-800">1033973047</span>
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-blue-600">Email:</span>{" "}
                <a 
                  href="mailto:info@albumtravel.com" 
                  className="text-blue-600 hover:underline font-semibold"
                >
                  info@albumtravel.com
                </a>
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 italic text-center mt-8">
            Thank you for trusting <span className="font-bold text-blue-600">Album Travel</span> with your travel plans and personal information. We are committed to ensuring your privacy and security.
          </p>
        </div>
      </div>
    </>
  );
}
