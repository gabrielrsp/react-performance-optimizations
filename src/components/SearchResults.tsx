import { ProductItem } from "./ProductItem";
import { useMemo } from 'react'
interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
}

export function SearchResults ({ results }: SearchResultsProps) {

  /* 
  useMemo 
  - to memoize a value and avoid unecessary HEAVY calculations

  - Ou entao para manter a igualdade referencial (mesma posição na memoria) evitando que a informação seja recriada do zero, 
    evitando a verificação/execução do algoritimo de reconciliação 
    e entao a passando a informação para um componente filho.

  */
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0)
  }, [results])



  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product => {
        return (
          <ProductItem product={product} />
        )
      })}
    </div>
  )
}