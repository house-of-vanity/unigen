import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export type TUnitBilderProps = React.PropsWithChildren<{
  result: string;
}>

const UnitBilder = (props: TUnitBilderProps) => {
  const { children, result } = props
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper>{children}</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>{result}</Paper>
      </Grid>
    </Grid>
  )
    
}

export default UnitBilder