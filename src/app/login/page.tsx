"use client";
import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/form/LoginForm";
import Switch from "@/components/ui/ThemeSwitcher";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      sessionStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Theme Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <Switch />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
