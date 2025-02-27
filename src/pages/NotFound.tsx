
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 rtl">
      <div className="text-center p-8 max-w-md">
        <div className="text-9xl font-bold text-sea-blue/30 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">הדף לא נמצא</h1>
        <p className="text-xl text-gray-600 mb-8">
          הדף שחיפשת לא קיים או שהוסר
        </p>
        <a 
          href="/" 
          className="inline-block bg-sea-blue text-white px-6 py-3 rounded-lg hover:bg-sea-dark transition-colors"
        >
          חזרה לדף הבית
        </a>
      </div>
    </div>
  );
};

export default NotFound;
