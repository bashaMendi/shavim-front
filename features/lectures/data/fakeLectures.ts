import { LectureCardData, LectureDetail } from '../types';

export const fakeLectures: LectureCardData[] = [
  {
    id: '1',
    title: 'מבוא לפיזיקה מודרנית',
    imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '45 דקות',
    rating: 4.7,
  },
  {
    id: '2',
    title: 'היסטוריה של ימי הביניים',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר דני לוי',
    duration: '60 דקות',
    rating: 4.5,
  },
  {
    id: '3',
    title: 'יסודות במדעי המחשב',
    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר גדי פרידמן',
    duration: '50 דקות',
    rating: 4.9,
  },
  {
    id: '4',
    title: 'מבוא לפסיכולוגיה',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר תמר שלו',
    duration: '40 דקות',
    rating: 4.8,
  },
  {
    id: '5',
    title: 'כלכלה עולמית',
    imageUrl: 'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יואב כהן',
    duration: '55 דקות',
    rating: 4.6,
  },
  // More dummy lectures for infinite scroll demonstration
  {
    id: '6',
    title: 'פילוסופיה של המדע',
    imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר אורי בן-דוד',
    duration: '48 דקות',
    rating: 4.4,
  },
  {
    id: '7',
    title: 'מבוא לסוציולוגיה',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רוני לוי',
    duration: '42 דקות',
    rating: 4.3,
  },
  {
    id: '8',
    title: 'אמנות מודרנית',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר מיכל בר',
    duration: '53 דקות',
    rating: 4.7,
  },
  {
    id: '9',
    title: 'מבוא לגיאוגרפיה',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יעל רון',
    duration: '47 דקות',
    rating: 4.2,
  },
  {
    id: '10',
    title: 'מדעי המדינה',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רות בן-צבי',
    duration: '52 דקות',
    rating: 4.5,
  },
  {
    id: '11',
    title: 'משפטים והשפעתם על החברה',
    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר דן רוזן',
    duration: '60 דקות',
    rating: 4.6,
  },
  {
    id: '12',
    title: 'חינוך בעידן הדיגיטלי',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר עדי לוי',
    duration: '44 דקות',
    rating: 4.4,
  },
  {
    id: '13',
    title: 'ספרות עברית',
    imageUrl: 'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רותי כהן',
    duration: '49 דקות',
    rating: 4.3,
  },
  {
    id: '14',
    title: 'כימיה אורגנית',
    imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '55 דקות',
    rating: 4.6,
  },
  {
    id: '15',
    title: 'ביולוגיה של התא',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר ענת ברק',
    duration: '41 דקות',
    rating: 4.7,
  },
  {
    id: '16',
    title: 'מתמטיקה מתקדמת',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '58 דקות',
    rating: 4.9,
  },
  // Additional lectures for testing show more functionality
  {
    id: '101',
    title: 'פיזיקה קוונטית מתקדמת',
    imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '65 דקות',
    rating: 4.8,
  },
  {
    id: '102',
    title: 'תורת היחסות הכללית',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '70 דקות',
    rating: 4.9,
  },
  {
    id: '103',
    title: 'מכניקה קלאסית',
    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '55 דקות',
    rating: 4.7,
  },
  {
    id: '104',
    title: 'אופטיקה ופוטוניקה',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '60 דקות',
    rating: 4.6,
  },
  {
    id: '105',
    title: 'תרמודינמיקה סטטיסטית',
    imageUrl: 'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '75 דקות',
    rating: 4.8,
  },
  {
    id: '106',
    title: 'פיזיקה של חלקיקים',
    imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '80 דקות',
    rating: 4.9,
  },
  {
    id: '107',
    title: 'אסטרופיזיקה',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '90 דקות',
    rating: 4.7,
  },
  {
    id: '201',
    title: 'אלגברה לינארית',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '50 דקות',
    rating: 4.8,
  },
  {
    id: '202',
    title: 'חשבון דיפרנציאלי',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '55 דקות',
    rating: 4.9,
  },
  {
    id: '203',
    title: 'תורת המספרים',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '60 דקות',
    rating: 4.7,
  },
  {
    id: '204',
    title: 'גיאומטריה אנליטית',
    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '45 דקות',
    rating: 4.6,
  },
  {
    id: '205',
    title: 'סטטיסטיקה מתקדמת',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '65 דקות',
    rating: 4.8,
  },
  {
    id: '206',
    title: 'תורת הקבוצות',
    imageUrl: 'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '40 דקות',
    rating: 4.5,
  },
  {
    id: '207',
    title: 'משוואות דיפרנציאליות',
    imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '70 דקות',
    rating: 4.9,
  },
  {
    id: '208',
    title: 'טופולוגיה',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'פרופ׳ מיכל לוי',
    duration: '55 דקות',
    rating: 4.7,
  },
  // Additional lectures for other lecturers
  {
    id: '301',
    title: 'כימיה אי-אורגנית',
    imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '50 דקות',
    rating: 4.6,
  },
  {
    id: '302',
    title: 'ביוכימיה',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '60 דקות',
    rating: 4.7,
  },
  {
    id: '303',
    title: 'סינתזה אורגנית',
    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '65 דקות',
    rating: 4.8,
  },
  {
    id: '304',
    title: 'ספקטרוסקופיה',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '45 דקות',
    rating: 4.5,
  },
  {
    id: '305',
    title: 'כימיה פיזיקלית',
    imageUrl: 'https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '55 דקות',
    rating: 4.6,
  },
  {
    id: '306',
    title: 'פולימרים',
    imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '50 דקות',
    rating: 4.7,
  },
  {
    id: '307',
    title: 'קטליזה',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '40 דקות',
    rating: 4.4,
  },
  {
    id: '308',
    title: 'כימיה קוונטית',
    imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '70 דקות',
    rating: 4.8,
  },
  {
    id: '309',
    title: 'כימיה חישובית',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    lecturerName: 'ד"ר רון מזרחי',
    duration: '60 דקות',
    rating: 4.6,
  },
];

// נתונים מפורטים עבור דף ההרצאה
export const fakeLectureDetails: LectureDetail[] = [
  {
    id: '1',
    title: 'מבוא לפיזיקה מודרנית',
    imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80',
    lecturerId: '1',
    lecturerName: 'ד"ר יוסי כהן',
    duration: '45 דקות',
    rating: 4.7,
    description: `הרצאה מרתקת המביאה את הקהל למסע אל תוך עולם הפיזיקה המודרנית. נחקור יחד את התגליות המהפכניות של המאה ה-20 שהשנו את תפיסתנו את היקום.

בהרצאה נעסוק בנושאים הבאים:
• תורת היחסות הפרטית של איינשטיין
• מכניקה קוונטית והעולם המיקרוסקופי
• מבנה האטום והכוחות הפועלים בו
• אנרגיה גרעינית ושימושיה
• טכנולוגיות מודרניות המבוססות על פיזיקה

ההרצאה מתאימה לכל מי שמתעניין במדע וטכנולוגיה, ללא צורך בידע מוקדם בפיזיקה. נשתמש בדוגמאות מעשיות ואנימציות כדי להמחיש את המושגים המורכבים בצורה ברורה ונגישה.`,
    media: [
      {
        id: '1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
        title: 'מעבדת פיזיקה מודרנית',
        description: 'ציוד מתקדם במעבדת פיזיקה'
      },
      {
        id: '2',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'הסבר על תורת היחסות',
        description: 'סרטון קצר המסביר את עקרונות תורת היחסות',
        thumbnail: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: '3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
        title: 'ניסויי פיזיקה',
        description: 'ניסויים מעשיים בפיזיקה'
      }
    ],
    externalLinks: [
      {
        id: '1',
        title: 'הפיזיקה המודרנית - מאמר מקיף',
        url: 'https://www.sciencedaily.com/news/matter_energy/physics/',
        source: 'Science Daily',
        description: 'מאמר מפורט על התפתחויות בפיזיקה המודרנית'
      },
      {
        id: '2',
        title: 'תורת היחסות למתחילים',
        url: 'https://www.nature.com/subjects/physics',
        source: 'Nature',
        description: 'הסבר פשוט על תורת היחסות של איינשטיין'
      },
      {
        id: '3',
        title: 'מכניקה קוונטית בעברית',
        url: 'https://www.ynet.co.il/news/science',
        source: 'Ynet מדע',
        description: 'מאמר בעברית על מכניקה קוונטית'
      }
    ],
    price: 150,
    category: 'מדעים מדויקים',
    tags: ['פיזיקה', 'מדע', 'טכנולוגיה', 'איינשטיין', 'קוונטים'],
    maxAttendees: 50,
    isOnline: true,
    date: '2024-02-15'
  },
  {
    id: '2',
    title: 'היסטוריה של ימי הביניים',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
    lecturerId: '5',
    lecturerName: 'ד"ר דני לוי',
    duration: '60 דקות',
    rating: 4.5,
    description: `מסע מרתק אל תוך עולם ימי הביניים - תקופה מרתקת בהיסטוריה האנושית שהשפיעה על העולם המודרני שלנו.

בהרצאה נחקור:
• המבנה החברתי של ימי הביניים
• האבירים והמערכת הפיאודלית
• הכנסייה והשפעתה על החברה
• הארכיטקטורה הגותית והאמנות
• מסעות הצלב והשפעתם
• התפתחות הערים והמסחר
• המדע והרפואה בימי הביניים

נשתמש בתמונות, מפות ואיורים כדי להחיות את התקופה ולחשוף את הקהל לעולם מרתק של אבירים, טירות, מנזרים וערים עתיקות.`,
    media: [
      {
        id: '4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        title: 'טירה מימי הביניים',
        description: 'טירה אירופית טיפוסית מימי הביניים'
      },
      {
        id: '5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        title: 'קתדרלה גותית',
        description: 'ארכיטקטורה גותית מרשימה'
      }
    ],
    externalLinks: [
      {
        id: '4',
        title: 'ימי הביניים - תקופה מרתקת',
        url: 'https://www.history.com/topics/middle-ages',
        source: 'History Channel',
        description: 'מאמר מקיף על תקופת ימי הביניים'
      },
      {
        id: '5',
        title: 'האבירים והמערכת הפיאודלית',
        url: 'https://www.britannica.com/topic/feudalism',
        source: 'Encyclopedia Britannica',
        description: 'הסבר על המערכת הפיאודלית'
      }
    ],
    price: 120,
    category: 'היסטוריה',
    tags: ['היסטוריה', 'ימי הביניים', 'אבירים', 'טירות', 'כנסייה'],
    maxAttendees: 40,
    isOnline: false,
    location: 'מוזיאון ישראל, ירושלים',
    date: '2024-02-20'
  },
  {
    id: '3',
    title: 'יסודות במדעי המחשב',
    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80',
    lecturerId: '7',
    lecturerName: 'ד"ר גדי פרידמן',
    duration: '50 דקות',
    rating: 4.9,
    description: `הרצאה מרתקת על יסודות מדעי המחשב והתפתחות הטכנולוגיה הדיגיטלית. נחקור יחד את העקרונות הבסיסיים שעומדים מאחורי כל הטכנולוגיות שאנחנו משתמשים בהן היום.

בהרצאה נעסוק בנושאים הבאים:
• היסטוריה קצרה של המחשבים
• אלגוריתמים ומבני נתונים בסיסיים
• שפות תכנות והתפתחותן
• בינה מלאכותית ולמידת מכונה
• אבטחת מידע וקריפטוגרפיה
• עתיד הטכנולוגיה והשפעתה על החברה

ההרצאה מתאימה לכל מי שמתעניין בטכנולוגיה ורוצה להבין איך המחשבים עובדים. נשתמש בדוגמאות מעשיות והדגמות כדי להמחיש את המושגים.`,
    media: [
      {
        id: '6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
        title: 'מעבדת מחשבים',
        description: 'ציוד מתקדם במעבדת מחשבים'
      },
      {
        id: '7',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'הסבר על אלגוריתמים',
        description: 'סרטון המסביר אלגוריתמים בסיסיים',
        thumbnail: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80'
      }
    ],
    externalLinks: [
      {
        id: '6',
        title: 'מדעי המחשב - המדריך המלא',
        url: 'https://www.computer.org/',
        source: 'IEEE Computer Society',
        description: 'מאמר מקיף על מדעי המחשב'
      },
      {
        id: '7',
        title: 'בינה מלאכותית היום',
        url: 'https://www.technologyreview.com/topic/artificial-intelligence/',
        source: 'MIT Technology Review',
        description: 'מאמר על התפתחויות בבינה מלאכותית'
      }
    ],
    price: 180,
    category: 'טכנולוגיה',
    tags: ['מחשבים', 'טכנולוגיה', 'אלגוריתמים', 'בינה מלאכותית', 'תכנות'],
    maxAttendees: 60,
    isOnline: true,
    date: '2024-02-25'
  },
  {
    id: '4',
    title: 'מבוא לפסיכולוגיה',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    lecturerId: '10',
    lecturerName: 'ד"ר תמר שלו',
    duration: '40 דקות',
    rating: 4.8,
    description: `הרצאה מרתקת על עולם הפסיכולוגיה והנפש האנושית. נחקור יחד את המסתורין של המוח האנושי ואיך הוא משפיע על ההתנהגות שלנו.

בהרצאה נעסוק בנושאים הבאים:
• היסטוריה של הפסיכולוגיה
• תיאוריות אישיות שונות
• פסיכולוגיה התפתחותית
• פסיכולוגיה חברתית
• פסיכולוגיה קלינית
• טכניקות טיפול מודרניות

ההרצאה מתאימה לכל מי שמתעניין בהתנהגות אנושית ורוצה להבין יותר על עצמו ועל אחרים. נשתמש בדוגמאות מעשיות וסיפורים מרתקים.`,
    media: [
      {
        id: '8',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        title: 'מעבדת פסיכולוגיה',
        description: 'מעבדה לחקר התנהגות אנושית'
      }
    ],
    externalLinks: [
      {
        id: '8',
        title: 'פסיכולוגיה מודרנית',
        url: 'https://www.apa.org/',
        source: 'American Psychological Association',
        description: 'מאמר על התפתחויות בפסיכולוגיה'
      }
    ],
    price: 130,
    category: 'מדעי החברה',
    tags: ['פסיכולוגיה', 'נפש', 'התנהגות', 'טיפול', 'מוח'],
    maxAttendees: 45,
    isOnline: true,
    date: '2024-03-01'
  }
]; 