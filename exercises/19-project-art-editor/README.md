# Creating an Art Editor with concepts of React and Redux

We’re going to be strict about data flow. There is a state, and the interface is drawn based on that state. An interface component may respond to user actions by updating the state, at which point the components get a chance to synchronize themselves with this new state.

In practice, each component is set up so that when it is given a new state, it also notifies its child components, insofar as those need to be updated. Setting this up is a bit of a hassle. Making this more convenient is the main selling point of many browser programming libraries. But for a small application like this, we can do it without such infrastructure.

Updates to the state are represented as objects, which we’ll call actions. Components may create such actions and dispatch them—give them to a central state management function (reducer). That function computes the next state, after which the interface components update themselves to this new state.

Though the DOM-related pieces are still full of side effects, they are held up by a conceptually simple backbone: the state update cycle. The state determines what the DOM looks like, and the only way DOM events can change the state is by dispatching actions to the state.

Our components will be classes conforming to an interface. Their constructor is given a state—which may be the whole application state or some smaller value if it doesn’t need access to everything—and uses that to build up a dom property. This is the DOM element that represents the component. Most constructors will also take some other values that won’t change over time, such as the function they can use to dispatch an action.

Each component has a syncState method that is used to synchronize it to a new state value. The method takes one argument, the state, which is of the same type as the first argument to its constructor.
