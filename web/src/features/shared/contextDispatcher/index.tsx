import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'

type TSetToState = Record<string, any>

type TFormikToState = {
  setToState: (newValues: TSetToState) => void
}

const ContextDispatcher = (props: TFormikToState) => { 
  const context = useFormikContext();
  const { touched, values } = context as
    { touched: Record<string, boolean>, values: TSetToState }
  
  useEffect(() => { 
    const newState = Object.entries(touched).filter((entrie) => { 
      const [, isTouched] = entrie
      return isTouched
    }).reduce((result, current) => { 
      const [key] = current
      result[key] = values?.[key] as any
      return result
    }, {} as TSetToState)
    
    props.setToState(newState)
  }, [values, touched])
  return null;
}

export default ContextDispatcher