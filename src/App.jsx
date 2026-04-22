import { useState } from "react";
import { RouterProvider } from "react-router";
import routes from "./routing/routes";
import { UserContextProvider } from "./contexts/UserContext";
import GameHubLoader from "./views/GameHubLoader";
import ReactLenis from "lenis/react";

function App() {
  
  const [isBooting, setIsBooting] = useState(true);

  return (
    <ReactLenis root options={{
      lerp: 0.2,
      duration: 1.6,   
      smoothWheel: true
    }}>
      <UserContextProvider>
        {isBooting ? (
          <GameHubLoader onFinished={() => setIsBooting(false)} />
        ) : (
          <RouterProvider router={routes} />
        )}
      </UserContextProvider>
    </ReactLenis>
  );
}

export default App
