import { ProductItem } from "./ProductItem";
import { useMemo } from 'react'
interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
  onAddToWishlist: (id: number) => void
}

export function SearchResults ({ results, onAddToWishlist }: SearchResultsProps) {

  /* 
  useMemo 
  - to MEMOIZE A VALUE and avoid unecessary HEAVY calculations

  - Usado tambem para manter a igualdade referencial (mesma posição na memoria) 
    evitando que a informação seja recriada do zero, 
    evitando a verificação/execução do algoritimo de reconciliação 
    passando a mesma informação para um componente filho.

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
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        )
      })}
    </div>
  )
}