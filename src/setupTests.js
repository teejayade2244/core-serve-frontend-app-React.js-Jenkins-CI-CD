import { configure } from "@testing-library/react"
import "@testing-library/jest-dom"

// Suppress React Router deprecation warnings
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
    console.error = (...args) => {
        if (args[0]?.includes?.("Error fetching user data:")) return
        originalError(...args)
    }

    console.warn = (...args) => {
        if (args[0]?.includes?.("React Router")) return
        originalWarn(...args)
    }
})

afterAll(() => {
    console.error = originalError
    console.warn = originalWarn
})

// Configure testing-library
configure({
    asyncUtilTimeout: 5000,
})
