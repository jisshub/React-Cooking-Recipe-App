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
                    <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
                </div>
            ))}
        </div>
    </div>
  )
}
```
