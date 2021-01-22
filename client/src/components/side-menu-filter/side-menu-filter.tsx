import { useDispatch } from 'react-redux'
import { setFilter } from '../../redux/re-ducks/filter/actions'
import { FilterState, SearchFilter } from '../../redux/re-ducks/types'
import './side-menu-filter.scss'

interface SideMenuFilterProps {
  currentFilter: FilterState
}

const SideMenuFilter: React.FC<SideMenuFilterProps> = ({ currentFilter }) => {
  const dispatch = useDispatch()

  const handleFilterSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.target as HTMLButtonElement
    const clickedFilter = target.name as SearchFilter

    if (currentFilter !== clickedFilter) {
      dispatch(setFilter(clickedFilter))
    }
  }

  return (
    <div className="side-menu-filter">
      <button
        name="search_users"
        type="button"
        disabled={currentFilter === 'search_users'}
        onClick={handleFilterSelect}
        className={`side-menu-filter__btn${
          currentFilter === 'search_users' ? ' side-menu-filter__btn--active' : ''
        }`}
      >
        Поиск
      </button>
    </div>
  )
}

export default SideMenuFilter
