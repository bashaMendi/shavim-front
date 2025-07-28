'use client';
import { useState } from 'react';
import { Card, Input, Textarea } from '@/components/ui';
import { Mail, Send, User, Phone, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // כאן יהיה שליחה לבאק - כרגע רק console.log
      console.log('Contact form submitted:', formData);
      
      // סימולציה של שליחה לבאק
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 shadow-lg mb-4 mx-auto">
          <Mail size={40} className="text-purple-600" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-br from-purple-600 via-blue-600 to-red-600 bg-clip-text text-transparent mb-4">
          צור קשר
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          אנחנו כאן בשבילך! צוות שווים בהרצאה זמין לכל שאלה, ייעוץ או תמיכה טכנית. 
          נשמח לסייע לך לבחור את ההרצאה המתאימה או לעזור בכל עניין אחר.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* טופס יצירת קשר */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
            <MessageSquare className="ml-2 text-purple-600" size={24} />
            שלח לנו הודעה
          </h2>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="שם מלא *"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="שם מלא"
                icon={<User className="text-purple-500" size={18} />}
              />

              <Input
                label="אימייל *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="כתובת אימייל"
                icon={<Mail className="text-blue-900" size={18} />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="טלפון"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="מספר טלפון"
                icon={<Phone className="text-green-500" size={18} />}
              />

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  נושא *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                >
                  <option value="">בחר נושא</option>
                  <option value="הזמנת הרצאה">הזמנת הרצאה</option>
                  <option value="ייעוץ והמלצות">ייעוץ והמלצות</option>
                  <option value="תמיכה טכנית">תמיכה טכנית</option>
                  <option value="שיתוף פעולה">שיתוף פעולה</option>
                  <option value="משוב והצעות">משוב והצעות</option>
                  <option value="אחר">אחר</option>
                </select>
              </div>
            </div>

            <Textarea
              label="הודעה *"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              placeholder="תאר את הפנייה שלך בפירוט..."
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  שולח...
                </>
              ) : (
                <>
                  <Send size={18} />
                  שלח הודעה
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* פרטי קשר */}
        <div className="space-y-6">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">שעות פעילות</h3>
            <div className="space-y-2 text-gray-600">
              <p className="flex justify-between">
                <span>ראשון - חמישי:</span>
                <span className="font-medium">9:00 - 18:00</span>
              </p>
              <p className="flex justify-between">
                <span>שישי:</span>
                <span className="font-medium">9:00 - 14:00</span>
              </p>
              <p className="flex justify-between">
                <span>שבת:</span>
                <span className="font-medium">סגור</span>
              </p>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700 text-center">
                נשמח לשמוע ממך, לקבל משוב, רעיונות, או כל פנייה אחרת
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <Mail className="ml-2 text-purple-600" size={24} />
              פרטי קשר
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="text-white" size={16} />
                </div>
                <div className="mr-3">
                  <p className="text-sm text-gray-600">אימייל</p>
                  <a href="mailto:info@shavim-platform.co.il" className="text-purple-600 hover:text-purple-700 font-medium">
                    info@shavim-platform.co.il
                  </a>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="text-white" size={16} />
                </div>
                <div className="mr-3">
                  <p className="text-sm text-gray-600">טלפון</p>
                  <a href="tel:03-1234567" className="text-blue-600 hover:text-blue-700 font-medium">
                    03-1234567
                  </a>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-red-50 to-purple-50 rounded-lg border border-red-100">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="text-white" size={16} />
                </div>
                <div className="mr-3">
                  <p className="text-sm text-gray-600">נייד</p>
                  <a href="tel:054-7654321" className="text-red-600 hover:text-red-700 font-medium">
                    054-7654321
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
