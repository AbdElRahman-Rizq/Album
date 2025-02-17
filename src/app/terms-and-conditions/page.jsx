"use client";

import Banner from "@/components/shared/banner";
import innerBanner from "@/assets/images/inner-banner.jpg";

export default function TermsAndConditions() {
  return (
    <>
      <Banner innerBanner={innerBanner}>Terms And Conditions</Banner>
      <div className="container mx-auto px-6 pt-8 pb-12 max-w-4xl bg-gray-50">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b-4 border-blue-500">
            Effective Date: January 1, 2024
          </h2>

          {[
            {
              title: "Introduction",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  Welcome to <span className="font-bold text-blue-600">Album Travel</span>. These Terms and Conditions govern your use of our website and services. By accessing or using our site, you agree to comply with and be bound by these terms. If you do not agree, please do not use our services.
                </p>
              )
            },
            {
              title: "Services",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-blue-600">Album Travel</span> provides travel booking and related services. All bookings and transactions are subject to availability and confirmation.
                </p>
              )
            },
            {
              title: "Booking and Payment",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Booking:</span> To book a trip, you must provide accurate and complete information. You are responsible for verifying all details before confirming your booking.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Payment:</span> Full payment is required at the time of booking unless otherwise stated. We accept various forms of payment as specified on our website.
                  </p>
                </div>
              )
            },
            {
              title: "Cancellation and Refunds",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Cancellation by You:</span> If you need to cancel your booking, please contact us immediately. Cancellation policies and fees vary depending on the service and supplier. Please review our cancellation policy on our website or your booking confirmation.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Cancellation by Us:</span> We reserve the right to cancel your booking in case of unforeseen circumstances. In such cases, we will offer a full refund or an alternative arrangement.
                  </p>
                </div>
              )
            },
            {
              title: "Changes to Bookings",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  If you need to make changes to your booking, contact us as soon as possible. Changes are subject to availability and may incur additional fees.
                </p>
              )
            },
            {
              title: "Travel Documents",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  You are responsible for ensuring that you have valid travel documents, including passports, visas, and any other required documentation. <span className="font-bold text-blue-600">Album Travel</span> is not responsible for any issues arising from incomplete or invalid travel documents.
                </p>
              )
            },
            {
              title: "Liability",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Limitation of Liability:</span> <span className="font-bold text-blue-600">Album Travel</span> is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services or inability to use our services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Third-Party Suppliers:</span> We work with third-party suppliers to provide travel services. <span className="font-bold text-blue-600">Album Travel</span> is not responsible for any actions or omissions of these suppliers.
                  </p>
                </div>
              )
            },
            {
              title: "User Conduct",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    By using our website, you agree not to:
                  </p>
                  <ul className="list-disc pl-6">
                    <li className="text-gray-700 leading-relaxed">Violate any applicable laws or regulations.</li>
                    <li className="text-gray-700 leading-relaxed">Engage in any fraudulent or deceptive activities.</li>
                    <li className="text-gray-700 leading-relaxed">Interfere with the operation of our website or services.</li>
                    <li className="text-gray-700 leading-relaxed">Post or transmit any harmful or offensive content.</li>
                  </ul>
                </div>
              )
            },
            {
              title: "Intellectual Property",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  All content on our website, including text, graphics, logos, and images, is the property of <span className="font-bold text-blue-600">Album Travel</span> or its licensors and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our permission.
                </p>
              )
            },
            {
              title: "Privacy Policy",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  Your use of our website is also governed by our Privacy Policy, which can be found{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    here
                  </a>
                  .
                </p>
              )
            },
            {
              title: "Changes to Terms",
              content: (
                <p className="text-gray-700 leading-relaxed">
                  We may update these Terms and Conditions from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our website and services constitutes acceptance of the updated terms.
                </p>
              )
            },
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
              If you have any questions or concerns about these Terms and Conditions, please contact us:
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
            Thank you for choosing <span className="font-bold text-blue-600">Album Travel</span>. We look forward to serving you and ensuring your travel experiences are memorable.
          </p>
        </div>
      </div>
    </>
  );
}
