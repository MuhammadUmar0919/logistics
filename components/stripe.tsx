"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export function Stripe({ children }: { children: React.ReactNode }) {
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // Create a payment intent on the server and get the client secret
    // This is just a placeholder since we don't have a real backend
    setClientSecret("dummy_client_secret")
  }, [])

  return (
    <div>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
        >
          {children}
        </Elements>
      )}
    </div>
  )
}

