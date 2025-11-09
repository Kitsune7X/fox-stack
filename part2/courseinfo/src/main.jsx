import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Use the concurrent-ready root API so future features (like Suspense)
// behave consistently even though the example is tiny.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
