import React from 'react'
import { Menu, Checklist, Search, NotificationsNone } from '@mui/icons-material';

function Header() {
  return (
    <header>
      <div>
        <Menu className='icon menu-icon' />
        <Checklist className='icon checklist-icon' />
        <span className='brand-text'>Task Ease</span>
      </div>
      <div>
        <Search className='icon search-icon' />
        <NotificationsNone className='icon notification-icon' />
      </div>
    </header>
  )
}

export default Header