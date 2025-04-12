"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Briefcase, Sparkles, Mail, Settings } from "lucide-react"

export default function FluidMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { name: "Home", icon: Home, href: "#" },
    { name: "Projects", icon: Briefcase, href: "#" },
    { name: "Features", icon: Sparkles, href: "#" },
    { name: "Email", icon: Mail, href: "#" },
    { name: "Settings", icon: Settings, href: "#" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed left-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Fluid Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-start justify-start"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
            }}
          >
            {/* Background Blob */}
            <motion.div
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
              initial={{
                clipPath: "circle(0% at 3rem 3rem)",
                opacity: 0,
              }}
              animate={{
                clipPath: "circle(150% at 3rem 3rem)",
                opacity: 1,
              }}
              exit={{
                clipPath: "circle(0% at 3rem 3rem)",
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 20,
              }}
            />

            {/* Menu Container - Aligned with the cross button */}
            <motion.div
              className="absolute left-6 top-24 flex h-auto w-auto flex-col"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Menu Icons - Vertical alignment */}
              <nav className="flex flex-col space-y-5">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="relative"
                    variants={{
                      hidden: { opacity: 0, y: -50 }, // Start from above (slide down)
                      visible: { opacity: 1, y: 0 }, // Slide to original position
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      mass: 1,
                      delay: index * 0.08, // Staggered delay for cascading effect
                    }}
                  >
                    <a
                      href={item.href}
                      className="group flex items-center gap-3 text-slate-700 transition-all duration-300 hover:text-teal-600"
                      aria-label={item.name}
                    >
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md"
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <item.icon className="h-5 w-5" />
                      </motion.div>
                      <motion.span
                        className="text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 0, x: 0 }}
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        {item.name}
                      </motion.span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Decorative Blobs */}
              <motion.div
                className="absolute -right-20 bottom-10 h-32 w-32 rounded-full bg-gradient-to-r from-teal-300/40 to-emerald-300/40 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 8,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -left-10 top-40 h-24 w-24 rounded-full bg-gradient-to-r from-blue-300/30 to-purple-300/30 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -10, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 10,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content (for demo purposes) */}
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="mb-6 text-3xl font-bold text-slate-800">Fluid Icon Menu</h1>
          <p className="text-slate-600">
            Click the menu button in the top left corner to see the fluid animation with icons.
          </p>
        </div>
      </div>
    </div>
  )
}
