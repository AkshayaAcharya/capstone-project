export default function Status({ notification, color }) {
  return (
    <p
      style={{
        backgroundColor: color,
        color: "#fff",
        width: "50%",
        padding: "2rem 1rem",
        marginBottom: "2rem",
        textAlign: "center",
        fontWeight: "700",
      }}
    >
      {notification}
    </p>
  );
}
