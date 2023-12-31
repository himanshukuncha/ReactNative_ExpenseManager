import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.data <= today;
  });
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="last 7 days" fallBackText={"No Expenses Registered for the last 7 days"}/>
  );
};
export default RecentExpenses;
