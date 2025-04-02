import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Dashboard from "./Dashboard";
import Admin from "./Admin";

const AdminRedirect = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      
      console.log('email',user.email)
      console.log('meetadat',user.user_metadata.email)
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user?.email === "admin@admin.com" ? <Admin /> : <Navigate to="/Component/Admin" />;
};


const DashboardRedirect = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <Dashboard />;
};

export { AdminRedirect, DashboardRedirect };
