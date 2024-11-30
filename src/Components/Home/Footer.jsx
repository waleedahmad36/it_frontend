import { FaBook } from "react-icons/fa";
import { resourcesLinks, platformLinks, communityLinks } from "/src/constants/index";

const Footer = () => {
  return (
    <>
    <div className="bg-gray-900 w-full text-white py-10 px-4 lg:px-10  flex justify-between items-center gap-4 mt-10 flex-wrap pt-20" >
        <div className="flex items-center gap-4"  >
            <FaBook className="text-4xl text-red-600" />
            <div>
                <h3  className="text-2xl font-bold" >Keep up to date — Get e-mail updates</h3>
                <p>Stay tuned for the latest company news.</p>
            </div>
        </div>


        <div  className="flex gap-2 flex-1 flex-wrap lg:flex-nowrap" >
            <input placeholder="Enter e-main address"  className="w-full p-4 rounded-md" />
            <button className="bg-red-600 px-6 py-4 rounded-md text-nowrap">Submit Now</button>
        </div>
    </div>

    <footer className="bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FB1159] transition duration-300"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Platform</h3>
            <ul className="space-y-2">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FB1159] transition duration-300"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Community</h3>
            <ul className="space-y-2">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FB1159] transition duration-300"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="mt-12 text-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <p className="text-sm">
            © 2024 Intellecta Group of Institutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
