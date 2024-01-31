
const components = {
    MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#151B25',
              borderRadius: '10px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F89C1D',
            },
          },
        },
      },
    MuiBottomNavigation : {
        styleOverrides: {
            root:{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                padding: '5px',
                gap: 10,
                height: 'auto',
            }
        }
    },
    MuiBottomNavigationAction : {
        styleOverrides: {
            root:{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                padding: '5px',
                height: '40px',
                color: '#151B25',
                '&.Mui-selected': {
                    backgroundColor: `white !important`,
                    color: '#F89C1D',
                  },
            },
            label:{
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: [
                    'Poppins',
                  ].join(','),
            }
            
        }
    },
    "& .MuiPagination-ul li:last-child": {
      marginLeft: "16px",
  },
  "& .MuiPagination-ul li:last-child button::before": {
      content: "'Next'",
      marginRight: "8px",
  },
  "& .MuiPagination-ul li:first-child": {
      marginRight: "16px",
  },
  "& .MuiPagination-ul li:first-child button::after": {
      content: "'Previous'",
      marginLeft: "8px",
  },
  MuiTextField: {
    styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#151B25',
            borderRadius: '10px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F89C1D',
          },
            // Default state of text input field font.
            '& .MuiInputBase-input.MuiInput-input': {
              borderColor: '#F89C1D',
            },
            // Default state of underline.
            '& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl::before': {
              borderColor: '#151B25',
            },
            // On hover state of underline.
            '& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl:hover::before': {
              borderColor: '#F89C1D',
            },
            // On focus state of underline.
            '& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.Mui-focused::after': {
              borderColor: '#F89C1D',
          },
        }
    },
    MuiRadio:{
      styleOverrides:{
        root:{
          '& .Mui-checked': {
            color: '#F89C1D',
          },
        },
        checked:{
          color: '#F89C1D',
        }
      }
    }
}
};

export default components;
