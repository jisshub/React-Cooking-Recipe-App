import './Create.css';

import React from 'react'
import { useState, useRef } from "react";

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientRef = useRef(null);

  const resetForm = () => {
    setTitle('');
    setMethod('');
    setCookingTime('');
  }
  const addIngredients = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }
    setNewIngredient('');
    ingredientRef.current.focus();
  }
  
  const createRecipe = (e) => {
    e.preventDefault();
    const recipe = {
      title,
      method,
      cookingTime,
      ingredients
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
            React Ingredients:
          </span>
          <div className='ingredients'>
            <input 
              type='text'
              value={newIngredient}
              ref={ingredientRef}
              onChange={e => setNewIngredient(e.target.value)}
              />
            <button className='add' onClick={addIngredients}>Add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map(ingredient => <em key={ingredient}>{ingredient},</em>)}</p>
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
