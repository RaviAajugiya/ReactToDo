import React from 'react'
import { WatchLaterOutlined, FiberManualRecord } from '@mui/icons-material';

function Task() {
  return (
    <div className='task'>
      <span>Today</span>
      <div>
        <input type="checkbox" name="" id="" />
        <label>Complete ToDo Design</label>
        <p>
          <WatchLaterOutlined />
          <span>07:00 PM</span>
          <FiberManualRecord/> |
          <label>work</label>
        </p>
      </div>
    </div>
  )
}

export default Task