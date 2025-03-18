/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
            320: { max: "320px" },
            636: { max: "636px" },
        },
        fontFamily: {
            fira: "Fira Sans",
            Belanosima: "Belanosima",
            Montserrat: "Montserrat",
            Roboto: "Roboto",
        },
    },
    plugins: [require("tailwindcss"), require("autoprefixer")],
}
