/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF",
          secondary: "#9333EA",
        },
        backgroundColor: {
            'alpha': 'rgba(0, 0, 0, 0.47)', 
          },
          fontFamily:{
                quickSand:['quickSand','sans-serif'],
          }
      },
    },
    plugins: [],
  };
  