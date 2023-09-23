import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "a pair of cherry",
    amount: 30,
    date: new Date("2022-1-11"),
  },
  {
    id: "e2",
    description: "a pair of chiku",
    amount: 20,
    date: new Date("2022-10-11"),
  },
  {
    id: "e3",
    description: "a pair of charcole",
    amount: 10,
    date: new Date("2023-9-11"),
  },
  {
    id: "e4",
    description: "a pair of chetoos",
    amount: 30,
    date: new Date("2023-9-11"),
  },
  {
    id: "e5",
    description: "a pair of cheat meal",
    amount: 30,
    date: new Date("2022-12-11"),
  },
  {
    id: "e6",
    description: "a pair of cherry",
    amount: 30,
    date: new Date("2022-2-11"),
  },
  {
    id: "e7",
    description: "a pair of chiku",
    amount: 20,
    date: new Date("2022-12-11"),
  },
  {
    id: "e8",
    description: "a pair of charcole",
    amount: 10,
    date: new Date("2022-2-11"),
  },
  {
    id: "e9",
    description: "a pair of chetoos",
    amount: 30,
    date: new Date("2022-5-11"),
  },
  {
    id: "e10",
    description: "a pair of cheat meal",
    amount: 30,
    date: new Date("2022-8-11"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value ={
    expenses:expensesState,
    addExpense:addExpense,
    deleteExpense:deleteExpense,
    updateExpense:updateExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
export default ExpensesContextProvider;
