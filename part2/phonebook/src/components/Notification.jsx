const Notification = ({ notificationMessage, errorMessage }) => {
  if (notificationMessage === null && errorMessage === null) return null;
  else {
    if (errorMessage !== null) {
      return <div className="notification error">{errorMessage}</div>;
    } else {
      return <div className="notification">{notificationMessage}</div>;
    }
  }
};
export default Notification;
