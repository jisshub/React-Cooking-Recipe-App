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



Next: https://www.udemy.com/course/build-web-apps-with-react-firebase/learn/lecture/29067008#overview

