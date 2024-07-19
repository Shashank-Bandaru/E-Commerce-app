import React from "react";
import Layout from "./../components/Layout";

const Policy = () => {
  return (
    <Layout  title={"Privacy Policy - E-Commerce App"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy_policy.jpg"
            alt="privacy_policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4" style={{maxHeight: "50vh",
  overflow: "auto"}}>
        <ul>
    <li><strong>Information Collection:</strong> We collect personal information such as name, email address, shipping address, and payment details when you make a purchase or register for an account on our website.</li>
    <li><strong>Use of Information:</strong> The information we collect is used to process your orders, provide customer support, improve our services, and send you updates about your order and promotional offers.</li>
    <li><strong>Data Security:</strong> We implement advanced security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</li>
    <li><strong>Cookies:</strong> Our website uses cookies to enhance your browsing experience by remembering your preferences and login information, and to track website usage for analytics purposes.</li>
    <li><strong>Third-Party Services:</strong> We may share your information with trusted third-party service providers for order fulfillment, payment processing, and delivery services. These providers are obligated to protect your information.</li>
    <li><strong>Data Retention:</strong> We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes.</li>
    <li><strong>User Rights:</strong> You have the right to access, update, or delete your personal information at any time. You can also opt out of receiving promotional communications from us.</li>
    <li><strong>Policy Changes:</strong> We may update our privacy policy periodically. We will notify you of any significant changes by posting the new policy on our website and updating the effective date.</li>
    <li><strong>Contact Us:</strong> If you have any questions or concerns about our privacy policy, please contact our customer service team at our contact page.</li>
</ul>

        </div>
      </div>
    </Layout>
  );
};

export default Policy;