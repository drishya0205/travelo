import Link from "next/link"
import { PlaneTakeoff } from "lucide-react"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-olive-50">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white">
        <Link href="/" className="flex items-center gap-2">
          <PlaneTakeoff className="h-6 w-6" />
          <span className="font-bold text-xl">Travelo</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-olive-100 to-olive-200">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-olive-800">Create an account</h1>
            <p className="text-olive-600 mt-2">Sign up to get started with Travelo</p>
          </div>
          <RegisterForm />
          <div className="text-center">
            <p className="text-sm text-olive-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-medium text-olive-800 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-muted-foreground">© 2024 Travelo. All rights reserved.</p>
      </footer>
    </div>
  )
}

