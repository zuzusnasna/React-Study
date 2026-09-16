import Card from './Components/card.jsx'
function App() {
  return (
    <>
      <Card
        title="Props in React"
        description="Props pass data from one component to another."
        author="Alice"
      />

      <Card
        title="React Composition"
        description="Composition makes your components more reusable"
        author="Charlie"
      />
    </>
  )
}

export default App
