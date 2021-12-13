import { BsCheck2Circle, BsGithub } from 'react-icons/bs';
import TodoList from './components/TodoList'
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className="App__container">
      <nav className="App__navbar" data-testid="navbar">
        <p className="App__logo">
          <BsCheck2Circle />
          to-do
        </p>
      </nav>
      <main className="App__main">
        <Form />
        <TodoList />
      </main>
      <footer className="App__footer"><a href="https://github.com/kriseliassen" aria-label="github link" data-testid="footer"><BsGithub /></a></footer>
    </div>
  );
}

export default App;
