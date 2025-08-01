import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "./components/ui/provider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <Provider>
         <App />
      </Provider>
   </React.StrictMode>,
)
