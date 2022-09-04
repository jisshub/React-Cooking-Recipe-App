# Cooking Recipe Project
## Router & Pages Set Up

- Create seperate folder for each pages. Because we may have different components that make up
certain pages. For example we may split *create* page into two or three components. Similarly we might split *home* page into two or three components.

![](./images/image1.jpg)

- Create component for each page.

- Install react route dom package.

```bash
npm install react-router-dom@5.1
```

- Set the routes to each component in App.js

```js
<div className="App">
    <Router>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/create" component={Create} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/search" component={Search} />
    </Switch>
    </Router>
</div>
```

![](./images/image2.jpg)

## Create a Navbar Component

- Create a component for navbar in component folder.

```js
export default function Navbar() {
  return (
    <div className='navbar'>
        <nav>
            <Link to="/" className='brand'>
                <h1>Cooking Ninja</h1>
            </Link>
            <Link to="/create" >
                Create Recipe
            </Link>
        </nav>
    </div>
  )
}
```

## Fetching Data

- create a hooks folder to add useFetch hook file.

**useEffect.js**

```js
export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async () => {
            setIsPending(true)
        try {
            const response = await fetch(url, {
                signal: controller.signal
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const json = await response.json()
            setIsPending(false)
            setData(json)
            setError(null)
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('fetch aborted');
            } else {
                setIsPending(false)
                setError('Could not fetch data')
            }
        }
        }
        fetchData()
        return () => controller.abort()
    }, [url])
    
    return {data, isPending, error}
}
```

- Next fetch the data from db.json file into Home component.
- Show recipe title on our page.

**Home.js**

```js
const {data, isPending, error} = useFetch('http://localhost:3000/recipes');
export default function Home() {
  const {data, isPending, error} = useFetch('http://localhost:3000/recipes');
  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && data.map(recipe => (
        <h2 key={recipe.id}>{recipe.title}</h2>
      ))}
    </div>
    
  )
}
```

![](./images/image3.jpg)
## Recipe List Component

- Create a separate component to list out our recipees.
    1. because it keeps our home component clean and modular.
    2. also we can reuse this component in other pages.

**Home.js**

- Define a prop here to pass the data from Home component to RecipeList component.

```js
{data && <RecipeList recipes={data} />}
```

- Create a RecipeList component.
- Destructue the prop recipes which is passed as an argument to RecipeList component.

**RecipeList.js**

```js
export default function RecipeList({recipes}) {
  return (
    <div>
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div className='card' key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method.substring(0,100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                </div>
            ))}
        </div>
    </div>
  )
}
```

## Fetching a Single Recipe

- Show single recipe details on Recipe component.
- Extract the route for single recipe.
- We use **useParams** hook to fetch id from url.

```js
export default function Recipe() {

    // useParams hook to fetch id from url.
  const {id} = useParams();

//   construct endpoint to fetch the data from db.json file.
  const url = `http://localhost:3000/recipes/${id}`;

//   get data using useFetch
  const {data: recipe, isPending, error} = useFetch(url);
  return (
    <div className="recipe">
    // ouput loading message if data is not fetched yet.
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
    //   output the recipe details if data is fetched.
      {recipe && (
        <div className='recipe'>
          <h2>{recipe.title}</h2>
          <p>{recipe.cookingTime} to make.</p>
        </div>
      )}
    </div>
  )
}
```

## Recipe Details Template

**Recipe.js**

```js
export default function Recipe() {
  const {id} = useParams();
  const url = `http://localhost:3000/recipes/${id}`;
  const {data: recipe, isPending, error} = useFetch(url);
  return (
    <div className='recipe'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
          <>
            <h2 className='page-title'>
              {recipe.title}
            </h2>
            <p>Takes {recipe.cookingTime} to cook.</p>
            <ul>
              {recipe.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <p className='method'>{recipe.method}</p>
          </>
      )}
    </div>
  ) 
}
```    

![](./images/image5.PNG)

## Create Recipe Form


**Create.js**

```js
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
```

### Screenshot 
![](./images/image6.jpg)


## Adding Multiple Ingredients

- Create JSX template for adding multiple ingredients.

**Create.js**

```jsx
<label>
  <span>
    React Ingredients:
  </span>
  <div className='ingredients'>
    <input type='text'/>
    <button className='add'>Add</button>
  </div>
</label>
```
- We use **useState** hook to store each single ingredient we add.

```js
const [newIngredient, setNewIngredient] = useState('');
```

- We again use **useState** hook to pass all the stored ingredients into a new array.

```js
const [ingredients, setIngredients] = useState([]);
```

- Update the template

```jsx
<label>
  <span>
    React Ingredients:
  </span>
  <div className='ingredients'>
    <input 
      type='text'
      value={newIngredient}
      onChange={e => setNewIngredient(e.target.value)}
      />
    <button className='add' onClick={addIngredients}>Add</button>
  </div>
</label>
```

**Create.js**

- Define addIngredients function to add new ingredient to the array.

```js
const addIngredients = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    // check if ingredient is not empty and check if ingredient not included in the array.
    // no duplicate values allowed.
    if (ing && !ingredients.includes(ing)) {
      // Set the ingredents array to include the new ingredient. 
      // 1. Use previous state to create a new function. 
      // 2. Inside that function, create an array. 
      // 3. Push the new ingredient and previous ingredients into the array. 
      setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }
    // Reset the new ingredient input.
    setNewIngredient('');
  }
```

- using useRef hook to set focus on ingredient input field.

```js
const ingredientRef = useRef(null);

const addIngredients = (e) => {
  e.preventDefault();
  const ing = newIngredient.trim();
  if (ing && !ingredients.includes(ing)) {
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }
  setNewIngredient('');
  ingredientRef.current.focus();
}
```

```jsx
<input 
  type='text'
  value={newIngredient}
  ref={ingredientRef}
  onChange={e => setNewIngredient(e.target.value)}
/>
```

### Screenshot 

![](./images/image8.jpg)


### Output ingredients right below the input field

- Output the ingredients we gave underneath the input field.
- we use map method to cycle through each ingredient and display it.


```jsx
<p>Current Ingredients: {ingredients.map(ingredient => <em key={ingredient}>{ingredient}, </em>)}</p>
```

## Making POST Request

- On clicking submit add data to a json file.
- Set options for post request.

**Create.js**

```js
const [options, setOptions] = useState(null)

const postData = (postData) => {
    setOptions({
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
}
```

- Pass method and options into useEffect hook as dependencies.

**useFetch.js**

```js
export const useFetch = (url, method='GET') => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)
    const ref = useRef(false)
    
    const postData = (postData) => {
        setOptions({
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });
    };
    useEffect(() => {
        ref.current = true
        const controller = new AbortController()
        let {signal} = controller
        const fetchData = async (fetchOptions) => {
            setIsPending(true)
        try {
            const response = await fetch(url, {
                ...fetchOptions, signal
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const json = await response.json()
            setIsPending(false)
            setData(json)
            setError(null)
        } catch (error) {
            if (error.name === 'AbortError' && !ref) {
                console.log('fetch aborted');
            } else {
                setIsPending(false)
                setError('Could not fetch data')
            }
        }
        }
        if (method==='GET') {
            fetchData();
        }
        if (method==='POST' && options) {
            fetchData(options);
        }
            
        fetchData()
        return () => {
            ref.current = false;
            controller.abort()
        }
    }, [url, options, method])
    
    return {data, isPending, error}
}
```
 
## useFetch Hook working

- Imagine if we invoke **useFetch** hook. hook is invoked and url is passed in. 
- First thing is **useEffect** hook is fired and check is performed on method.
- Call **fetchData** function to fetch data and return the data and error.
- If the method is **POST**, we invoke the hook in the component and pass the method as POST, url and options as postData. 
- **useEffect** hook is fired and check is performed on method.
- Since method is **POST**, invoke **fetchData()** function and pass the options.
- In **fetchData** function, we get the options and spread them in to the fetch function along with signal properties.
- Then it makes the **POST** request for the data.
- Next we have to use **postData** function inside our **Create** component when a user submits a form.

Time: 8: 40

## Making a POST REQUEST





