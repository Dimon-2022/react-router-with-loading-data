import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

//URL DATA "https://jsonplaceholder.typicode.com/posts"

// Component for the Home page
function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>
        Go to the <Link to="/posts">Posts</Link> page to view the list of posts.
      </p>
    </div>
  );
}

// Component for the Posts page
function Posts() {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {/* {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))} */}
      </ul>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home page
  },
  {
    path: "/posts",
    element: <Posts />, // Posts page
  },
  {
    path: "*",
    element: <h1>404: Page Not Found</h1>, // Component for non-existent routes
  },
]);

// Main application component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
