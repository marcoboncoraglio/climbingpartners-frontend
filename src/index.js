import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from './theme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

require('dotenv').config();

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

const Index = () => {
  return (
    <MuiThemeProvider theme={AppTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

//ReactDOM.createRoot(document.getElementById('root')).render(<Index />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
