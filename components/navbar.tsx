"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Truck, User, Package, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Yuklar", href: "/cargos" },
    { name: "Xizmatlar", href: "/services" },
    { name: "Biz haqimizda", href: "/about" },
    { name: "Aloqa", href: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2 dark:bg-background/80" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Truck className={`h-8 w-8 ${scrolled ? "text-primary" : "text-white dark:text-white"}`} />
            <span className={`ml-2 text-xl font-bold ${scrolled ? "text-primary" : "text-white dark:text-white"}`}>
              Logistika
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors ${
                  pathname === link.href
                    ? scrolled
                      ? "text-primary"
                      : "text-white dark:text-white font-bold"
                    : scrolled
                      ? "text-foreground hover:text-primary"
                      : "text-white/80 dark:text-white/80 hover:text-white dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center ${
                      scrolled ? "text-primary hover:bg-primary/10" : "text-white dark:text-white hover:bg-white/10"
                    }`}
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/add-cargo" className="cursor-pointer">
                      <Package className="h-4 w-4 mr-2" />
                      <span>Yuk qo&apos;shish</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Chiqish</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant={scrolled ? "outline" : "ghost"}
                  className={
                    scrolled
                      ? "border-primary text-primary hover:bg-primary/10"
                      : "border-white text-white dark:text-white hover:bg-white/10"
                  }
                >
                  <Link href="/login">Kirish</Link>
                </Button>
                <Button
                  asChild
                  className={
                    scrolled
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-white text-white hover:bg-white/90"
                  }
                >
                  <Link href="/register">Ro&apos;yxatdan o&apos;tish</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? (
                <X className={`h-6 w-6 ${scrolled ? "text-primary" : "text-white dark:text-white"}`} />
              ) : (
                <Menu className={`h-6 w-6 ${scrolled ? "text-primary" : "text-white dark:text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md dark:bg-background/95"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`py-3 font-medium ${
                    pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link href="/profile" className="flex items-center py-3 text-foreground hover:text-primary">
                      <User className="h-5 w-5 mr-2" />
                      <span>Profil</span>
                    </Link>
                    <Link href="/add-cargo" className="flex items-center py-3 text-foreground hover:text-primary">
                      <Package className="h-5 w-5 mr-2" />
                      <span>Yuk qo&apos;shish</span>
                    </Link>
                    <button onClick={logout} className="flex items-center py-3 text-foreground hover:text-primary">
                      <LogOut className="h-5 w-5 mr-2" />
                      <span>Chiqish</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline">
                      <Link href="/login">Kirish</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Ro&apos;yxatdan o&apos;tish</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

