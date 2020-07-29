import '../styles/App.scss'
import '../styles/tippy.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function MyApp(props) {
const { Component, pageProps } = props;  
  return (
    <MuiThemeProvider>
    <Component {...pageProps} />
    </MuiThemeProvider>
  )
}

export default MyApp
