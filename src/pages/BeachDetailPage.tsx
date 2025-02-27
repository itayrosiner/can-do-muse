
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BeachDetails from '@/components/BeachDetails';

// Sample data - in a real app this would come from an API
const beachesDetailData = {
  '1': {
    id: '1',
    name: 'חוף בוגרשוב',
    location: 'תל אביב - יפו',
    description: 'חוף בוגרשוב הוא אחד החופים הפופולריים ביותר בתל אביב. הוא ממוקם במרכז העיר, ליד מלונות ומסעדות רבות. החוף נקי, ישנם שירותי הצלה, מקלחות, ושירותים ציבוריים. בסמוך לחוף יש טיילת פופולרית וגם אזורים מוצלים לפיקניק.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000',
    facilities: ['הצלה', 'מקלחות', 'כסאות נוח', 'מזנון'],
  },
  '2': {
    id: '2',
    name: 'חוף גורדון',
    location: 'תל אביב - יפו',
    description: 'חוף גורדון נמצא בקרבת מלון שרתון ומציע מגוון שירותים כמו מסעדות, ספורט ימי ומצילים. החוף פופולרי בקרב צעירים ותיירים בזכות האווירה התוססת והנוף היפה. ישנם מתקני כושר, מקלחות ושירותים נקיים.',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1000',
    facilities: ['הצלה', 'ספורט ימי', 'מסעדות', 'מתקני כושר'],
  },
  '3': {
    id: '3',
    name: 'חוף הכרמל',
    location: 'חיפה',
    description: 'חוף הכרמל בחיפה מציע אווירה רגועה יותר מחופי תל אביב, עם נוף מרהיב להר הכרמל. החוף נקי ומסודר, עם שירותי הצלה בעונת הרחצה. יש כאן מסעדות דגים מצוינות וטיילת נעימה להליכה. המקום מתאים למשפחות ולמי שמחפש שקט יחסי.',
    imageUrl: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&q=80&w=1000',
    facilities: ['הצלה', 'טיילת', 'מסעדות דגים', 'חניה חינם'],
  },
  '4': {
    id: '4',
    name: 'חוף אכזיב',
    location: 'נהריה',
    description: 'חוף אכזיב הוא פנינה טבעית בצפון ישראל. החוף מציע מפרצים קטנים עם מים צלולים, ריפי סלעים וצמחייה ים תיכונית. זהו מקום מצוין לשנרקול ולצפייה בדגים. בסמוך נמצא גן לאומי אכזיב עם שרידים ארכיאולוגיים. החוף מתאים למשפחות ולאוהבי טבע.',
    imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=1000',
    facilities: ['שנרקול', 'פיקניק', 'גן לאומי סמוך', 'חניה'],
  },
  '5': {
    id: '5',
    name: 'חוף פלמחים',
    location: 'רחובות',
    description: 'חוף פלמחים הוא חוף טבעי יחסית, מרוחק מהמולת העיר. החוף מוקף במצוקים ובצמחייה, ומציע פינות מבודדות ושקטות. זהו מקום מצוין לצפייה בשקיעה ולפיקניקים. בעונת הרחצה יש שירותי הצלה, אך החוף פחות מפותח מבחינת תשתיות.',
    imageUrl: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80&w=1000',
    facilities: ['הצלה בעונה', 'פיקניק', 'נוף מרהיב', 'ללא מסחר'],
  },
};

const BeachDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [beach, setBeach] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    setTimeout(() => {
      if (id && beachesDetailData[id as keyof typeof beachesDetailData]) {
        setBeach(beachesDetailData[id as keyof typeof beachesDetailData]);
      }
      setIsLoading(false);
    }, 800);
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-56 bg-gray-200" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded-md w-2/3 mb-2" />
          <div className="h-4 bg-gray-100 rounded-md w-1/3 mb-6" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded-md w-full" />
            <div className="h-3 bg-gray-100 rounded-md w-full" />
            <div className="h-3 bg-gray-100 rounded-md w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!beach) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">החוף לא נמצא</h1>
          <p className="text-gray-500 mb-4">אנחנו לא מצליחים למצוא את החוף שחיפשת</p>
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-sea-blue text-white rounded-lg"
          >
            חזרה
          </button>
        </div>
      </div>
    );
  }

  return <BeachDetails beach={beach} />;
};

export default BeachDetailPage;
