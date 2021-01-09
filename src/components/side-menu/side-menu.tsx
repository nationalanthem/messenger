import SideMenuFilter from '../side-menu-filter/side-menu-filter'
import PersonItem from '../person-item/person-item'
import './side-menu.scss'

const SideMenu = () => {
  return (
    <div className="side-menu">
      <SideMenuFilter />
      <PersonItem />
      <PersonItem />
      <PersonItem />
    </div>
  )
}

export default SideMenu
