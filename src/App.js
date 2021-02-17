import React, { useEffect, useState } from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      console.log(response);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: 'https://github.com/paulojrr/API-NodeJS',
      title: 'React Native',
      techs: ['Nodejs, Reactjs ,React Native'],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const filteredRepos = repositories.filter((repo) => repo.id !== id);
    await api.delete(`repositories/${id}`);

    setRepositories(filteredRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <>
          {repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
        </>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
