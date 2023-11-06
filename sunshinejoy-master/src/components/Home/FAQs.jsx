import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";

const questions_and_answers = [
    {
        question: "How long does it take to receive my personalized gift?",
        answer: "The turnaround time for your personalized gift can vary depending on the product and your location. We provide estimated delivery times from 2 weeks to 3 weeks.",
    },
    {
        question: "What if I am not satisfied with my personalized gift?",
        answer: "If you are not completely satisfied with your personalized gift, please reach out to our customer support team. We are committed to ensuring your satisfaction and will work with you to find a suitable solution.",
    },
    {
        question: "How do I track the status of my personalized gift order?",
        answer: "You can easily track the status of your order by logging into your account or using the order tracking feature on our website. You'll receive email updates as well.",
    },
    {
        question: "Do you offer gift wrapping and shipping services?",
        answer: "Yes, we provide gift wrapping and shipping services, allowing you to send your personalized gift directly to the recipient with an added touch of elegance.",
    },
];

const FAQs = () => {
  return (
    <div className="w-full">
      <div className="text-3xl max-xs:text-2xl text-primary text-center">Frequently Asked Questions</div>
      <div className="mt-8 max-xs:w-full max-md:w-[90%] w-[70%] max-lg:w-[80%] mx-auto">
      {questions_and_answers.map((item) => (
        <Accordion sx={{width : '100%'}}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{width : '100%'}}

          >
            <Typography fontFamily='Poppins' className="font-[600]">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{opacity : '0.9'}}>
             {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </div>
    </div>
  );
};

export default FAQs;
