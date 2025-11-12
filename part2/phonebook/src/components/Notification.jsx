const Notification = ({ message, isError }) => {
  if (!message) return <div className="notification"></div>;

  return (
    <div className={"notification " + (isError ? "error" : "")}>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
