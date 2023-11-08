import { memo } from 'react'

/**
 *  O memo é uma função usada por volta de um componente
 * Caso nenhuma propriedade do componente tenha sido alterada, 
 * Evita a 1° instrução do ciclo de renderização: Criação de nova versão do componente
 */

/*

 o memo faz Shallow compare por padrão -> comparação rasa  ( === )
 
 e não a comparação de objetos do javascript (igualdade referencial)
 {} === {}  // false

*/



interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
  onAddToWishlist: (id: number) => void
}

function ProductItemComponent ({ product, onAddToWishlist }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => onAddToWishlist(product.id)} ></button>
    </div>
  )

}

/* 
No memo, quando eu preciso de fazer uma comparação que seja de um objeto 
Eu preciso passar um segundo parâmetro que é a comparação

No caso eu uso uma função que verifica se o objeto é igual ou nao para entao atualzar o componente

Object.is(prevProps, nextProps)

Object.is(): função que faz uma comparação profunda, (CUSTA PROCESSAMENTO)

prevProps: Props antes da renderização
nextProps: Props depois da renderização

*/

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {

  return Object.is(prevProps.product, nextProps.product)
})


/* 
Quando usar o memo

1 - Pure components: Componentes que nao sofrem side effects, dados determinados parametros,
ela sempre retornara o resultado exclusivamente com base nesses parametros.

2 - Componente que renderizam com muita frequencia

3 - Re-renders com mesmas props

4 - Componente medio pra grande

*/