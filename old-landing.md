"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, TrendingUp, Shield, Zap, Linkedin, ChevronDown, Mail } from "lucide-react"
import { useState } from "react"

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) => (
  <div className="border border-border rounded-lg">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
    >
      <span className="font-semibold text-foreground">{question}</span>
      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
    {isOpen && <div className="px-6 pb-4 text-muted-foreground">{answer}</div>}
  </div>
)

export default function HFTLabsLanding() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage(data.message)
        setEmail("")
      } else {
        setIsSuccess(false)
        setMessage(data.error)
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      question: "What is HFT Labs and how does it work?",
      answer:
        "HFT Labs is a next-generation fintech company that revolutionizes DeFi through AI-powered investment strategies. Our platform automates liquidity pool investing, optimizes portfolio management, and provides advanced crypto investment tools accessible to all users.",
    },
    {
      question: "What is a liquidity pool?",
      answer:
        "A liquidity pool is a smart contract on a decentralized exchange that holds pairs of tokens allowing users to trade directly without intermediaries. Investors deposit their assets into the pool to provide liquidity, earning fees or rewards. This system enables efficient  trading, price discovery and decentralized finance.",
    },
    {
      question: "Is my investment safe with HFT Labs?",
      answer:
        "We protect all users through Coinbase embedded wallets which are self-custodial by defualt. Built on trusted Coinbase infrastucture, they enable instant on-chain functionality and enterprise grade security.",
    },
     {
      question: "What cryptocurrencies and DeFi protocols do you support?",
      answer:
        "We support major cryptocurrencies including Bitcoin and Ethereum. Our platform interacts with major defi protocols such as Aerodrome on the base network. Learn more here.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg">
              HFT
            </div>
            <span className="text-xl font-bold text-foreground">HFT Labs</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <div className="flex items-center space-x-3">
              <a
                href="https://x.com/HftStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <XLogo className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/hft-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.hft.studio" target="_blank" rel="noopener noreferrer">
                Sign In
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 font-serif">
            Building the future
            <br />
            <span className="text-primary-foreground/90">of finance</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing decentralized finance with AI-powered investment strategies. Make advanced crypto investment
            accessible to all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <a href="https://www.hft.studio" target="_blank" rel="noopener noreferrer">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 font-serif">
              Advanced DeFi Solutions
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform automates liquidity pool investing, optimizes portfolio management, and rewards
              users through native token strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <Card className="border-border hover:shadow-lg transition-shadow p-2">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold mb-4">AI Investment Strategies</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  Advanced algorithms analyze market trends and optimize your crypto investments automatically.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow p-2">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-semibold mb-4">Liquidity Pool Automation</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  Seamlessly manage liquidity pools across multiple DeFi protocols with intelligent automation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow p-2">
              <CardHeader className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl font-semibold mb-4">Portfolio Management</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  Comprehensive portfolio tracking and optimization tools powered by machine learning.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-serif">
                Democratizing Advanced Crypto Investment
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                HFT Studio, in partnership with HFT DAO, is revolutionizing decentralized finance (DeFi) by making
                advanced crypto investment strategies accessible to all. Our AI-powered platform automates liquidity
                pool investing, optimizes portfolio management, and rewards users through a native token system.
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <img
                  src="/hft-explore-pools.png"
                  alt="HFT Labs Explore Pools Interface"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="relative">
                <img
                  src="/hft-manage-position.png"
                  alt="HFT Labs Manage Position Interface"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about HFT Labs and our DeFi investment platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-serif">
            Ready to Transform Your DeFi Strategy?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust HFT Labs for their decentralized finance needs.
          </p>
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <a href="https://www.hft.studio" target="_blank" rel="noopener noreferrer">
              Start Investing Today <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
              Stay Updated with DeFi Insights
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Get the latest market analysis, AI investment strategies, and exclusive updates delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Button type="submit" className="sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {message && <p className={`text-sm mt-4 ${isSuccess ? "text-green-600" : "text-red-600"}`}>{message}</p>}
            <p className="text-sm text-muted-foreground mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold">
                  HFT
                </div>
                <span className="text-lg font-bold">HFT Labs</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Building the future of decentralized finance with AI-powered investment strategies.
              </p>
              <div className="flex items-center space-x-3 mt-4">
                <a
                  href="https://x.com/HftStudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XLogo className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/company/hftstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 HFT Labs. All rights reserved. </p>
          </div>
        </div>
      </footer>
    </div>
  )
}