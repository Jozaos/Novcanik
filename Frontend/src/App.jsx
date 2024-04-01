import { useState } from 'react'
import reactLogo from './assets/react.svg'
import mojLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Home from './pages/Home'
import Expenses from './pages/Expenses/Expenses'
import ExpensesAdd from './pages/Expenses/ExpensesAdd'
import ExpensesChange from './pages/Expenses/ExpensesChange'

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Home />} />

        <Route path={RoutesNames.EXPENSE_OVERVIEW} element={<Expenses />} />
        <Route path={RoutesNames.EXPENSE_NEW} element={<ExpensesAdd />} />
        <Route path={RoutesNames.EXPENSE_CHANGE} element={<ExpensesChange />} />
        
      </Routes>
    </>
  )
}

export default App
