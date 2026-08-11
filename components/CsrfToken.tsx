"use client";

import { useEffect, useState } from "react";

export default function CsrfToken() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Fetch CSRF token from server
    fetch("/api/csrf-token")
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch((error) => console.error("Failed to fetch CSRF token:", error));
  }, []);

  return <input type="hidden" name="csrf_token" value={token} />;
}
