import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useLoaderData,
  useRouteError,
  Outlet,
  useNavigation,
  useActionData,
  Form,
} from "react-router-dom";

//URL DATA "https://jsonplaceholder.typicode.com/posts"

// const fetchData = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }
//   return res.json();
// };

// // Component for the Home page
// function Home() {
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <p>
//         Go to the <Link to="/posts">Posts</Link> page to view the list of posts.
//       </p>
//     </div>
//   );
// }

// // Component for the Posts page
// function Posts() {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadPosts() {
//       try {
//         const data = await fetchData();
//         setPosts(data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadPosts();
//   }, []);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return (
//       <div>
//         <h1>Error</h1>
//         <p>{error.message || "Something went wrong"}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//       <Link to="/">Go back to Home</Link>
//     </div>
//   );
// }

// // Define routes
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />, // Home page
//   },
//   {
//     path: "/posts",
//     element: <Posts />, // Posts page
//   },
//   {
//     path: "*",
//     element: <h1>404: Page Not Found</h1>, // Component for non-existent routes
//   },
// ]);

// // Main application component
// function App() {
//   return <RouterProvider router={router} />;
// }

const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
};

const createPost = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if(!response.ok){
    throw new Error("failed to create a post");
  }
  const result = await response.json();
  console.log(result);
  return result;
};

function Layout() {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" && <p>Loading...</p>}
      <Outlet />
    </div>
  );
}

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

function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}

// Component for the Posts page
function Posts() {
  const posts = useLoaderData();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

function CreatePost() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <div>
      <h1>Create a Post</h1>

      <Form method="post" action="create">
        <input type="text" name="title" placeholder="Title" required />

        <button type="submit" disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Sending..." : "Create Post"}
        </button>
      </Form>

      {actionData && (
        <div style={{ marginTop: "1rem", color: "green" }}>
          <strong>Post created successfully!</strong>
          <br />
          ID: {actionData.id}, Title: {actionData.title}
        </div>
      )}

      <Link to="/">Back to Home</Link>
    </div>
  );
}

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />, // Home page
      },
      {
        path: "/posts",
        element: <Posts />, // Posts page
        loader: fetchData,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/create",
        element: <CreatePost />,
        action: createPost,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "*",
        element: <h1>404: Page Not Found</h1>, // Component for non-existent routes
      },
    ],
  },
]);

// Main application component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
