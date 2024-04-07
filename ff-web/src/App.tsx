import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/madimi-one";

import React, { Suspense } from "react";
import RootRouter from "./Routes/RootRouter";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RootRouter />
    </Suspense>
  );
}

export default App;
