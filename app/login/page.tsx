"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { login, user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const result = await login(email, password)

    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || "Login failed")
    }
    setIsSubmitting(false)
  }

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Don't render login page if already logged in
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <Image
              src="/images/sg-logo.png"
              alt="Solutions Group Accounting Firm Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-foreground leading-tight">Solutions Group</span>
              <span className="text-xl font-semibold text-foreground leading-tight">Accounting Firm</span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Sign in to access your client portal and manage your accounting services.
            </p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={(event) => {
              void handleLogin(event)
            }}
            className="space-y-6"
          >
            {error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-border focus:border-foreground focus:ring-foreground"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-border focus:border-foreground focus:ring-foreground"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm font-medium text-foreground hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">OR</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-border hover:bg-muted bg-transparent"
              disabled={isSubmitting}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.208-3.09 3.792-3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-border hover:bg-muted bg-transparent"
              disabled={isSubmitting}
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              Continue with Apple
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {"Don't have an Account? "}
            <Link href="/signup" className="font-medium text-foreground hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background flex-col justify-between p-12">
        <div className="flex-1 flex flex-col justify-center">
          {/* Headline */}
          <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-8 text-balance">
            Expert Accounting Solutions for Your Business Growth
          </h2>

          {/* Testimonial */}
          <div className="space-y-6">
            <div className="text-5xl font-serif text-background/60">"</div>
            <p className="text-lg xl:text-xl text-background/90 italic leading-relaxed">
              Solutions Group Accounting Firm has been instrumental in transforming our financial operations. Their
              expertise and dedication to client success is unmatched.
            </p>

            {/* Testimonial Author */}
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-full bg-background/20 flex items-center justify-center">
                <span className="text-lg font-semibold">JM</span>
              </div>
              <div>
                <p className="font-semibold">James Mitchell</p>
                <p className="text-sm text-background/70">CEO at TechVentures Inc.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="pt-12 border-t border-background/20">
          <p className="text-sm text-background/60 mb-6 text-center uppercase tracking-wider">
            Trusted by 500+ Businesses
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <span className="text-lg font-bold">TechCorp</span>
            <span className="text-lg font-bold">Innovate</span>
            <span className="text-lg font-bold">GrowthCo</span>
            <span className="text-lg font-bold">StartUp</span>
          </div>
        </div>
      </div>
    </div>
  )
}
