import { SignInButton } from "@clerk/clerk-react";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline bg-red-900 text-white p-4">
        Hello world!
      </h1>
      <button className="btn btn-primary">Click me</button>
      <SignInButton mode="modal" />
    </div>
  )
}

export default App;