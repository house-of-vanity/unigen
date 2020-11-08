import React from 'react'
import { Provider } from 'react-redux'
import store from './config/store'
import { TabsList, TTabCodes } from './features/shared/tabs'
import Container from '@material-ui/core/Container'
import { Timer } from './features/timer'

export const App = () => { 
  return (
    <Provider store={store}>
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
      </Provider>
  )
}