import Alert from 'react-s-alert';

export const showAlert = alertName =>
  Alert.error(alertName, {
    position: 'bottom-right',
    effect: 'slide',
  });

export const showInfo = alertName =>
  Alert.info(alertName, {
    position: 'bottom-right',
    effect: 'slide',
  });
