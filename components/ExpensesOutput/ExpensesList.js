import { FlatList, Pressable, Text } from "react-native";
import ExpenseItem from "./ExpensesItem";

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    
  );
};
export default ExpensesList;
