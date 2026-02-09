"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@/icons/arrow-right";

const FAQs = [
  {
    question: "What is HFT Labs and how does it work?",
    answer:
      "HFT Labs is a next-generation fintech company that revolutionizes DeFi through AI-powered investment strategies. Our platform automates liquidity pool investing, optimizes portfolio management, and provides advanced crypto investment tools accessible to all users.",
  },
  {
    question: "What is a liquidity pool?",
    answer:
      "A liquidity pool is a smart contract on a decentralized exchange that holds pairs of tokens allowing users to trade directly without intermediaries. Investors deposit their assets into the pool to provide liquidity, earning fees or rewards. This system enables efficient trading, price discovery and decentralized finance.",
  },
  {
    question: "Is my investment safe with HFT Labs?",
    answer:
      "We protect all users through Coinbase embedded wallets which are self-custodial by default. Built on trusted Coinbase infrastructure, they enable instant on-chain functionality and enterprise grade security.",
  },
  {
    question: "What cryptocurrencies and DeFi protocols do you support?",
    answer:
      "We support major cryptocurrencies including Bitcoin and Ethereum. Our platform interacts with major DeFi protocols such as Aerodrome on the Base network.",
  },
];
export function FrequentlyAskedQuestions() {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto my-10 md:my-20 py-10 md:py-20 px-4 md:px-8">
      <div className="text-balance relative z-20 mx-auto mb-4 max-w-4xl text-center">
        <h2
          className={cn(
            "inline-block text-3xl md:text-6xl bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]",
            "bg-clip-text text-transparent"
          )}
        >
          Let&apos;s Answer Your Questions
        </h2>
      </div>
      <p className="max-w-lg text-sm  text-center mx-auto mt-4 text-neutral-400 px-4 md:px-0">
        Get answers to common questions about HFT Labs and our DeFi investment platform.
      </p>
      <div className="mt-10 md:mt-20 max-w-3xl mx-auto divide-y divide-neutral-800">
        {FAQs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </div>
    </div>
  );
}

const FAQItem = ({
  question,
  answer,
  setOpen,
  open,
}: {
  question: string;
  answer: string;
  open: string | null;
  setOpen: (open: string | null) => void;
}) => {
  const isOpen = open === question;

  return (
    <motion.div
      className="cursor-pointer py-4 md:py-6"
      onClick={() => {
        if (isOpen) {
          setOpen(null);
        } else {
          setOpen(question);
        }
      }}
    >
      <div className="flex items-start justify-between">
        <div className="pr-8 md:pr-12">
          <h3 className="text-base md:text-lg font-medium text-neutral-200">
            {question}
          </h3>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden text-sm md:text-base text-neutral-400 mt-2"
              >
                <p>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative mr-2 md:mr-4 mt-1 h-5 w-5 md:h-6 md:w-6 flex-shrink-0">
          <motion.div
            animate={{
              scale: isOpen ? [0, 1] : [1, 0, 1],
              rotate: isOpen ? 90 : 0,
              marginLeft: isOpen ? "1.5rem" : "0rem",
            }}
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <IconArrowRight className="absolute inset-0 h-5 w-5 md:h-6 md:w-6 transform text-white-500" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
