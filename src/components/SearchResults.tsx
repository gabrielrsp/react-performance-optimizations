import { List, ListRowRenderer } from 'react-virtualized'
import { ProductItem } from "./ProductItem";
// import { useMemo } from 'react'
interface SearchResultsProps {
  totalPrice: number
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>
  onAddToWishlist: (id: number) => void
}

export function SearchResults ({ totalPrice, results, onAddToWishlist }: SearchResultsProps) {

  /* 
  useMemo 
  - to MEMOIZE A VALUE and avoid unecessary HEAVY calculations

  - Usado tambem para manter a igualdade referencial (mesma posição na memoria) 
    evitando que a informação seja recriada do zero, 
    evitando a verificação/execução do algoritimo de reconciliação 
    passando a mesma informação para um componente filho.

  */
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0)
  // }, [results])

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}  //quantidade de itens pre carregados tanto pra cima quanto pra baixo ao dar scroll
        rowCount={results.length}  // quantos itens aparece no maximo
        rowRenderer={rowRenderer}  // funçao que renderiza cada item da lista
      />

      {/* {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        )
      })} */}
    </div>
  )
}
