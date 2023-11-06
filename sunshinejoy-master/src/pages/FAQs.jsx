import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Layout from "../components/Layout/Layout";

// Demo styles, see 'Styles' section below for some notes on use.
import "./Accordian.styles.css";

const Item = ({ title, desc }) => {
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>{title}</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p className="text-black">{desc}</p>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

const FAQs = () => {
  return (
    <Layout>
    <div className="mt-16 max-sm:mt-12 px-44 max-xl:px-30 max-[1100px]:px-24 max-lg:px-10 max-sm:px-4 text-white">
      <div className="text-3xl font-semibold max-md:text-xl max-md:text-center text-black text-center mb-12 max-md:mb-6">Frequently Asked Questions ?</div>
      <div className="mt-4 max-sm:mt-7">
        <Accordion>
          <Item
            title="What is Sunshine Joy?"
            desc="In ad velit in ex nostrud dolore cupidatat consecteturea in ut nostrud velit in irure cillum tempor laborissed adipisicing eu esse duis nulla non."
          />
          <Item
            title="How do I place Order?"
            desc="In ad velit in ex nostrud dolore cupidatat consecteturea in ut nostrud velit in irure cillum tempor laborissed adipisicing eu esse duis nulla non."
          />
          <Item
            title="Can i pay cash on delivery?"
            desc="In ad velit in ex nostrud dolore cupidatat consecteturea in ut nostrud velit in irure cillum tempor laborissed adipisicing eu esse duis nulla non."
          />
          <Item
            title="How can i edit mydrafts"
            desc="In ad velit in ex nostrud dolore cupidatat consecteturea in ut nostrud velit in irure cillum tempor laborissed adipisicing eu esse duis nulla non."
          />
          <Item
            title="How do I ship items to my home?"
            desc="In ad velit in ex nostrud dolore cupidatat consecteturea in ut nostrud velit in irure cillum tempor laborissed adipisicing eu esse duis nulla non."
          />
          <Item
            title="Can I create my own template?"
            desc="In ad velit in ex nostrud dolore cupidatat consecteturea in ut nostrud velit in irure cillum tempor laborissed adipisicing eu esse duis nulla non."
          />
          <Item
            title="How do i make my card?"
            desc="In ad velit in ex nostrud dolore cupidatat consecteturea in ut nostrud velit in irure cillum tempor laborissed adipisicing eu esse duis nulla non."
          />
        </Accordion>
      </div>
    </div>
    </Layout>
  );
};

export default FAQs;