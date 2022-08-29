import SidebarMain from '../components/sidebar/SidebarMain'
import DocListMain from '../components/doclist/DocListMain'
import DocTemplateMain from '../components/doctemplate/DocTemplateMain'

import React from 'react'

function DocPage() {
  return (
    <>
        <SidebarMain />
        <DocListMain />
        <DocTemplateMain />
    </>
  )
}

export default DocPage