import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, type: "sale" | "rent"): string {
  if (type === "rent") {
    return `₹${price.toLocaleString("en-IN")}/month`
  }

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)} Cr`
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} L`
  }
  return `₹${price.toLocaleString("en-IN")}`
}

export function getWhatsAppUrl(message: string): string {
  // For demo purposes, return a simple alert message
  return `Contact us: +91 98765 43210 - ${message}`
}
