import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Cria a instância do tema.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F46506',
    },
    secondary: {
      main: '#806a77',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F3EAE3',
    },
  },
    overrides:{
        MuiCssBaseline:{
            '@global':{
                '.root': {
                  flexGrow: 1,
                  height: "100vh"
                },
                '.fullHeight':{
                  height:"100%"
                },
                img: {
                  margin: 'auto',
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                },
                '.avatarLarge':{
                    width: '100px',
                    height: '100px',
                }
            }
        },
        MuiAvatar:{
                root:{
                    margin: 'auto',
                    display: 'block',
                    width: '100px',
                    height: '100px',
                }
        }
  },
  
});

export default theme;