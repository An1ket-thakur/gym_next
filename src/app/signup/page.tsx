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
        return;
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
    <div className="relative min-h-dvh bg-[url('/gym-bg.jpeg')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-12 md:py-0 overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full max-w-6xl mx-auto">
        {/* LEFT Section */}
        <div className="w-full md:w-[45%] space-y-5 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground">UNLEASH</h1>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-primary via-ring to-chart-2 bg-clip-text text-transparent">
            YOUR POWER
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed">
            Transform your body, elevate your mind, and conquer your limits with our elite training programs.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base sm:text-lg px-5 py-3 rounded-xl shadow-md shadow-primary/30">
              START FREE TRIAL
            </Button>

            <Button
              variant="outline"
              className="border-ring text-ring hover:bg-ring hover:text-white font-semibold text-base sm:text-lg px-5 py-3 rounded-xl shadow-md shadow-ring/30"
            >
              WATCH DEMO
            </Button>
          </div>
        </div>

        {/* RIGHT Section (Signup Form Card) */}
        <div className="w-full md:w-[45%]">
          <Card className="w-full border-border bg-white/10 backdrop-blur-xl border border-white/20d text-card-foreground rounded-xl shadow-xl">
            <CardHeader className="text-center space-y-2 px-6 pt-6">
              <CardTitle className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent">
                Power Up
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">
                Your fitness journey starts here
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name */}
                <div className="space-y-1">
                  <Label htmlFor="username">Name</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter Name"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-transparent border-input focus-visible:ring-ring"
                  />
                  {errors.username && <p className="text-destructive text-sm">{errors.username[0]}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent border-input focus-visible:ring-ring"
                  />
                  {errors.email && <p className="text-destructive text-sm">{errors.email[0]}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-transparent border-input focus-visible:ring-ring"
                  />
                  {errors.password && <p className="text-destructive text-sm">{errors.password[0]}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Your Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-transparent border-input focus-visible:ring-ring"
                  />
                  {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword[0]}</p>}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg py-3 rounded-xl shadow-md shadow-primary/30"
                >
                  {isSubmitting ? <Spinner /> : "Join Now"}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-2">
                  <div className="h-px bg-border flex-1" />
                  <span className="text-muted-foreground text-sm">or join with</span>
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
    </div>
  );
}
