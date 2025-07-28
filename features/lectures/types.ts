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