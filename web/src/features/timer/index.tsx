import React, { useCallback, useEffect, useState } from 'react'
import UnitBilder from '../shared/unitBilder'
import { Formik } from 'formik'
import { Input, Typography } from '@material-ui/core'
import _ from 'lodash'
import ContextDispatcher from '../shared/contextDispatcher'

type TTimerFormState = Record<string, string>

type TOnChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

type TOnChangeEventFn = ((event: TOnChangeEvent) => void)

type TTimeInputComponent = {
  name: string;
  value: string,
  onChange: TOnChangeEventFn;
  onBlur: ((event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void) | undefined
}

export const Timer = () => { 
  const [formState, setFormState] = useState<TTimerFormState>({})

  const handleFormValues = _.debounce((newValues: TTimerFormState) => { 
    setFormState({ ...formState, ...newValues })
   }, 400)

  const createInputText = useCallback((params: TTimeInputComponent) => {
    return <Input {...params}/>
  }, [handleFormValues])

  return <div>
    <h2>Timer</h2>
    <UnitBilder result={JSON.stringify(formState)}>
      <Formik
        initialValues={{
          description: '',
          name: ''
        }}
        onSubmit={() => { }}
      >
        {({ values, handleChange, handleBlur }) => (
          <form>
            <label htmlFor="description">
              <Typography>description</Typography>
              {createInputText({
                name: 'description',
                value: values?.description || '',
                onChange: handleChange,
                onBlur: handleBlur
              })}
            </label>

           <label htmlFor="description">
              <Typography>Name</Typography>
              {createInputText({
                name: 'name',
                value: values?.name || '',
                onChange: handleChange,
                onBlur: handleBlur
              })}
            </label> 
            <ContextDispatcher setToState={handleFormValues}/>
          </form>
        )}
      </Formik>
    </UnitBilder>
  </div>
}
