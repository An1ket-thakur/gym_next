"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z
  .object({
    username: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Page() {
  const [formData, setFormData] = useState<z.infer<typeof formSchema>>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof formSchema>, string[]>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const result = formSchema.safeParse(formData);
      if (!result.success) {
        const tree = z.treeifyError(result.error);
        const fieldErrors: Record<string, string[]> = {};
        if (tree.properties) {
          for (const [key, obj] of Object.entries(tree.properties)) {
            fieldErrors[key] = obj.errors.map((err) => err);
          }
        }
        setErrors(fieldErrors);
      } else {
        setErrors({});
      }
      const response = await fetch(`api/auth/signup`, { method: "POST", body: JSON.stringify(formData) });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      } else {
        const res = await response.json();
        toast.success(res.message, { position: "top-center", richColors: true });
      }
    } catch (error) {
      toast.error(error?.message, {
        position: "top-center",
        richColors: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative bg-[url('/gym-bg.jpeg')] bg-cover bg-center min-h-dvh overflow-y-auto p-3 overscroll-contains">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 px-5 py-8">
        {/* LEFT Section */}
        <div className="w-full md:w-[40%] space-y-4 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight">UNLEASH</h1>
          <h2 className="bg-gradient-to-r from-green-400 via-blue-400 to-orange-400 text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent">
            YOUR POWER
          </h2>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-md">
            Transform your body, elevate your mind, and conquer your limits with our elite training programs.
          </p>

          <div className="flex flex-wrap max-w-md gap-3 justify-center md:justify-start">
            <Button className="bg-green-500 hover:bg-green-400 text-black font-bold text-base sm:text-lg px-4 py-3 rounded-xl shadow-xl shadow-green-500/30">
              START FREE TRIAL
            </Button>

            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-400 hover:text-black font-bold text-base sm:text-lg px-4 py-3 rounded-xl shadow-lg shadow-green-500/30"
            >
              WATCH DEMO
            </Button>
          </div>
        </div>

        {/* RIGHT Section - Signup Card */}
        <div className="w-full md:w-[40%] flex justify-center">
          <Card className="border-green-500 bg-gradient-to-r from-green-500/10 to-blue-500/5 text-white rounded-xl w-full max-w-md p-6 shadow-lg backdrop-blur-md">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                POWER UP
              </CardTitle>
              <CardDescription className="text-gray-300">Your fitness journey starts here</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Signup Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name */}
                <div className="space-y-1">
                  <Label
                    htmlFor="username"
                    className="text-white"
                  >
                    Name
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter Name"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-transparent border-green-500 text-white placeholder:text-gray-400 focus-visible:ring-green-500"
                  />
                  {errors.username && <p className="text-red-400 text-sm">{errors.username[0]}</p>}
                </div>
                {/* Email */}
                <div className="space-y-1">
                  <Label
                    htmlFor="email"
                    className="text-white"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent border-green-500 text-white placeholder:text-gray-400 focus-visible:ring-green-500"
                  />
                  {errors.email && <p className="text-red-400 text-sm">{errors.email[0]}</p>}
                </div>
                {/* Password */}
                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-white"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-transparent border-green-500 text-white placeholder:text-gray-400 focus-visible:ring-green-500"
                  />
                  {errors.password && <p className="text-red-400 text-sm">{errors.password[0]}</p>}
                </div>
                {/* Confirm Password */}
                <div className="space-y-1">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Your Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-transparent border-green-500 text-white placeholder:text-gray-400 focus-visible:ring-green-500"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword[0]}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-lg p-4 rounded-xl shadow-xl shadow-orange-500/30"
                >
                  {isSubmitting ? <Spinner /> : "Join Now"}
                </Button>

                <div className="flex items-center justify-center gap-2 text-gray-300 pt-2">
                  <span>or join with</span>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isSubmitting}
                    className="bg-green-500 hover:bg-green-400 text-black font-bold flex gap-2 items-center shadow-lg shadow-green-500/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    Google
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
