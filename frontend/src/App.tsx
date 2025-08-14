import { useEffect, useState } from 'react';
import { backend } from './declarations/backend';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formInput = (event.target as HTMLFormElement).elements.namedItem(
      'name',
    ) as HTMLInputElement;
    const name = formInput.value;
    backend
      .setMessage(name)
      .then(() => backend.getMessage())
      .then(setGreeting);
  }

  useEffect(() => {
    backend.getMessage().then(setGreeting);
  }, []);

  return (
    <main>
      <img src="/onchain.svg" alt="100% onchain on the Internet Computer" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
