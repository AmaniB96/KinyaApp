"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) router.push(redirectTo);
  }, [session, status, router, redirectTo]);

  if (status === "loading") {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: 'var(--color-text-muted)'
      }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return children;
};

export default ProtectedRoute;