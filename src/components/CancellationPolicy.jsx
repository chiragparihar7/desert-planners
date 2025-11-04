import { FaArrowLeft, FaFileContract } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#e82429] transition-colors mb-6 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#e82429] rounded-lg">
              <FaFileContract className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Cancellation & Refund Policy</h1>
          </div>
          <p className="text-lg text-gray-600">Desert Planners Tourism LLC</p>
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-8">
            {/* Cancellation & No-Show */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Cancellation & No-Show
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-green-700">Full Refund:</strong> Cancellations made more than 24 hours before the tour start time.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-red-700">100% Charge:</strong> For no-shows or cancellations made within 24 hours of the tour start time.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Once Service Starts:</strong> No refunds will be issued after the tour/service has commenced.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Partial Usage:</strong> No refunds for partially used packages, meals, accommodations, tickets, or services.</p>
                </div>
              </div>
            </section>

            {/* Non-Refundable Items */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Non-Refundable Items
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-orange-700">Strictly Non-Refundable:</strong> Dated/specific-time tickets, coupon tickets, events, attractions, or accommodations marked "no refund/replacement."</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-orange-700">Excursion Tickets:</strong> Non-changeable and non-refundable under all circumstances.</p>
                </div>
              </div>
            </section>

            {/* Refund Method & Timeline */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Refund Method & Timeline
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-blue-700">Payment Mode:</strong> Refunds are processed only to the original payment method.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-blue-700">Timeline:</strong> Refunds may take 10–20 working days to reflect, depending on your bank's policy.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-blue-700">Fees:</strong> Any bank, FX, or processing charges are non-recoverable and may be deducted from the refund amount.</p>
                </div>
              </div>
            </section>

            {/* Rates & Changes */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Rates & Changes
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Rates are subject to change without prior notice based on seasonality or supplier updates.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Once confirmed, bookings remain at the confirmed rate unless the guest requests modifications.</p>
                </div>
              </div>
            </section>

            {/* Child & Age Policy */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Child & Age Policy
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-teal-700">Under 3 years:</strong> Free of charge.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-teal-700">Child Rate:</strong> Applicable up to 10 years of age only.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-teal-700">Suitability:</strong> All tours are suitable for all age groups unless otherwise stated in the tour description.</p>
                </div>
              </div>
            </section>

            {/* Tour Duration & Logistics */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Tour Duration & Logistics
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>The total tour duration includes both pick-up and drop-off timings.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Shared tours may include a pick-up window; guests unavailable during that time may be considered no-shows.</p>
                </div>
              </div>
            </section>

            {/* Personal Belongings */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Personal Belongings
              </h2>
              <div className="p-4 bg-amber-50 rounded-lg">
                <p className="text-gray-700">
                  Desert Planners Tourism LLC is not responsible for loss or damage to unattended personal items. However, our team will assist in recovery efforts wherever possible.
                </p>
              </div>
            </section>

            {/* Supplier/Operator Fees */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Supplier/Operator Fees
              </h2>
              <div className="p-4 bg-rose-50 rounded-lg">
                <p className="text-gray-700">
                  Cancellations may incur supplier or operator charges in addition to our own. Guests will be informed via email or phone of total applicable fees upon cancellation.
                </p>
              </div>
            </section>

            {/* Rescheduling & Amendments */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Rescheduling & Amendments
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-cyan-700">More than 24 hours before the tour:</strong> Amendments or rescheduling are subject to availability and any price differences or supplier fees.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-red-700">Within 24 hours:</strong> Changes are not permitted and may be treated as a cancellation/no-show.</p>
                </div>
              </div>
            </section>

            {/* Force Majeure */}
            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Force Majeure
              </h2>
              <div className="p-4 bg-sky-50 rounded-lg">
                <p className="text-gray-700">
                  In the event of unforeseen circumstances (e.g., bad weather, government restrictions, road closures, or operational issues), Desert Planners Tourism LLC reserves the right to reschedule, modify, or cancel services. If we cancel due to such reasons, guests will receive a full refund or free reschedule where possible.
                </p>
              </div>
            </section>

            {/* Definitions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[#e82429] rounded-full"></span>
                Definitions
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Tour Start Time:</strong> Refers to the scheduled pick-up time mentioned on your booking voucher/confirmation.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Working Days:</strong> Exclude weekends and public holidays in the United Arab Emirates.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            For any questions regarding our cancellation policy, please contact us at{" "}
            <a href="mailto:info@desertplanners.net" className="text-[#e82429] hover:underline">
              info@desertplanners.net
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}