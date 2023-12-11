import { Searcher } from '../components/searcher/Searcher';
import { Categories } from '../components/categories/Categories';
import { Recomendations } from '../components/recomendations/Recomendations';
import { ProductsPagination } from '../components/productsPagination/ProductsPagination';




export const HomePage = () => {
  return (
    <>
      <Searcher />
      <Categories />
      {/*<Recomendations />*/}
      <ProductsPagination itemsPerPage={6}/>
    </>
  )
}