'use client';

import Image from 'next/image';
import { Users, Accessibility, Star, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-purple-600 via-blue-600 to-red-600 bg-clip-text text-transparent mb-8">
            אודות שווים בהרצאה
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              "שווים בהרצאה" הוא מיזם חברתי פורץ דרך שנולד מתוך סיפור חיים אישי של נורית פלג וולברג – יו"ר ומייסדת המיזם, נורית נולדה עם מחלה גנטית נדירה, ומספרת בהרצאותיה "צמחתי מתוכה ומקדישה את חיי לקידום שוויון לאנשים עם מוגבלות".
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              מירב אביטן זרחיה מנהלת הכללית של המיזם, עברה מסע אישי מורכב של התמודדות עם מחלת ניוון שרירים שהחלה בגיל 40, והפכה את אתגרי חייה למקור השראה, חוסן ואופטימיות. מתוך הרצון להעביר את כוחה של המילה, היא מרצה על "נגישות ורגישות", לקחה את הכאב הכי גדול שלה ולהפוך אותו למשימת חיים שמשנה לאחרים.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">המהפכה השקטה</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                "שווים בהרצאה" זה לא סתם מיזם, זו מהפכה שקטה. זה מקום שבו אנשים עם מוגבלות מגיעים לא בתור "מקבלי עזרה" אלא בתור מרצים מקצועיים, מנהיגים, מעוררי השראה.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                המיזם שואף לקדם תעסוקה שוויונית, הכלה אמיתית, והעלאת המודעות לשוויון זכויות – באמצעות הרצאות מגוונות ומעשירות שנוגעות בלב, מעוררות חשיבה ומשנות תודעה.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                כ-70 המרצים במיזם מגיעים מכל הארץ ומרקעים שונים – נכות פיזית, חושית, נפשית או קוגניטיבית – ויחד עם זאת, לכולם מכנה משותף: חוסן אישי, אמונה, השראה ורצון עז להשפיע על החברה לטובה.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">הכוח שמאחורי הקול</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              הכירו את חברי ההנהלה של "שווים בהרצאה" מיזם חברתי פורץ דרך
            </p>
            <p className="text-lg text-gray-700 mt-6 max-w-4xl mx-auto">
              מאחורי מיזם "שווים בהרצאה" עומדת קבוצה מעוררת השראה של מנהיגים, מנהיגות ואנשי מקצוע עם סיפור אישי, חזון ברור ולב ענק. כל אחד ואחת מהם מביאים איתם ניסיון חיים, מומחיות ותשוקה אדירה לשוויון, הכלה ושינוי חברתי אמיתי.
            </p>
          </div>

          {/* Leadership Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* נורית פלג וולברג */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/assets/founder-shavim.jpg"
                    alt="נורית פלג וולברג"
                    fill
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">נורית פלג וולברג</h3>
                <p className="text-purple-600 font-semibold">יו"ר ומייסדת המיזם</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                נולדה עם מחלה גנטית נדירה, צמחתי מתוכה ומקדישה את חייה לקידום שוויון לאנשים עם מוגבלות. נורית גם סופרת, מידענית ופעילה חברתית. מייסדת "שווים בהרצאה" שמובילה אותו בתשוקה, יצירתיות ואופטימיות מדבקת.
              </p>
            </div>

            {/* מירב אביטן זרחיה */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/assets/manager-shavim.png"
                    alt="מירב אביטן זרחיה"
                    fill
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">מירב אביטן זרחיה</h3>
                <p className="text-blue-600 font-semibold">מנהלת כללית</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                אישה מעוררת השראה שמתמודדת עם מחלת שרירים ניוונית ומתניידת בכיסא גלגלים ממונע. מרצה על נגישות, חוסן אישי, והיכולת למצוא משמעות גם ברגעים הקשים ביותר.
              </p>
            </div>

            {/* אמיר פינטו */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                    alt="אמיר פינטו"
                    fill
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">אמיר פינטו</h3>
                <p className="text-green-600 font-semibold">יועץ עסקי וטכנולוגי</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                קטוע רגל בעקבות תאונת אופנוע, שהפך את המשבר האישי למנוע של משמעות, העצמה והצלחה. מרצה מטלטל ומעורר השראה, מלווה את המיזם בתבונה עסקית, טכנולוגית וחזון אנושי עמוק.
              </p>
            </div>

            {/* עו"ד רינת ברוך */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80"
                    alt="עו&quot;ד רינת ברוך"
                    fill
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">עו"ד רינת ברוך</h3>
                <p className="text-red-600 font-semibold">יועצת משפטית</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                האישה הראשונה בישראל עם שיתוק מוחין שהוסמכה כעורכת דין. מייצגת אותנו בכבוד בכנסת ועוד. דרך סיפור חייה היא מנגישה את עולם הזכויות של אנשים עם מוגבלות.
              </p>
            </div>

            {/* רפי אוברגוט */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                    alt="רפי אוברגוט"
                    fill
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">רפי אוברגוט</h3>
                <p className="text-indigo-600 font-semibold">יועץ בכיר</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                מייסד מיזם "עתיד לצמיד", פועל ליצירת ביטחון ועצמאות כלכלית למשפחות לילדים עם צרכים מיוחדים. חבר הנהלה שמביא איתו נשמה, חזון וניסיון ניהולי וחינוכי עשיר.
              </p>
            </div>

            {/* הראל גייסלר */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                    alt="הראל גייסלר"
                    fill
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">הראל גייסלר</h3>
                <p className="text-orange-600 font-semibold">פיתוח עסקי</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                יועץ עסקי וכלכלי, עובד על מודל עסקי והקשרים וההזדמנויות של הלקוחות העתידיים. מביא ניסיון עסקי עשיר וחזון אסטרטגי למיזם.
              </p>
            </div>

            {/* שיאית חבושה */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
                    alt="שיאית חבושה"
                    fill
                    className="rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">שיאית חבושה</h3>
                <p className="text-teal-600 font-semibold">תוכן וזהות המותג</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                מרצה ומטפלת בכלים אנרגטיים, שחייה הובילו אותה למסע תודעתי וצמיחה מתוך התמודדות עם מחלה גנטית נדירה. מביאה עומק רוחני ויצירתיות למיזם.
              </p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl">
            <p className="text-lg text-gray-700 mb-4">
              <strong>צוות ההנהלה</strong> – הם הראש הגדול והלב הפועם של "שווים בהרצאה". גאים להיות מרצים בשווים בהרצאה ולקדם מיזם חברתי פורץ דרך.
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              אז תודה גדולה לכל אחד ואחת מהם. כולם עובדים בהתנדבות.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">החזון שלנו</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              אנחנו מאמינים שבכל אדם יש סיפור שיכול לשנות חיים – וכשנותנים לו במה שווה, הוא גם מצליח לשנות את המציאות.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              המיזם שואף לקדם תעסוקה שוויונית, הכלה אמיתית, והעלאת המודעות לשוויון זכויות – באמצעות הרצאות מגוונות ומעשירות שנוגעות בלב, מעוררות חשיבה ומשנות תודעה.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              בהרצאות שלנו תוכלו לפגוש את סט של מרצים מעוררי השראה מכל תחומי החיים – חינוך, תרבות, חדשנות, ספורט, אקטיביזם, עסקים ועוד – שמביאים קול אחר, מבט אחר, ועומק אישי שלא ניתן ללמד מספרים.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">הערכים שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Accessibility className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">הנגשה מלאה</h3>
              <p className="text-gray-600">לכל משתמש, בכל מכשיר</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">שוויון והכלה</h3>
              <p className="text-gray-600">כל אחד יכול להרצות ולהאזין</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">העצמה אישית</h3>
              <p className="text-gray-600">במה לסיפורים ייחודיים</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">שירות מכל הלב</h3>
              <p className="text-gray-600">יחס אישי ומקצועי</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 