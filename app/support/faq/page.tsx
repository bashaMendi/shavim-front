// app/support/faq/page.tsx
export default function FAQPage() {
  const faqs = [
    {
      question: 'איך אני מזמין מרצה?',
      answer:
        'אתה יכול ללחוץ על עמוד "מרצים", לבחור מרצה מהרשימה, ולמלא את טופס ההזמנה בעמוד שלו.',
    },
    {
      question: 'איך אני יוצר קשר עם התמיכה?',
      answer:
        'אתה מוזמן להשתמש בצ’אט התמיכה בעמוד “צ’אט תמיכה” או למלא טופס בעמוד “צור קשר”.',
    },
    {
      question: 'האם יש עלות לשימוש בפלטפורמה?',
      answer:
        'הרשמה וצפייה בקטלוג המרצים חינם. עלות ההרצאות נקבעת ישירות מול המרצים בהתאם לתמחור שלהם.',
    },
    // הוסיפו פה עוד שאלות ותשובות כראות עיניכם
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">שאלות נפוצות (FAQ)</h1>
      {faqs.map((faq, idx) => (
        <div key={idx} className="space-y-2">
          <h2 className="text-xl font-semibold">{faq.question}</h2>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
