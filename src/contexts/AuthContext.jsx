import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_SECRET);
// Create the context
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
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
    <AuthContext.Provider value={{ session, supabase, login, logout, user }}>
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