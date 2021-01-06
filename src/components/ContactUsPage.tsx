import * as React from "react";
import ContactUs from "./ContactUs";
import { Values, SubmitResult } from "./Form";

const ContactUsPage: React.FC = () => {
  const handleSubmit = async (values: Values): Promise<SubmitResult> => {
    const wait = (ms: number): Promise<void> => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
    await wait(1000); // simulate asynchronous web API call
    return {
      success: true
    };
  };
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <p>If you enter your details we'll get back to you as soon as we can.</p>
      <ContactUs onSubmit={handleSubmit} />
    </div>
  );
};

export default ContactUsPage;
