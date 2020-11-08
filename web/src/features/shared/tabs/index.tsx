import React, { useState, useMemo } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export enum TTabCodes { 
  SERVICE = 'SERVICE',
  TIMER = 'TIMER'
}

export type TTabList = {
  title: string;
  code: TTabCodes,
  component: React.FunctionComponent
}

type TTabs = {
  tabList: TTabList[]
}

export const TabsList = (props: TTabs) => {
  const { tabList } = props
  const [activeTab, setActiveTab] = useState<TTabCodes>(TTabCodes.SERVICE)

  const handleChange = (e: any, newValue: TTabCodes) => { 
    setActiveTab(newValue)
  }

  const tabs = useMemo(() => {
    return tabList.map((tab) => { 
      const { title, code } = tab
      return <Tab label={title} key={code} value={code}/>
    })
  }, [tabList])

  const Component = useMemo(() => {
    return tabList.filter(({ code }) => code === activeTab).shift()?.component
  }, [activeTab])

  return (
    <div>
    <Tabs
    value={activeTab}
    indicatorColor="primary"
    textColor="primary"
    onChange={handleChange}
    aria-label="disabled tabs example"
  >
    {tabs}
      </Tabs>
      <div>
        {Component && <Component/>}
      </div>
    </div>
  )
}