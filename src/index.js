import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from './theme'

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Index = () => {
    return (
        <MuiThemeProvider theme={AppTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <App />
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}

ReactDOM.render(
<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'));

//ReactDOM.createRoot(document.getElementById('root')).render(<Index />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
