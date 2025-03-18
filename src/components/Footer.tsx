
function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 w-full mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left - Copyright */}
        <p className="text-sm text-gray-400 text-center md:text-left mb-4 md:mb-0 whitespace-nowrap">
          © {new Date().getFullYear()} Richie | All Rights Reserved.
        </p>

        {/* Center - Navigation Links */}
    

        {/* Right - Social Media Links */}
        
      </div>
    </footer>
  );
}

export default Footer;
