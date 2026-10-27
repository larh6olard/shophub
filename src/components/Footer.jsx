import { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    const time = new Date();
    const timeout = setTimeout(() => {
      setCurrentYear(() => {
        return time.toString();
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="font-bold text-sm text-gray-200 bg-gray-900 py-7 text-center">
      &copy; Larh6olard | {currentYear}
    </div>
  );
};

export default Footer;
