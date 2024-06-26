import { useState } from 'react'
import reactLogo from './assets/react.svg'
import mojLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Home from './pages/Home'
import Expenses from './pages/expenses/Expenses'
import ExpensesAdd from './pages/expenses/ExpensesAdd'
import ExpensesChange from './pages/expenses/ExpensesChange'
import Accounts from './pages/accounts/Accounts'
import AccountsAdd from './pages/accounts/AccountsAdd'
import AccountsChange from './pages/accounts/AccountsChange'
import Incomes from './pages/incomes/Incomes'
import IncomesAdd from './pages/incomes/IncomesAdd'
import IncomesChange from './pages/incomes/IncomesChange'

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Home />} />
        <Route path={RoutesNames.EXPENSE_OVERVIEW} element={<Expenses />} />
        <Route path={RoutesNames.EXPENSE_NEW} element={<ExpensesAdd />} />
        <Route path={RoutesNames.EXPENSE_CHANGE} element={<ExpensesChange />} />

        <Route path={RoutesNames.ACCOUNT_OVERVIEW} element={<Accounts />} />
        <Route path={RoutesNames.ACCOUNT_NEW} element={<AccountsAdd />} />
        <Route path={RoutesNames.ACCOUNT_CHANGE} element={<AccountsChange />} />

        <Route path={RoutesNames.INCOME_OVERVIEW} element={<Incomes />} />
        <Route path={RoutesNames.INCOME_NEW} element={<IncomesAdd />} />
        <Route path={RoutesNames.INCOME_CHANGE} element={<IncomesChange />} />

      </Routes>
    </>

    
  )
}

export default App
