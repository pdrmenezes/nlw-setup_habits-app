/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090a',
      },
      fontFamily: {
        regular: 'Inter_400Regular',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        extrabold: 'Inter_800ExtraBold',
        space_regular: 'SpaceGrotesk_400Regular',
        space_medium: 'SpaceGrotesk_500Medium',
        space_semibold: 'SpaceGrotesk_600SemiBold',
        space_bold: 'SpaceGrotesk_700Bold',
      },

    },
  },
  plugins: [],
}
