'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  loginSchema, 
  registerSchema, 
  forgotPasswordSchema,
  getFieldError,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData
} from '@/lib/validations';

export default function Login() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData & RegisterFormData & ForgotPasswordFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Set initial mode based on URL parameter
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'register') {
      setIsLogin(false);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (showForgotPassword) {
        forgotPasswordSchema.parse(formData);
      } else if (isLogin) {
        loginSchema.parse(formData);
      } else {
        registerSchema.parse(formData);
      }
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Handle form submission based on current mode
        if (showForgotPassword) {
          console.log('Forgot password for:', formData.email);
          setSuccessMessage('קישור לאיפוס סיסמא נשלח לאימייל שלך');
          // TODO: Implement forgot password logic
        } else if (isLogin) {
          console.log('Login:', { email: formData.email, password: formData.password });
          setSuccessMessage('מתחבר...');
          // TODO: Implement login logic
        } else {
          console.log('Register:', { ...formData });
          setSuccessMessage('החשבון נוצר בהצלחה!');
          // TODO: Implement registration logic
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''
    });
    setValidationErrors(null);
  };

  const scrollToForm = () => {
    // Scroll to top of the page instead of just the form
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setShowForgotPassword(false);
    resetForm();
    // Scroll to form after state update
    setTimeout(scrollToForm, 100);
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setShowForgotPassword(false);
    resetForm();
    // Scroll to form after state update
    setTimeout(scrollToForm, 100);
  };

  const switchToForgotPassword = () => {
    setShowForgotPassword(true);
    resetForm();
    // Scroll to form after state update
    setTimeout(scrollToForm, 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm">
        {/* Logo/Brand - Google Style */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-normal text-gray-900 mb-2">
            {showForgotPassword ? 'שכחתי סיסמא' : isLogin ? 'התחברות' : 'יצירת חשבון'}
          </h2>
          {/* {!showForgotPassword && (
            <p className="text-sm text-gray-600">
              {isLogin ? 'המשך לשווים' : 'המשך לשווים'}
            </p>
          )} */}
        </div>

        {/* Main Form Card - Google Style */}
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm">
              <p className="text-green-800 text-center">{successMessage}</p>
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {showForgotPassword ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  הכנס את כתובת האימייל שלך ונשלח לך קישור לאיפוס הסיסמא
                </p>
                <Input
                  label="אימייל"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'email') : undefined}
                  placeholder="your@email.com"
                  required
                  className="h-12"
                />
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    חזור להתחברות
                  </button>
                  <Button 
                    type="submit" 
                    className="px-6 h-9 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'שולח...' : 'שלח קישור לאיפוס'}
                  </Button>
                </div>
              </>
            ) : (
              <>
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="שם פרטי"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={validationErrors ? getFieldError(validationErrors, 'firstName') : undefined}
                      placeholder="ישראל"
                      required
                      className="h-12"
                    />
                    <Input
                      label="שם משפחה"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={validationErrors ? getFieldError(validationErrors, 'lastName') : undefined}
                      placeholder="כהן"
                      required
                      className="h-12"
                    />
                  </div>
                )}

                <Input
                  label="אימייל"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'email') : undefined}
                  placeholder="your@email.com"
                  required
                  className="h-12"
                />

                {!isLogin && (
                  <Input
                    label="טלפון (אופציונלי)"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={validationErrors ? getFieldError(validationErrors, 'phone') : undefined}
                    placeholder="050-1234567"
                    className="h-12"
                  />
                )}

                <Input
                  label="סיסמא"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={validationErrors ? getFieldError(validationErrors, 'password') : undefined}
                  placeholder="••••••••"
                  required
                  className="h-12"
                />

                {!isLogin && (
                  <Input
                    label="אימות סיסמא"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={validationErrors ? getFieldError(validationErrors, 'confirmPassword') : undefined}
                    placeholder="••••••••"
                    required
                    className="h-12"
                  />
                )}

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-10 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? 'מעבד...' 
                      : isLogin 
                        ? 'התחבר' 
                        : 'צור חשבון'
                    }
                  </Button>
                </div>

                {isLogin && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={switchToForgotPassword}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      שכחתי סיסמא
                    </button>
                  </div>
                )}
              </>
            )}
          </form>

          {/* Social Login - Google Style */}
          {!showForgotPassword && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">או</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 flex items-center justify-center gap-3 text-sm border-gray-300 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  המשך עם Google
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mode Switch - Google Style */}
        {!showForgotPassword && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {isLogin ? 'אין לך חשבון?' : 'יש לך כבר חשבון?'}{' '}
              <button
                type="button"
                onClick={isLogin ? switchToRegister : switchToLogin}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {isLogin ? 'צור חשבון' : 'התחבר'}
              </button>
            </p>
          </div>
        )}

        {/* Lecturer Application Link - Clear and Prominent */}
        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">רוצה להיות מרצה?</h3>
            <p className="text-xs text-blue-700 mb-3">
              הצטרף לקהילת המרצים שלנו והתחל להרצות
            </p>
            <Link
              href="/auth/lecturer-application"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              הגש בקשה להיות מרצה
            </Link>
          </div>
        </div>

        {/* Footer Links - Google Style */}
        <div className="text-center mt-8 text-xs text-gray-500">
          <div className="flex justify-center space-x-4 space-x-reverse">
            <Link href="/terms" className="hover:text-gray-700">
              תנאי שימוש
            </Link>
            <Link href="/privacy" className="hover:text-gray-700">
              פרטיות
            </Link>
            <Link href="/help" className="hover:text-gray-700">
              עזרה
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
