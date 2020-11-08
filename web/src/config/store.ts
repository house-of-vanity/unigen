import { configureStore } from '@reduxjs/toolkit'
import fp from 'lodash/fp';

// @ts-ignore
const requireReducer = require.context('../features', true, /[a-zA-Z]+\/duck\/index.ts/);

const ducks: any[] = requireReducer.keys().map(requireReducer);

const { rootReducer }: any = ducks.reduce(
  ({ rootReducer }, duck) => {
    if (duck.slices) {
      rootReducer = {
        ...rootReducer,
        ...fp.flow(
          fp.toPairs,
          fp.reduce((pull, [, slicer]) => {
            return {
              ...pull,
              ...(slicer.reducer ? { [slicer.name]: slicer.reducer } : {}),
            };
          }, {})
        )(duck.slices),
      };
    }
    return {
      rootReducer,
    };
  },
  {
    rootReducer: {},
  }
);

console.log('rootReducer', rootReducer)

const store = configureStore({
  reducer: rootReducer
});

console.log(store.getState())

export type RootState = ReturnType<typeof rootReducer>;

export default store;
