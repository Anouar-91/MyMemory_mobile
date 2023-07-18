import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: {
      50: '#F2F6F8',
      100: '#D6E2E8',
      200: '#BBCEDF',
      300: '#9FBAD6',
      400: '#83A6CD',
      500: '#6782C4',
      600: '#4C7F9B',
      700: '#3B617C',
      800: '#2B445E',
      900: '#1A265F',
    }, 
    secondary:{
   
        50: '#FCE7EA',
        100: '#F8C4CA',
        200: '#F49FA9',
        300: '#F07B88',
        400: '#EC5867',
        500: '#E83447',
        600: '#C30028',
        700: '#A20021',
        800: '#800019',
        900: '#5E0012', // #C30028

    }
  },
});

export default theme;