# Questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

The main difference between a Component and a PureComponent lies in how they handle rerendering conditions.

React Components rerender whenever its internal state or props change, as well as when its parent components are updated. This can potentially impact app performance, as unnecessary rerenders may occur. To address this, you can manually optimize the rerendering conditions by implementing the shouldComponentUpdate, since this method is not implemented by default on regular Components.

On the other hand, React PureComponents comes with the shouldComponentUpdate method already implemented. It performs a shallow comparison of the component's props and state values to determine whether a rerender is necessary. However, it's important to note that shallow comparisons may overlook certain prop changes if the compared values are complex objects or arrays. So, be careful because this might break your app.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

It might be thought that if a component using ShouldComponentUpdate skips a re-render, changes in the Context would not be reflected in that component. However, this is not the case, as the Context API ensures that consumers of a specific Context Provider will always re-render whenever the Context Provider changes, regardless of the results of ShouldComponentUpdate.

## 3. Describe 3 ways to pass information from a component to its PARENT.

- Using the context API: Components can share information with their parent by utilizing the context API. If the parent and child components are consumers of the same context provider, updates triggered by the child components will propagate to all other consumer components, including the parent.

- Using handlers: Child components can accept handler functions as props from the parent. When new data needs to be shared with the parent, the child component can call the handler function, passing the data as a parameter. For example: `<ChildComponent handler={(data) => handleData(data)} />`

- Using refs: Parent components can access information from child components using refs. The process involves:
  - Creating a ref in the parent component using the useRef hook. `const childComponentRef = useRef();`
  - Passing the ref to the child component via props: `<ChildComponent ref={childComponentRef}>`
  - Wrapping the child component in a forwardRef function: `const ChildComponent = forwardRef((props, ref) => {...})`
  - Implementing and exposing custom methods in the child component using the useImperativeHandle hook: `useImperativeHandle(ref, () => ({ getData: () => {...}, updateData: () => {...}}));`
  - Accessing the custom methods in the parent component using `ref.current.getData()`

## 4. Give 2 ways to prevent components from re-rendering.

- Implementing the shouldComponentUpdate method on Class based components or using Pure Components.
- Using memoization: `React.memo()` returns a memoized version of a component, skipping unnecessary rerenders.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment in React is a way to group multiple elements without introducing an additional container element in the DOM. It allows you to return a list of elements without the need for a wrapping \<div\>. Fragments improve performance and avoid unnecessary nesting in the DOM.

However, if you ignore the fact that a component returns a fragment instead of a single container element, it can cause unexpected behavior, such as styling issues when using flex layouts.

## 6. Give 3 examples of the HOC pattern.

A Higher Order Component (HOC) is a pattern for reusing component logic. Some examples are shown below:

- forwardRef: As shown above, forwardRef is a HOC for adding a second parameter to a functional component for exposing the forwarded ref from the parent.

- withStyles: There's a popular UI components library called MaterialUI that has a HOC for injecting classes to a component. When using this HOC, the injected classes are available as an additional prop. It enables easy reusability of styles across different components. `withStyles(styles)(component);`

- Context consumers: HOCs can wrap a component with <MyContext.Consumer> tags, providing access to context information within the component. This allows the component to consume data or behavior from a higher-level context.

Nowadays, HOCs are less commonly used as many of their use cases can be easily implemented using hooks.

## 7. What's the difference in handling exceptions in promises, callbacks and async...await.

- Callback methods typically accept the following arguments:
  - error: indicates if errors or caught exceptions were found during the execution of the task.
  - result: contains the result of the asynchronous task when it ends successfully.
- When using promises, the following methods can be chained to them:
  - Then: to specify what to do when the promise is resolved successfully (resolve)
  - Catch: to specify what to do when the promise is rejected (reject) or when an error is thrown.
  - Finally: to specify what to do when the promise is settled.
- Finally, when using the async/await syntax.
  - The await keyword can only be used inside async functions so the parent function should include the async keyword when it is declared.
  - If the async task run successfully, the main function resumes its execution.
  - If the async task fails, an exception is thrown. So, await calls should be wrapped in try/catch blocks in order to act accordingly.

To summarize, caught exceptions and errors are handled in the following ways:

- Callbacks: They are handled in the callback function when the error parameter contains information.
- Promises: They are handled in the catch method.
- Async/Await: They are handled in surrounding try/catch blocks.

## 8. How many arguments does setState take and why is it async.

setState takes two arguments:

- Updater: It can be an object that includes the fields you want to update, or a function that receives the previous state and props as arguments and returns the new desired state.

- Callback: This optional function is called after the component has re-rendered.

setState is asynchronous because React batches multiple setState calls together for performance reasons. The changes made by setState do not immediately take effect; they are only reflected during the next rendering phase. This batching helps prevent excessive re-renders and improves overall performance.

## 9. List the steps needed to migrate a Class to Function Component.

1. Create a function that accepts the component props as arguments and initially returns null.
2. Move the contents of the Class Component's render method to the return statement in the Function Component.
3. Introduce state to the Function Component using the useState hook, and replace all setState calls with the appropriate setter function provided by useState.
4. Implement functions in the Function Component to replicate the functionality of the methods used in the Class component.
5. Utilize hooks, such as useEffect, to handle lifecycle methods and side effects. useEffect can mimic componentDidMount, componentDidUpdate, and componentWillUnmount.
   6.Remove all references to 'this'.

## 10. List a few ways styles can be used with components.

- Inline styles using the _style_ prop: this prop accepts a Javascript object with camelCased CSS properties. `<div style={{backgroundColor: 'red'}}>`
- CSS modules: This method allows you to create classes in separate CSS files, import them into your components files and apply the class styles using the className prop. `<div className={styles.container}>`
- Styled components, which allows you to write CSS inside your components using template literals. const container = styled.div\`
  background-color: red;
  \`
- Utility first css using the className prop. `<div className="bg-indigo-500">`

## 11. How to render an HTML string coming from the server.

To render an HTML string in React, you can use the dangerouslySetInnerHTML prop. Pass an object with the structure `{__html: '<p>Hello world!</p>'}`:

```
<div dangerouslySetInnerHTML={{__html: '<p>Hello world!</p>'}} />
```

However, you should only use this approach when you are confident that the HTML content is safe and doesn't expose users to security risks, such as XSS attacks. It's recommended to sanitize the content to remove any potentially malicious code embedded in it.
