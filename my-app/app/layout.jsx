"use client"

import "./globals.css"
import { ThemeProvider } from "next-themes"
import { GeistSans, GeistMono } from 'geist/font/sans';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Todo List App</title>
      </head>
      <body>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  )
}
