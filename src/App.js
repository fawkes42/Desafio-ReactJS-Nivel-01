import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  let [repositories, setRepositories] = useState([])
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('repositories', {
      title: 'A new repository',
      url: 'https://github.com/UNTozzi',
      techs: [
        'ReactJS',
        'VueJS',
        'NodeJS'
      ]
    }).then(response => {
      setRepositories([...repositories, response.data])
    })
    
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    api.delete(`repositories/${id}`).then(response => {
      if (response.status === 204) {
        let repoIndex = repositories.findIndex(repo => repo.id === id)
        repositories.splice(repoIndex,1)
        setRepositories([...repositories])
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
