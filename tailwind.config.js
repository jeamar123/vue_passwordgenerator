module.exports = {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'c-primary': '#CDF0FF',
        'c-secondary': '#1F6F91',
        'c-black': '#465156',
        'c-gray': '#E5E7EB',

        'c-2C80CF': '#2C80CF',
      },
      boxShadow:  {
        'c-primary':  '1px 2px 10px 1px rgba(0, 0, 0, 0.05)',
        'c-button':  '1px 2px 2px 1px rgba(0, 0, 0, 0.25)',
      },
      width: {
        
      },
      maxWidth: {
       
      },
      minWidth: {
        
      },
      height: {
       
      },
      maxHeight: {
        
      },
      minHeight: {
        
      },
      fontSize: {
        'xxs': '0.625rem',
        'xxxs': '0.5rem',
      },
      margin: {
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
      },
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
