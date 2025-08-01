import Link from 'next/link';
import { staticRoutes } from './routes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // קישורים חברתיים
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/shavimplatform',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/shavimplatform',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/shavimplatform',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/shavimplatform',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@shavimplatform',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  // קישורים מהירים
  const quickLinks = [
    { label: 'הרצאות', path: '/lectures' },
    { label: 'הזמנות', path: '/user/bookings' },
    { label: 'שאלות נפוצות', path: '/support/faq' },
    { label: 'צ\'אט תמיכה', path: '/support/chat' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-red-900/80 backdrop-blur-md text-white overflow-hidden border-t border-white/20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      
      <div className="relative container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* מידע על הפלטפורמה */}
          <div className="lg:col-span-1 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  שווים בהרצאה
                </h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                הפלטפורמה המובילה להרצאות איכותיות עם מרצים מקצועיים.
              </p>
            </div>
            
            {/* קישורים חברתיים */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">עקבו אחרינו</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-slate-800/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                    aria-label={social.name}
                  >
                    <div className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* מפת האתר - קישורים ראשיים */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center">
                <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full ml-2"></div>
                ניווט ראשי
              </h3>
              <ul className="space-y-2">
                {staticRoutes.map((route) => (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      className="group flex items-center text-slate-300 hover:text-white transition-all duration-300 hover:-translate-x-1 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <span className="hover:underline decoration-blue-400 decoration-2 underline-offset-4">
                        {route.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* קישורים מהירים */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center">
                <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-blue-400 rounded-full ml-2"></div>
                קישורים מהירים
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="group flex items-center text-slate-300 hover:text-white transition-all duration-300 hover:-translate-x-1 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <span className="hover:underline decoration-green-400 decoration-2 underline-offset-4">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* פרטי קשר */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center">
                <div className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full ml-2"></div>
                צור קשר
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:info@shavim.co.il"
                  className="group flex items-center p-2 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center ml-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">אימייל</p>
                    <p className="text-white font-medium text-sm">info@shavim.co.il</p>
                  </div>
                </a>
                
                <a
                  href="tel:031234567"
                  className="group flex items-center p-2 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center ml-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">טלפון</p>
                    <p className="text-white font-medium text-sm">03-1234567</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* קו מפריד */}
        <div className="relative mt-8 pt-6">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-slate-300 text-xs">
                © {currentYear} שבים בהרצאה. כל הזכויות שמורות.
              </span>
            </div>
            
            <div className="flex space-x-6 space-x-reverse">
              <Link href="/privacy" className="text-slate-400 hover:text-white text-xs transition-colors duration-200 hover:underline decoration-blue-400 decoration-2 underline-offset-4">
                מדיניות פרטיות
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white text-xs transition-colors duration-200 hover:underline decoration-blue-400 decoration-2 underline-offset-4">
                תנאי שימוש
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-white text-xs transition-colors duration-200 hover:underline decoration-blue-400 decoration-2 underline-offset-4">
                עוגיות
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 