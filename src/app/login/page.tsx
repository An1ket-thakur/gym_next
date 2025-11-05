"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      // const response = await fetch(`api/auth/login`, {
      //   method: "POST",
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      // console.log("Response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="relative bg-[url('/gym-bg.jpeg')] bg-cover bg-center min-h-dvh flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <Card className="w-full border-border bg-white/10 backdrop-blur-xl border border-white/20d text-card-foreground rounded-xl shadow-xl">
          <CardHeader className="text-center space-y-2 px-6 pt-6">
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm sm:text-base">
              Sign in to continue your fitness journey
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border-input focus-visible:ring-ring"
                />
              </div>

              {/* Password */}
              <div className="space-y-1 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-transparent border-input focus-visible:ring-ring pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[34px] text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold lg:text-lg py-3 rounded-xl shadow-md shadow-primary/30"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="h-px bg-border flex-1" />
                <span className="text-muted-foreground text-sm">or continue with</span>
                <div className="h-px bg-border flex-1" />
              </div>

              {/* Google Button */}
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 font-semibold bg-accent-foreground dark:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 dark:text-black"
                  fill="currentColor"
                >
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
