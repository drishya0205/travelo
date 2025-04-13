import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaneTakeoff } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Frosted Glass Effect */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b fixed top-0 w-full bg-white/30 backdrop-blur-lg z-50">
        <Link href="/" className="flex items-center gap-2">
          <PlaneTakeoff className="h-6 w-6" />
          <span className="font-bold text-xl">Travelo</span>
        </Link>
        <nav className="flex gap-4">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16">
        {/* Full-Screen Hero Section */}
        <section
          className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: "url('/first.png')" }}
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center max-w-3xl mx-auto bg-white/20 p-8 rounded-lg backdrop-blur-lg">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Your Perfect Destination
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find the best hotels and attractions for your next adventure with Travelo.
              </p>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-3 items-center">
              {[
                {
                  title: "Discover Amazing Places",
                  description: "Explore top-rated attractions and hidden gems at your destination.",
                  icon: (
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  ),
                },
                {
                  title: "Find Perfect Hotels",
                  description:
                    "Compare and book the best hotels that match your preferences and budget.",
                  icon: (
                    <path d="M3 7v11m0-11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  ),
                },
                {
                  title: "Personalized Recommendations",
                  description:
                    "Get tailored suggestions based on your interests and previous trips.",
                  icon: (
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col justify-center space-y-4">
                  <div className="inline-block rounded-lg bg-primary p-2 text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">{feature.title}</h2>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Frosted Glass Effect */}
      <footer className="fixed bottom-0 w-full bg-white/30 backdrop-blur-lg border-t py-6 px-4 md:px-6 flex flex-col gap-2 sm:flex-row items-center z-50">
        <p className="text-xs text-muted-foreground">© 2024 Travelo. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
