"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear errors when typing
    if (name === "password" || name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeTerms: checked,
    }))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {
      password: "",
      confirmPassword: "",
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // In a real app, this would register the user with a backend
    // For demo purposes, we'll just simulate registration
    setTimeout(() => {
      // Store username in localStorage for demo purposes
      localStorage.setItem("travelo-username", formData.name)
      setIsLoading(false)
      router.push("/welcome")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={formData.agreeTerms} onCheckedChange={handleCheckboxChange} required />
        <Label htmlFor="terms" className="text-sm font-normal">
          I agree to the{" "}
          <a href="#" className="text-primary hover:underline">
            terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            privacy policy
          </a>
        </Label>
      </div>
      <Button type="submit" className="w-full bg-olive-600 hover:bg-olive-700 text-white" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}

