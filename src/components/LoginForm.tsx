
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating authentication
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast({
          title: "התחברת בהצלחה",
          description: "מיד תועבר לדף הבית",
        });
        navigate('/');
      } else {
        toast({
          title: "שגיאת התחברות",
          description: "אנא בדוק את הפרטים שהזנת",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-sea-blue flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-sea-blue text-sm font-bold">🌊</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">sea me</h1>
          <p className="text-gray-500 mt-2">התחבר כדי לגשת לכל התכונות</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-sea-blue focus:outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-sea-blue focus:outline-none transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sea-blue text-white py-3 rounded-lg hover:bg-sea-dark transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Log In"
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            אין לך חשבון?{" "}
            <button 
              onClick={() => navigate('/signup')} 
              className="text-sea-blue hover:underline font-medium"
            >
              הירשם עכשיו
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
