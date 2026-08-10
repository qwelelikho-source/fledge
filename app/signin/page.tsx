import { redirect } from "next/navigation";

export default function SignInPage() {
  // This page now redirects to the auth page
  // The middleware will handle the redirect logic if user is already authenticated
  redirect("/auth");
}
