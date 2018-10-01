import 'react-super-modal/dist/react-super-modal.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'tachyons'; // eslint-disable-line import/extensions
import 'react-datepicker/dist/react-datepicker.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './styles/styles.scss';
import App from './components/App'; // eslint-disable-line
import store from './store';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
