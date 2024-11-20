
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="App flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
      <Stopwatch />
      <Timer inputTime={5} />
    </div>
  );
}

export default App;