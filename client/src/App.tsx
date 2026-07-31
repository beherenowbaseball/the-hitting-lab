import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import ThankYou from "./pages/ThankYou";
import DrillsUnlocked from "./pages/DrillsUnlocked";
import About from "./pages/About";
import NaturalSwing from "./pages/NaturalSwing";
import NaturalSwingUnlocked from "./pages/NaturalSwingUnlocked";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/apply"} component={Apply} />
      <Route path={"/drills"} component={DrillsUnlocked} />
      <Route path={"/thank-you"} component={ThankYou} />
      <Route path={"/about"} component={About} />
      <Route path={"/natural-swing"} component={NaturalSwing} />
      <Route path={"/natural-swing/unlocked"} component={NaturalSwingUnlocked} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
