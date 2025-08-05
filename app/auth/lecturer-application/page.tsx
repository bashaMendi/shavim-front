'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { 
  lecturerApplicationSchema,
  getFieldError,
  type LecturerApplicationFormData
} from '@/lib/validations';

export default function LecturerApplication() {
  const [formData, setFormData] = useState<LecturerApplicationFormData>({
    // פרטים אישיים
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // פרטים מקצועיים
    bio: '',
    expertise: '',
    experience: '',
    education: '',
    certifications: '',
    
    // פרטי הרצאות
    lectureTopics: '',
    targetAudience: '',
    lectureDuration: '',
    priceRange: '',
    
    // זמינות
    availability: '',
    preferredDays: '',
    preferredTimes: '',
    
    // פרטים נוספים
    website: '',
    linkedin: '',
    references: ''
  });

  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (validationErrors) {
      const fieldError = validationErrors.errors.find(error => error.path.includes(name));
      if (fieldError) {
        const filteredErrors = validationErrors.errors.filter(error => !error.path.includes(name));
        setValidationErrors(filteredErrors.length > 0 ? new z.ZodError(filteredErrors) : null);
      }
    }
  };

  const validateForm = () => {
    try {
      lecturerApplicationSchema.parse(formData);
      setValidationErrors(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSuccessMessage('');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Lecturer application:', formData);
        setSuccessMessage('הבקשה נשלחה בהצלחה! נציג יצור איתך קשר תוך 48 שעות.');
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
            bio: '', expertise: '', experience: '', education: '', certifications: '',
            lectureTopics: '', targetAudience: '', lectureDuration: '', priceRange: '',
            availability: '', preferredDays: '', preferredTimes: '',
            website: '', linkedin: '', references: ''
          });
        }, 3000);
        
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">הרשמה כמרצה</h2>
          <p className="text-gray-600">הצטרף לקהילת המרצים המובילים שלנו</p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-center font-medium">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* פרטים אישיים */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">פרטים אישיים</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="שם פרטי *"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'firstName') : undefined}
                  placeholder="ישראל"
                  required
                />
                <Input
                  label="שם משפחה *"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'lastName') : undefined}
                  placeholder="כהן"
                  required
                />
                <Input
                  label="אימייל *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'email') : undefined}
                  placeholder="your@email.com"
                  required
                />
                <Input
                  label="טלפון *"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'phone') : undefined}
                  placeholder="050-1234567"
                  required
                />
                <Input
                  label="סיסמא *"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'password') : undefined}
                  placeholder="••••••••"
                  required
                />
                <Input
                  label="אימות סיסמא *"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'confirmPassword') : undefined}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* פרטים מקצועיים */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">רקע מקצועי</h3>
              <div className="space-y-4">
                <Textarea
                  label="ביוגרפיה מקצועית *"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'bio') : undefined}
                  placeholder="ספר על עצמך, הרקע המקצועי שלך והניסיון שלך בתחום..."
                  rows={4}
                  required
                />
                <Textarea
                  label="תחומי מומחיות *"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'expertise') : undefined}
                  placeholder="פרט את תחומי המומחיות שלך, הנושאים שאתה מרצה עליהם..."
                  rows={3}
                  required
                />
                <Textarea
                  label="ניסיון מקצועי *"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'experience') : undefined}
                  placeholder="תאר את הניסיון שלך בהרצאות, מספר שנים, סוגי קהלים..."
                  rows={3}
                  required
                />
                <Textarea
                  label="השכלה ותעודות"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'education') : undefined}
                  placeholder="תארים, תעודות, הסמכות רלוונטיות..."
                  rows={2}
                />
                <Textarea
                  label="אישורים ותעודות נוספות"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'certifications') : undefined}
                  placeholder="תעודות מקצועיות, הסמכות, פרסים..."
                  rows={2}
                />
              </div>
            </div>

            {/* פרטי הרצאות */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">פרטי הרצאות</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Textarea
                  label="נושאי הרצאות"
                  name="lectureTopics"
                  value={formData.lectureTopics}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'lectureTopics') : undefined}
                  placeholder="רשימת נושאי ההרצאות שלך..."
                  rows={3}
                />
                <Textarea
                  label="קהל יעד"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'targetAudience') : undefined}
                  placeholder="סוגי קהלים שאתה מרצה בפניהם..."
                  rows={3}
                />
                <Select
                  label="משך הרצאה מועדף"
                  name="lectureDuration"
                  value={formData.lectureDuration}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'lectureDuration') : undefined}
                >
                  <option value="">בחר משך הרצאה</option>
                  <option value="30min">30 דקות</option>
                  <option value="45min">45 דקות</option>
                  <option value="60min">שעה</option>
                  <option value="90min">שעה וחצי</option>
                  <option value="120min">שעתיים</option>
                  <option value="custom">מותאם אישית</option>
                </Select>
                <Select
                  label="טווח מחירים"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'priceRange') : undefined}
                >
                  <option value="">בחר טווח מחירים</option>
                  <option value="500-1000">500-1,000 ₪</option>
                  <option value="1000-2000">1,000-2,000 ₪</option>
                  <option value="2000-5000">2,000-5,000 ₪</option>
                  <option value="5000+">5,000+ ₪</option>
                  <option value="custom">מותאם אישית</option>
                </Select>
              </div>
            </div>

            {/* זמינות */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">זמינות</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="זמינות כללית"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'availability') : undefined}
                >
                  <option value="">בחר זמינות</option>
                  <option value="full-time">משרה מלאה</option>
                  <option value="part-time">משרה חלקית</option>
                  <option value="weekends">סופי שבוע בלבד</option>
                  <option value="evenings">ערבים בלבד</option>
                  <option value="flexible">גמיש</option>
                </Select>
                <Input
                  label="ימים מועדפים"
                  type="text"
                  name="preferredDays"
                  value={formData.preferredDays}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'preferredDays') : undefined}
                  placeholder="א', ב', ג'..."
                />
                <Input
                  label="שעות מועדפות"
                  type="text"
                  name="preferredTimes"
                  value={formData.preferredTimes}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'preferredTimes') : undefined}
                  placeholder="09:00-17:00"
                />
              </div>
            </div>

            {/* פרטים נוספים */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">פרטים נוספים</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="אתר אישי"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'website') : undefined}
                  placeholder="https://your-website.com"
                />
                <Input
                  label="LinkedIn"
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'linkedin') : undefined}
                  placeholder="https://linkedin.com/in/your-profile"
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="המלצות/אנשי קשר"
                    name="references"
                    value={formData.references}
                    onChange={handleInputChange}
                    error={validationErrors ? getFieldError(validationErrors, 'references') : undefined}
                    placeholder="פרטים של אנשים שיכולים להמליץ עליך..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <Button 
                type="submit" 
                className="w-full md:w-auto px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'שולח בקשה...' : 'שלח בקשה להרשמה'}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            יש לך כבר חשבון?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 underline">
              התחבר כאן
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 