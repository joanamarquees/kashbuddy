import { useGetTransactions } from "../../hooks/useGetTransactions.js";
import { IoAddCircle } from "react-icons/io5";

import { NewTransactionForms } from '../../components/NewTransaction.jsx';
import { setDrawerState, Drawer } from '../../components/Drawer.jsx';


export const Expenses = () => {
  const { transactions } = useGetTransactions();

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
          
      </div>
      <div className="transactions">
        <h2> transactions </h2>
        <ul> 
          {transactions.map((transaction) => {
            const { description, amount, transactionType } = transaction; //TODO: category???

            return (
              <li> 
                <h4> {description} </h4>
                <p> {amount}€
                  <label style={{color : transactionType === "expense" ? "red" : "green" }}> {transactionType}
                  </label>
                </p>
              </li>
            )
          })}
        </ul>


        <p>NEW PAGE</p>
        <Drawer views={{"New-transaction": <NewTransactionForms />}}/>
        <IoAddCircle
          size={70}
          className='text-indigo-400 cursor-pointer fixed bottom-4 right-4'
          onClick={() => setDrawerState("New-transaction")}
        />


      </div>
    </>
  );
};