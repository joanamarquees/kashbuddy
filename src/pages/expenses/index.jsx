import { useAddExpense} from '../../hooks/useAddExpense.js';
import { useAddIncome } from '../../hooks/useAddIncome.js';

export const Expenses = () => {

  const { addExpense } = useAddExpense();
  const { addIncome } = useAddIncome();

  const onSubmitIncome = (e) => {
    e.preventDefault()
    addIncome({description: 'Compras de bananas', amount: 10})
  };

  const onSubmitExpense = (e) => {
    e.preventDefault()
    addExpense({description: 'Compras de bananas', amount: 10, category: 'food'})
  };

  const categories = [{
    value: '',
    label: 'category',
  },
  {
    value: 'food',
    label: 'diner/lunch',
  },
  {
    value: 'grocery',
    label: 'grocery shop',
  },
  {
    value: 'car',
    label: 'car',
  },
  {
    value: 'parking',
    label: 'parking',
  },
  {
    value: 'uber',
    label: 'uber',
  },
  {
    value: 'clothes',
    label: 'clothes',
  },
  {
    value: 'fun',
    label: 'fun',
  },
  {
    value: 'house',
    label: 'house',
  },
  {
    value: 'bunnies',
    label: 'bunnies',
  },
  {
    value: 'beauty',
    label: 'beauty/farmacy',
  },
  {
    value: 'health',
    label: 'health',
  },
  {
    value: 'other',
    label: 'other',
  
  }]
  
  return (
    <>
      <div className='expense-tracker'>
        <div className='container'></div>
          <h1> EXPENSE TRACKER </h1>
          <div className='balance'>
            <h2> balance </h2>
            <h3> $0.00 </h3> {/* TODO: dynamic value */} 
          </div>
          <div className='summary'>
            <div className='income'>
              <h2> income </h2>
              <h3> $0.00 </h3> {/* TODO: dynamic value */} 
            </div>
            <div className='expense'>
              <h2> expenses </h2>
              <h3> $0.00 </h3> {/* TODO: dynamic value */} 
            </div>
          </div>
          <form className='add-income' onSubmit={onSubmitIncome}> {/* TODO: transform this in drawer and add a date??*/}
            <input type='text' placeholder='description' required />
            <input type='number' placeholder='amount' required />
            <button type='submit' value='type'> add income </button>
          </form>
          <form className='add-expense'>
            <input type='text' placeholder='description' required />
            <input type='number' placeholder='amount' required />
            <select type='text' name="category" required>
              { categories.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <button type='submit' onSubmit={onSubmitExpense}> add expense </button>   
          </form>
      </div>
      <div className="transactions">
        <h2> transactions </h2>
      </div>
    </>
  );
};