'use client'
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthGuard(allowedRoles = []) {
  const user = useSelector(state => state.user.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized"); // optional unauthorized page
    }
  }, [user, router, allowedRoles]);
}
