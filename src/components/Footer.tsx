// footer
'use client';
import Feedback from './Feedback';
import FooterLinks from './ui/footerLinks';

const Footer = () => {
  return (
    <footer className='w-full flex flex-col sm:flex-row items-center justify-between px-6 py-4 transition-colors duration-300 border-t dark:border-white/30 border-black/30 gap-2 sm:gap-0 '>
      <span className='text-sm opacity-75'>
        © {new Date().getFullYear()} Frontend Interview Hub
      </span>
      <Feedback />
      <FooterLinks />
    </footer>
  );
};

export default Footer;
