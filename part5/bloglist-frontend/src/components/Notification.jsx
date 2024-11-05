const Notification = ({ message, isError }) => {
  let style = null;
  if (isError) {
    style = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      padding: 10,
      marginBottom: 10,
    };
  } else {
    style = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      padding: 10,
      marginBottom: 10,
    };
  }

  if (message === null) return null;
  return <p style={style}>{message}</p>;
};

export default Notification;
