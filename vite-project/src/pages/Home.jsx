import React, { useState, useEffect } from "react";
import Todo from "./todo";
import Navbar from "../components/Navbar";
import supabase from "../supabase-clients";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/signin"); // Redirect to SignIn if no session exists
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/signin"); // Redirect to SignIn if session becomes invalid
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Todo />
    </div>
  );
};

export default Home;
