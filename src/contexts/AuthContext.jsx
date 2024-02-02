import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://vvzqftccddhgehcywozf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2enFmdGNjZGRoZ2VoY3l3b3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDkzNTIsImV4cCI6MjAyMjEyNTM1Mn0.G3EOy8VQgSV-u-lCrZnbt1yapL6U9keJqcf-tW-zKd4');
// Create the context
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { session, error };
  };

  return (
    <AuthContext.Provider value={{ session, supabase, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create Custom Hooks
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};