import React from "react";
import Layout from "../components/Layout/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
        <div className="p-16 px-32 max-xl:px-24 max-lg:px-12 max-sm:pt-28 max-sm:px-10 max-xs:px-4">
            <div className="text-3xl font-semibold">Refund Policy for SunkissedJoy</div>
            <div className="w-[60px] h-[4px] bg-primary mt-2 px-2"></div>
            <div className="space-y-8 mt-10">
                <div className="">
                    <div className="text-xl font-semibold">1. Personalized Gifts</div>
                      <div className="mt-5">SunkissedJoy specializes in creating personalized gifts that are carefully crafted to meet your unique requirements. Since each item is individually tailored to your specifications, we do not typically offer refunds.</div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">2. Defective or Damaged Items</div>
                    <div className="mt-5">a. We take great care to ensure that your personalized gifts are of the highest quality. If, however, you receive an item that is damaged or defective due to a manufacturing issue or damage during shipment, please contact us within 5 days of receiving the item.</div>
                    <div className="mt-2">b. To initiate a return or exchange for a defective or damaged item, please contact our customer support team at <u>Sunkissedjoy.co@gmail.com</u> and provide the following information:</div>
                    <div className="mt-2 ml-4">
                        <ul className="ml-4" style={{ listStyle: 'unset' }}>
                            <li>A clear description of the defect or damage</li>
                            <li>Clear, high-quality photos of the issue</li>
                        </ul>
                    </div>
                    <div className="mt-2">c. We will review your request and may request additional information or photos to assess the problem.</div>
                    <div className="mt-2">d. If your request is approved, we will offer one of the following options at our discretion:</div>
                    <div className="mt-2 ml-4">
                        <ul className="ml-4" style={{ listStyle: 'unset' }}>
                            <li>Replacement of the item with the same or a similar product.</li>
                            <li>A refund, if a replacement is not feasible.</li>
                        </ul>
                    </div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">3. Non-Defective or Non-Damaged Items</div>
                    <div className="mt-5">a. As our products are personalized and created based on your unique requirements, we do not typically accept returns or offer refunds for non-defective, non-damaged items.</div>
                    <div className="mt-2">b. If you have concerns about your order or believe there was an error on our part, please contact us, and we will work with you to resolve the issue to your satisfaction.</div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">4. Cancellation of Orders</div>
                    <div className="mt-5">a. Due to the customized nature of our products and our quick production turnaround, order cancellations are typically not possible once an order is placed.</div>
                </div>

                <div className="">
                    <div className="text-xl font-semibold">5. Contact Information</div>
                      <div className="mt-5">If you have questions or need to request a return or exchange for a damaged or defective item, please contact our customer support team at <u>Sunkissedjoy.co@gmail.com</u></div>
                </div>
            </div>
      </div>
    </Layout>
  );
};
export default RefundPolicy;