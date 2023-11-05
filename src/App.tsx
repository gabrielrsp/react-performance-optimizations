import React, { FormEvent, useState } from 'react';
import { SearchResults } from './components/SearchResults';

/**
 * 3 PRINCIPAIS FORMAS DE UM COMPONENTE RENDERIZAR:
 *  
 * 1 - Mudança de hooks
 * 2 - Mudança no componente Pai
 * 3 - Mudança em uma Propriedade
 */


/**
 * CICLO DE RENDERIZAÇÃO
 * 
 * 1 - CRIAR UMA NOVA VERSÃO do componente 
 * 2 - COMPARAR com a versão anterior
 * 3 - Caso haja alterações, ATUALIZAR o que alterou
 */

/**
 * Quando um estado de um componente atualiza, esse componente e todos os seus filhos
 * renderizam novamente
 * 
 * Um novo ciclo de renderização não significa que todos os elementos estão sendo CRIADOS 
 * no html de novo
 * 
 * O react na verdade está COMPARANDO a arvore de elementos novamente pois ele entendeu que precisa
 * de uma nova renderização
 * 
 * Isso nao quer dizer que eles serão recriados do zero
 * 
 * O ciclo de renderização entao envolve COMPARAÇÃO e se necessário, CRIAÇÃO de novos elementos
 * 
 * Essa comparação também tem um custo de processamento que pode ser alto ou baixo.
 * 
 * 
 */

function App () {

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  async function handleSearch (event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)

    const data = await response.json()

    setResults(data)

  }

  return (
    <div className="App">
      <h1>Search</h1>

      <form onSubmit={handleSearch}>

        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button type='submit'> Buscar</button>

        <SearchResults results={results} />
      </form>
    </div >
  );
}

export default App;
