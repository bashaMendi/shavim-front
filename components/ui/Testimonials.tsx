'use client';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  imageUrl: string;
  testimonial: string;
  rating: number;
}

// נתונים פייק זמניים - יוחלפו מהבאק
const fakeTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "דנה כהן",
    position: "מנהלת משאבי אנוש",
    company: "טכנולוגיות מתקדמות",
    imageUrl: "",
    testimonial: "הפלטפורמה של שווים בהרצאה שינתה את הדרך שבה אנחנו מכשירים את העובדים שלנו. ההרצאות איכותיות ומגוונות.",
    rating: 5
  },
  {
    id: 2,
    name: "יוסי לוי",
    position: "מנכ\"ל",
    company: "סטארט-אפ ישראלי",
    imageUrl: "",
    testimonial: "מצאו לנו מרצים מעולים בתחום הטכנולוגיה. הצוות מקצועי והשירות מעולה. ממליץ בחום!",
    rating: 5
  },
  {
    id: 3,
    name: "מיכל רוזן",
    position: "מנהלת פיתוח",
    company: "חברת תוכנה",
    imageUrl: "",
    testimonial: "ההרצאות על חדשנות טכנולוגית היו מרתקות. העובדים שלנו עדיין מדברים על זה שבועות אחרי.",
    rating: 5
  },
  {
    id: 4,
    name: "אבי גולדברג",
    position: "מנהל פרויקטים",
    company: "ארגון גדול",
    imageUrl: "",
    testimonial: "שירות מעולה ומקצועי. המרצים איכותיים והתוכן רלוונטי מאוד לצרכים שלנו.",
    rating: 5
  },
  {
    id: 5,
    name: "שרה אברהם",
    position: "מנהלת הדרכה",
    company: "חברת ביטוח",
    imageUrl: "",
    testimonial: "הפלטפורמה פתרה לנו בעיה גדולה במציאת מרצים איכותיים. התהליך פשוט ויעיל.",
    rating: 5
  },
  {
    id: 6,
    name: "דוד שפירא",
    position: "מנהל טכנולוגיות",
    company: "חברת היי-טק",
    imageUrl: "",
    testimonial: "ההרצאות על בינה מלאכותית היו ברמה גבוהה מאוד. המרצים מומחים אמיתיים בתחום.",
    rating: 5
  }
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

export default function Testimonials({ 
  testimonials = fakeTestimonials, 
  title = "לקוחות ממליצים",
  subtitle = "מה הלקוחות שלנו אומרים עלינו"
}: TestimonialsProps) {

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
            >
                             {/* Customer Info - למעלה */}
               <div className="flex flex-col items-center mb-6">
                                   <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                 
                                   <div className="text-center">
                    <h4 className="font-semibold text-gray-900 text-lg mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position} • {testimonial.company}</p>
                  </div>
               </div>

              {/* Testimonial Text - למטה */}
              <blockquote className="text-gray-700 text-center italic leading-relaxed">
                "{testimonial.testimonial}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 