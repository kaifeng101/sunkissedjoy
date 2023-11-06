import React from "react";
import HeroComponent from "../components/common/HeroComponent";
import CaptureComponent from "../components/Home/CaptureComponent";
import Layout from "../components/Layout/Layout";
import HomeCaptureImage from "../assets/home_capture_comical.png";
import HomeComingSoonImage from "../assets/home_coming.png";
import Button from "../components/common/Button";
import CelebrateComponent from "../components/Home/CelebrateComponent";
import ExpressComponent from "../components/Home/ExpressComponent";
import Testimonials from "../components/Home/Testimonials";
import FAQs from "../components/Home/FAQs";
import ComponentGroup from "../components/common/ComponentGroup";
const Home = () => {
  return (
    <Layout>
      <HeroComponent />
      <div className="px-20 max-xl:px-10 max-sm:px-3 max-lg:px-7 mt-20 max-content-width">
        <section>
          <div className="text-4xl text-center font-semibold max-xs:text-3xl">Capture.</div>
          <div className="mt-4 text-center text-xl max-xs:text-lg">
            Capture your special moment into a personalised illustration.{" "}
          </div>
          <div className="items-start max-md:grid-cols-1 mt-12 grid max-lg:gap-6 /*grid-cols-2*/ gap-36 max-xl:gap-16">
            <CaptureComponent
              img={HomeCaptureImage}
              title="DRAW ME, JOY!"
              showOnHover={true}
              desc="Joy and her artists got their paint brushes ready. Pick a style and they’ll paint you into a whole new world! "
            />
            {/*<CaptureComponent*/}
            {/*  img={HomeComingSoonImage}*/}
            {/*  showOnHover={true}*/}
            {/*  title="CREATE MY OWN MINIME CHARACTERS!"*/}
            {/*  desc="feeling creative and adventurous for somemore fun? Create your own Minime Characters and have them printed immediately onto your products with no drawing waiting time!"*/}
            {/*/>*/}
          </div>
        </section>
        {/* <div className="flex mt-14 max-xs:mt-10 items-center justify-center">
          <Button className="text-lg" primary={true}>
            Start Your Gift
          </Button>
        </div> */}
        <section className="mt-20 max-xs:mt-14 flex items-center justify-center flex-col">
          <div className="text-center text-4xl max-xs:text-3xl font-semibold">Celebrate.</div>
          <div className="mt-4 text-center text-xl max-xs:text-lg">
            There’s always one to celebrate every special occasion.
          </div>
          {<ComponentGroup className={'mt-12'} components={[
            <CelebrateComponent
            showOnHover={true}
              title="For Birthdays"
              img="https://cdn.igp.com/f_auto,q_auto,t_pnopt8prodlp/products/p-love-you-personalized-a5-anniversary-laminated-card-154607-m.jpg"
            />,
            <CelebrateComponent
            showOnHover={true}
              title="For Mother's Day"
              img="https://cdn.igp.com/f_auto,q_auto,t_pnopt8prodlp/products/p-personalized-thank-you-greeting-card-for-mom-112441-m.jpg"
            />,
            <CelebrateComponent
            showOnHover={true}
              title="For Aniversary"
              img="https://cdn.igp.com/f_auto,q_auto,t_pnopt8prodlp/products/p-love-you-personalized-a5-anniversary-laminated-card-154607-m.jpg"
            />,
            <CelebrateComponent
            showOnHover={true}
              title="Father's Day"
              img="https://cdn.igp.com/f_auto,q_auto,t_pnopt8prodlp/products/p-you-re-my-hero-personalized-greeting-card-for-dad-30946-m.jpg"
            />
          ]}/>}
          {/* <Button className="mx-auto text-lg max-xs:mt-12 mt-16" primary={true}>
            Start your gift
          </Button> */}
        </section>
        <section>
          <div className="mt-20 max-xs:mt-14 flex items-center justify-center px-12 max-xl:px-0 flex-col">
            <div className="text-center text-4xl font-semibold">Convey.</div>
            <div className="mt-4 text-center text-xl">
              Let each of them know how much you love them.
            </div>
           <ComponentGroup className='mt-12' customGap={'max-xs:grid-cols-1 grid grid-cols-2 max-sm:gap-5 w-full gap-24 gap-y-10 max-xl:gap-16 max-lg:gap-7'} components={[
            <ExpressComponent
            showOnHover={true}
            title="For Mom"
            img="https://cdn.igp.com/f_auto,q_auto,t_pnopt8prodlp/products/p-personalized-thank-you-greeting-card-for-mom-112441-m.jpg"
          />,
          <ExpressComponent
          showOnHover={true}
            title="For Dad"
            img="https://cdn.igp.com/f_auto,q_auto,t_pnopt8prodlp/products/p-you-re-my-hero-personalized-greeting-card-for-dad-30946-m.jpg"
          />,
          <ExpressComponent
          showOnHover={true}
            title="For Boyfriend"
            img="https://cdn.igp.com/f_auto,q_auto,t_pnopt8prodlp/products/p-i-love-you-personalized-a5-card-151239-m.jpg"
          />,
          <ExpressComponent
          showOnHover={true}
            title="For Girlfriend"
            img="https://cdn.igp.com/f_auto,q_auto,t_pnopt8prodlp/products/p-belong-together-personalized-a5-anniversary-laminated-card-154608-m.jpg"
          />
           ]}/>
            {/* <Button className="mx-auto text-lg mt-16 max-xs:mt-14" primary={true}>
              Start your gift
            </Button> */}
          </div>
        </section>
      </div>
      <div className="mt-24 max-xs:mt-18 w-full">
        <Testimonials />
      </div>
      <section className="px-24 max-xl:px-10 max-sm:px-4 max-lg:px-7">
        <div className="mt-20">
          <div className="text-3xl max-xs:text-xl font-semibold text-center">
            Say goodbye to missed special occasions! We've got you covered.
          </div>
          <div className="mt-3 text-xl max-lg:mt-5 max-xs:mt-8  text-center">
                Become a part of the{" "}
                <a style={{textDecoration: 'none'}} href="/contact"><span className="text-primary font-semibold">Sunkissed Joy</span></a>{" "}
                Family and enjoy year-round savings!
          </div>
        </div>
        <div className="mt-20 max-xs:mt-16 flex items-center justify-center w-full">
          <FAQs />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
