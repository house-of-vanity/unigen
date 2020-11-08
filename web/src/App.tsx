import React from 'react'
import { TabsList, TTabCodes } from './features/shared/tabs'
import Container from '@material-ui/core/Container'
import { Timer } from './features/timer'

export const App = () => { 
  return (
    <Container maxWidth={false} component={'div'}>
      <TabsList
        tabList={[
          {
            title: 'SERVICE',
            code: TTabCodes.SERVICE,
            component: Timer
          },
          {
            title: 'TIMER',
            code: TTabCodes.TIMER,
            component: Timer
          }
        ]}
      />
    </Container>
  )
}