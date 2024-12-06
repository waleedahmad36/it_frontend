import React from "react";

const ContactPage = () => {
  return (
    <div className="p-2 sm:w-[640px] sm:m-auto md:w-[100%]">
      {/* Header Section */}
      <div className="text-center pt-10 pb-10 space-y-5 p-5 sm:max-[520px] sm:m-auto">
        <h2 className="font-bold text-4xl font-serif">CONTACT US</h2>
        <p className="font-mono">
          Thank you for your interest in Precious Tech Academy! We are here to
          assist you with any questions, concerns, or inquiries you may have.
          Whether you're looking for more information about our programs,
          admissions, or support, our dedicated team is ready to help.
          <br />
          You can reach us through the following methods:
        </p>
      </div>

      {/* Contact Sections */}
      <div className="md:grid md:grid-cols-3 md:max-w-[1210px] md:m-auto">
        {/* Image 1 */}
        <div className="w-[100%] h-[100%]">
          <img className="w-[100%] h-[100%]" src="https://media.istockphoto.com/id/1410950079/photo/modern-style-classroom-in-the-morning-3d-render.webp?a=1&b=1&s=612x612&w=0&k=20&c=0ZEZY600udpvVeZg84vKFOCIlkbw5FEXhMaVIEP6-Eo=" alt="Contact Us" />
        </div>

        {/* Email Section */}
        <div className="bg-[#747474] text-white text-center space-y-3 p-10 lg:pt-[20%]">
          <div className="h-12 w-12 ring-4 text-4xl p-0.5 ring-white rounded-[50%] m-auto text-center">
            <a href="mailto:oluwagbengaprecious19@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
          <h2 className="font-bold">CONTACT US</h2>
          <div>
            <a
              href="mailto:oluwagbengaprecious19@gmail.com"
              className="hover:text-red-400"
            >
              oluwagbengaprecious19@gmail.com
            </a>
            <br />
            <a
              href="mailto:preciousoluwagbenga19@gmail.com"
              className="hover:text-red-400"
            >
              preciousoluwagbenga19@gmail.com
            </a>
          </div>
        </div>

        {/* Image 2 */}
        <div className="w-[100%] h-[100%]">
          <img className="w-[100%] h-[100%]" src="https://plus.unsplash.com/premium_photo-1683120730432-b5ea74bd9047?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlfGVufDB8fDB8fHww" alt="WhatsApp" />
        </div>

        {/* WhatsApp Section */}
        <div className="bg-[#747474] text-white text-center space-y-3 p-10 lg:pt-[20%]">
          <div className="h-12 w-12 ring-4 text-4xl p-0.5 ring-white rounded-[50%] m-auto text-center">
            <a href="https://wa.me/2348075116141">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
          <h2 className="font-bold">WHATSAPP NO</h2>
          <div>
            <a href="https://wa.me/2348075116141" className="hover:text-red-400">
              +2348075116141
            </a>
          </div>
        </div>

        {/* Image 3 */}
        <div className="w-[100%] h-[100%]">
          <img className="w-[100%] h-[100%]" src="https://media.istockphoto.com/id/2094337676/photo/diverse-team-working-together-in-modern-co-working-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=FbH7i1I3oCXoRfZKFvGj3jMXnsljD8mPmDmvY4IxQuA=" alt="Call Us" />
        </div>

        {/* Call Section */}
        <div className="bg-[#747474] text-white text-center space-y-3 p-10 lg:pt-[20%]">
          <div className="h-12 w-12 ring-4 text-4xl p-0.5 ring-white rounded-[50%] m-auto text-center">
            <a href="tel:+2348164652677">
              <i className="fa-solid fa-phone"></i>
            </a>
          </div>
          <h2 className="font-bold">CALL US</h2>
          <div>
            <a href="tel:+2348164652677" className="hover:text-red-400">
              (+234)8164652677
            </a>
            <br />
            <a href="tel:+2348168430796" className="hover:text-red-400">
              (+234)8168430796
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
