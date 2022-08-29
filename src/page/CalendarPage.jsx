import CalendarMain from "../components/calendar/CalendarMain";
import RequestMain from "../components/request/RequestMain";
import SidebarMain from "../components/sidebar/SidebarMain";

import React from 'react'

function Calendar() {
  return (
    <>
        <SidebarMain />
        <CalendarMain />
        <RequestMain />
    </>
  )
}

export default Calendar