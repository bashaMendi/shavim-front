import { z } from 'zod';

// סכמה להתחברות
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'אימייל הוא שדה חובה')
    .email('אנא הכנס אימייל תקין'),
  password: z
    .string()
    .min(1, 'סיסמא היא שדה חובה')
    .min(6, 'סיסמא חייבת להכיל לפחות 6 תווים'),
});

// סכמה להרשמה
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'שם פרטי הוא שדה חובה')
    .min(2, 'שם פרטי חייב להכיל לפחות 2 תווים'),
  lastName: z
    .string()
    .min(1, 'שם משפחה הוא שדה חובה')
    .min(2, 'שם משפחה חייב להכיל לפחות 2 תווים'),
  email: z
    .string()
    .min(1, 'אימייל הוא שדה חובה')
    .email('אנא הכנס אימייל תקין'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^05\d-?\d{7}$/.test(val), {
      message: 'אנא הכנס מספר טלפון תקין (למשל: 050-1234567)',
    }),
  password: z
    .string()
    .min(1, 'סיסמא היא שדה חובה')
    .min(6, 'סיסמא חייבת להכיל לפחות 6 תווים')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'סיסמא חייבת להכיל אותיות ומספרים'),
  confirmPassword: z
    .string()
    .min(1, 'אימות סיסמא הוא שדה חובה'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'הסיסמאות אינן תואמות',
  path: ['confirmPassword'],
});

// סכמה לשכחתי סיסמא
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'אימייל הוא שדה חובה')
    .email('אנא הכנס אימייל תקין'),
});

// סכמה להרשמת מרצה
export const lecturerApplicationSchema = z.object({
  // פרטים אישיים
  firstName: z
    .string()
    .min(1, 'שם פרטי הוא שדה חובה')
    .min(2, 'שם פרטי חייב להכיל לפחות 2 תווים'),
  lastName: z
    .string()
    .min(1, 'שם משפחה הוא שדה חובה')
    .min(2, 'שם משפחה חייב להכיל לפחות 2 תווים'),
  email: z
    .string()
    .min(1, 'אימייל הוא שדה חובה')
    .email('אנא הכנס אימייל תקין'),
  phone: z
    .string()
    .min(1, 'טלפון הוא שדה חובה')
    .regex(/^05\d-?\d{7}$/, 'אנא הכנס מספר טלפון תקין (למשל: 050-1234567)'),
  password: z
    .string()
    .min(1, 'סיסמא היא שדה חובה')
    .min(6, 'סיסמא חייבת להכיל לפחות 6 תווים')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'סיסמא חייבת להכיל אותיות ומספרים'),
  confirmPassword: z
    .string()
    .min(1, 'אימות סיסמא הוא שדה חובה'),
  
  // פרטים מקצועיים
  bio: z
    .string()
    .min(1, 'ביוגרפיה היא שדה חובה')
    .min(50, 'ביוגרפיה חייבת להכיל לפחות 50 תווים'),
  expertise: z
    .string()
    .min(1, 'תחומי מומחיות הם שדה חובה')
    .min(20, 'תחומי מומחיות חייבים להכיל לפחות 20 תווים'),
  experience: z
    .string()
    .min(1, 'ניסיון מקצועי הוא שדה חובה')
    .min(30, 'ניסיון מקצועי חייב להכיל לפחות 30 תווים'),
  education: z
    .string()
    .optional(),
  certifications: z
    .string()
    .optional(),
  
  // פרטי הרצאות
  lectureTopics: z
    .string()
    .optional(),
  targetAudience: z
    .string()
    .optional(),
  lectureDuration: z
    .string()
    .optional(),
  priceRange: z
    .string()
    .optional(),
  
  // זמינות
  availability: z
    .string()
    .optional(),
  preferredDays: z
    .string()
    .optional(),
  preferredTimes: z
    .string()
    .optional(),
  
  // פרטים נוספים
  website: z
    .string()
    .url('אנא הכנס כתובת אתר תקינה')
    .optional()
    .or(z.literal('')),
  linkedin: z
    .string()
    .url('אנא הכנס כתובת LinkedIn תקינה')
    .optional()
    .or(z.literal('')),
  references: z
    .string()
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'הסיסמאות אינן תואמות',
  path: ['confirmPassword'],
});

// טיפוסים נגזרים מהסכמות
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type LecturerApplicationFormData = z.infer<typeof lecturerApplicationSchema>;

// פונקציה עזר להצגת שגיאות Zod
export const getFieldError = (errors: z.ZodError, fieldName: string): string | undefined => {
  const fieldError = errors.errors.find(error => error.path.includes(fieldName));
  return fieldError?.message;
};

// פונקציה עזר לניקוי שגיאות
export const clearFieldError = (errors: z.ZodError, fieldName: string): z.ZodError => {
  const filteredErrors = errors.errors.filter(error => !error.path.includes(fieldName));
  return new z.ZodError(filteredErrors);
}; 