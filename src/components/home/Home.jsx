import React from 'react'
import { FormatListBulleted } from '@mui/icons-material';
import Task from './Task';

function home() {
  return (
    <div className='home'>
      <div className='category-label'>
        <span>Categories</span>
        <span>View all</span>
      </div>

      <div className='category-container'>
        <div>
          <FormatListBulleted className='icon' />
          <span>All</span>
        </div>
        <div>
          <FormatListBulleted className='icon' />
          <span>Completed</span>
        </div>
        <div>
          <FormatListBulleted className='icon' />
          <span>Active</span>
        </div>
      </div>

      <Task/>

    </div>
  )
}

export default home