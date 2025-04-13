import Link from "next/link"
import { PlaneTakeoff } from "lucide-react"
import { SignInForm } from "@/components/sign-in-form"

export default function SignInPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/pretty.jpg')" }}>
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-white/20 bg-white/20 backdrop-blur-lg shadow-md">
        <Link href="/" className="flex items-center gap-2 text-white">
          <PlaneTakeoff className="h-6 w-6" />
          <span className="font-bold text-xl">Travelo</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
          </div>
          <SignInForm />
          <div className="text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-4 w-full border-t border-white/20 bg-white/20 backdrop-blur-lg shadow-md text-white text-center text-sm">
        <p>© 2024 Travelo. All rights reserved.</p>
      </footer>
    </div>
  )
}
