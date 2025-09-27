import supabase from "../supabase-clients";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-sm w-full p-8 mt-10 bg-white rounded-lg shadow-lg">
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Welcome!</h2>
        <button
          onClick={signOut}
          className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 active:bg-red-700 transition duration-200"
        >
          Sign out
        </button>
      </div>
    );
  }
};

export default SignIn;
