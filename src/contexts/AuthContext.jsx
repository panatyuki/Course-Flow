import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_SECRET);
// Create the context
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSession(session);
    return { session, error };
  };

  const logout = async() => {
    const { error } = await supabase.auth.signOut();
    if (session) {
      navigate('/');
    }
    else {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, supabase, login, logout }}>
      {!loading && children}
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