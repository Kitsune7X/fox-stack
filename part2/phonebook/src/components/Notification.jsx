const Notification = ({ message }) => {
  if (!message) return <div className="notification"></div>;
  return (
    <div className="notification">
      <span>{message}</span>
    </div>
  );
};

export default Notification;
