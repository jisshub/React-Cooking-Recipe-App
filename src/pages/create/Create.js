import './Create.css';

import React from 'react'
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  const resetForm = () => {
    setTitle('');
    setMethod('');
    setCookingTime('');
  }
  const createRecipe = (e) => {
    e.preventDefault();
    const recipe = {
      title,
      method,
      cookingTime
    }
    console.log(recipe)
    resetForm();
  }
  return (
    <div className='create'>
      <h2 className='page-title'>
        Add a New Recipe
      </h2>
      <form onSubmit={createRecipe} >
        <label>
          <span>
            Recipe Title:
          </span>
          <input 
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>
            Recipe Method:
          </span>
          <textarea 
            value={method}
            onChange={e => setMethod(e.target.value)}
            required
          />
        </label>
        <label>
          <span>
            Cooking Time (Minutes):
          </span>
          <input
            type='number'
            value={cookingTime}
            onChange={e => setCookingTime(e.target.value)}
            required
          />
        </label>
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}
