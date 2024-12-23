import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetConstructor: (state) => (state = initialState),
    updateConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state;

      if (index < ingredients.length - 1) {
        const updatedIngredients = [...ingredients];

        [updatedIngredients[index], updatedIngredients[index + 1]] = [
          updatedIngredients[index + 1],
          updatedIngredients[index]
        ];
        state.ingredients = updatedIngredients;
      }
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { ingredients } = state;

      if (index > 0) {
        const updatedIngredients = [...ingredients];

        [updatedIngredients[index], updatedIngredients[index - 1]] = [
          updatedIngredients[index - 1],
          updatedIngredients[index]
        ];

        state.ingredients = updatedIngredients;
      }
    }
  },
  selectors: {
    constructorSelector: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  updateConstructor,
  moveIngredientDown,
  moveIngredientUp
} = constructorSlice.actions;

export const constructorSelector = constructorSlice.selectors;
export const burgerConstructorReducer = constructorSlice.reducer;
