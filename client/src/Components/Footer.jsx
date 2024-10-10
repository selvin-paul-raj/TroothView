// Footer.js
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-5 mt-20 border-t">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} TroothView. All rights reserved.</p>
          <p className="text-gray-400">Follow us on social media</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  