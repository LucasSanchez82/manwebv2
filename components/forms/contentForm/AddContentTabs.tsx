import React from 'react'
import AddContentForm from './AddContentForm'
import AddContentMagicForm from './AddContentMagicForm'
import { TabsProvider } from '@/components/global/TabsProvider'

const AddContentsTabs = () => {
  const tabs = [
    {
      value: 'Magic',
      node: <AddContentMagicForm />,
    },
    {
      value: 'Manual',
      node: <AddContentForm />,
    },
  ]
  return <TabsProvider tabs={tabs} />
}

export default AddContentsTabs
