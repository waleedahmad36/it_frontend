import React, { useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import "./CertificateTemplate.css";

const CertificateTemplate = ({ user, selectedQuiz }) => {
  console.log('selected quiz is' , selectedQuiz)
  const certificateRef = useRef(null);

  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        const dataUrl = await toPng(certificateRef.current, { cacheBust: true });
        saveAs(dataUrl, `Certificate_${user.username || "User"}.png`);
      } catch (error) {
        console.error("Error generating certificate image:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 sm:p-6">
      {/* Certificate Container */}
      <div
        ref={certificateRef}
        className="relative bg-white w-full max-w-4xl shadow-2xl overflow-hidden rounded-lg certificate-border p-6 sm:p-10"
        style={{ minHeight: "85vh" }} // Dynamic height for small screens
      >
        {/* Flyover Background */}
        <div className="absolute inset-0 opacity-10 z-0 flyover-bg">
          <h1 className="text-4xl md:text-8xl font-bold text-gray-700 text-center pt-20 md:pt-40 uppercase tracking-wide">
            Precious Tech Academy
          </h1>
        </div>

        {/* Content Area */}
        <div className="relative z-10 text-xs sm:text-sm md:text-base h-full overflow-y-auto">
          {/* Logo and Title */}
          <div className="flex justify-center items-center mb-4 md:mb-6">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full border-4 border-gray-300"
            />
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 uppercase mb-1 md:mb-2">
              Certificate of {selectedQuiz.courseName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">This is to certify that</p>
          </div>

          {/* Recipient Name */}
          <div className="text-center my-4 md:my-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              {user.username || "Muhammad Ahmed"} <br />
              <span className="text-xs sm:text-sm">({user._id})</span>
            </h2>
          </div>

          {/* Certification Details */}
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-600">Has successfully completed the</p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              {selectedQuiz.courseName} and Engineer Program with distinction
            </h3>
          </div>

          {/* Program Details */}
          <div className="mt-4 md:mt-8">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
              Program Details:
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Program Duration:{" "}
              <span className="font-medium">January 1, 2024</span> –{" "}
              <span className="font-medium">June 30, 2024</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Total Hours: <span className="font-medium">500</span> hours
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Program Focus: Front-End Development, Back-End Development,
              Database Management, Cloud Integration, API Design, and more.
            </p>
          </div>

          {/* Recommendation */}
          <div className="mt-4 sm:mt-6">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
              Recommendation:
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We, at <span className="font-medium">Precious Tech Academy</span>,
              highly recommend <span className="font-medium">{user.username || "Muhammad Ahmed"}</span> for any opportunity
              within the software development and engineering field. With
              demonstrated technical skills and problem-solving abilities,{" "}
              <span className="font-medium">{user.username || "Muhammad Ahmed"}</span> is prepared to contribute effectively in any organization worldwide.
            </p>
          </div>

          {/* Footer Information */}
          <div className="flex flex-wrap justify-between items-center mt-6 md:mt-12 ">
            <div className="text-center w-full sm:w-1/2 mb-4 sm:mb-0   relative">
              <p className="text-xs sm:text-sm font-medium text-gray-500 relative">Authorized By</p>
              <div className="mt-1 w-20 sm:w-32 mx-auto border-t border-gray-400"></div>
              <div  className="relative overflow-hidden" >
              <p className="text-xs sm:text-sm mt-1 flex justify-center relative">
              <img src={selectedQuiz.instructor.signature} alt="" />
              </p>
             
              </div>
            </div>

            <div className="text-center w-full sm:w-1/2">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Issued By</p>
              <div className="mt-1 w-20 sm:w-32 mx-auto border-t border-gray-400"></div>
              <img src="/company_signature.png" className="w-10 sm:w-20 mx-auto mt-2" />
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-4 md:mt-6">
            <p className="text-xs sm:text-sm text-gray-400">www.precioustechacademy.com</p>
            <p className="text-xs text-gray-400 mt-1">
              "Empowering education for a brighter future"
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded shadow-lg"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateTemplate;
