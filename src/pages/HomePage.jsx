import { Searcher } from '../components/searcher/Searcher';
import { Categories } from '../components/categories/Categories';
import { Recomendations } from '../components/recomendations/Recomendations';




export const HomePage = () => {
  return (
    <>
      <Searcher />
      <Categories />
      <Recomendations />
    </>
  )
}