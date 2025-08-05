export type LectureCardData = {
  id: string;
  title: string;
  imageUrl: string;
  lecturerName: string;
  duration: string; // לדוג' "45 דקות"
  rating: number; // מספר בין 1-5 עם אפשרות למספר עשרוני
};

export type Lecturer = {
  id: string;
  name: string;
  topic: string;
  imageUrl: string;
  rating: number; // מספר בין 1-5 עם אפשרות למספר עשרוני
  bio: string; // סיפור המרצה
  lectures: string[]; // רשימת ID של ההרצאות של המרצה
  location: string; // מיקום המרצה
};

// טיפוסים חדשים עבור דף ההרצאה המפורט
export type LectureDetail = {
  id: string;
  title: string;
  imageUrl: string;
  lecturerId: string;
  lecturerName: string;
  duration: string;
  rating: number;
  description: string; // תיאור מפורט של ההרצאה
  media: LectureMedia[];
  externalLinks: ExternalLink[];
  price: number; // מחיר ההרצאה
  category: string; // קטגוריה של ההרצאה
  tags: string[]; // תגיות להרצאה
  maxAttendees?: number; // מספר מקסימלי של משתתפים
  isOnline: boolean; // האם ההרצאה מתקיימת אונליין
  location?: string; // מיקום ההרצאה (אם לא אונליין)
  date?: string; // תאריך ההרצאה
};

export type LectureMedia = {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description?: string;
  thumbnail?: string; // תמונה ממוזערת לוידאו
};

export type ExternalLink = {
  id: string;
  title: string;
  url: string;
  source: string; // שם האתר המקור
  description?: string;
}; 