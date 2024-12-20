/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       
        twitterWhite:'#e7e9ea',
        twitterBlue:'#308CD8',
        twitterBorder:'#2f3336',
        twitterLightGray:'#71767b',
        twitterDarkGray:"#17181C"
      },
    },
  },
  plugins: [],
};
