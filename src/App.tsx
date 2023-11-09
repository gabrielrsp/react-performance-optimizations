import React, { FormEvent, useCallback, useState } from 'react';
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

interface ProductProps {
  id: number;
  price: number;
  priceFormatted: string;
  title: string;
}

type Results = {
  totalPrice: number
  data: ProductProps[]
}

function App () {

  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  })

  async function handleSearch (event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)

    const data = await response.json()

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map((product: ProductProps) => {
      return {
        id: product.id,
        title: product.title,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total: number, product: ProductProps) => {
      return total + product.price;
    }, 0)

    setResults({ totalPrice, data: products })

  }
  // useCallback usado para manter a igualdade referencial de uma funçao, evitando renderização desnecessária quando seu componente pai for atualizado

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id)
  }, [])



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

        <SearchResults
          results={results.data}
          totalPrice={results.totalPrice}
          onAddToWishlist={addToWishlist}
        />
      </form>
    </div >
  );
}

export default App;





