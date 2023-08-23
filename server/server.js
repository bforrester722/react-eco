import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import uuid from "uuid";

var fakeTodos = [
  {
    id: "ae06181d-92c2-4fed-a29d-fb53a6301eb9",
    text: "Learn about React Ecosystems",
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: "cda9165d-c263-4ef6-af12-3f1271af5fb4",
    text: "Get together with friends",
    isCompleted: false,
    createdAt: new Date(Date.now() - 86400000 * 7),
  },
  {
    id: "2e538cc5-b734-4771-a109-dfcd204bb38b",
    text: "Buy groceries",
    isCompleted: true,
    createdAt: new Date(Date.now() - 86400000 * 14),
  },
];

const app = express();

app.use(bodyParser.json());
app.use(cors());

// The route for getting a list of all todos
app.get("/todos", (req, res) => {
  res.status(200).json(fakeTodos);
});

// The route for getting a list of all todos, but with a delay
// (to display the loading component better)
app.get("/todos-delay", (req, res) => {
  setTimeout(() => res.status(200).json(fakeTodos), 2000);
});

// The route for creating new todo-list items
app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (text) {
    const insertedTodo = {
      id: uuid(),
      createdAt: Date.now(),
      isCompleted: false,
      text,
    };
    fakeTodos.push(insertedTodo);
    res.status(200).json(insertedTodo);
  } else {
    res
      .status(400)
      .json({ message: "Request body should have a text property" });
  }
});

app.post("/todos/:id/completed", (req, res) => {
  const { id } = req.params;
  const matchingTodo = fakeTodos.find((todo) => todo.id === id);
  const updatedTodo = {
    ...matchingTodo,
    isCompleted: true,
  };
  if (updatedTodo) {
    fakeTodos = fakeTodos.map((todo) => (todo.id === id ? updatedTodo : todo));
    res.status(200).json(updatedTodo);
  } else {
    res.status(400).json({ message: "There is no todo with that id" });
  }
});

// The route for deleting a todo-list item
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const removedTodo = fakeTodos.find((todo) => todo.id === id);
  fakeTodos = fakeTodos.filter((todo) => todo.id !== id);
  res.status(200).json(removedTodo);
});

let users = [
  {
    id: "123",
    name: "John Doe",
    age: 54,
    hairColor: "brown",
    hobbies: ["swimming", "bicycling", "video games"],
  },
  {
    id: "234",
    name: "Brenda Smith",
    age: 33,
    hairColor: "black",
    hobbies: ["golf", "mathematics"],
  },
  {
    id: "345",
    name: "Jane Garcia",
    age: 27,
    hairColor: "blonde",
    hobbies: ["biology", "medicine", "gymnastics"],
  },
];
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  res.json(users.find((user) => user.id === id));
});

app.post("/users/:id", (req, res) => {
  const { id } = req.params;
  const { user: updatedUser } = req.body;

  users = users.map((user) => (user.id === id ? updatedUser : user));

  res.json(users.find((user) => user.id === id));
});

let products = [
  {
    id: "1234",
    name: "Flat-Screen TV",
    price: "$300",
    description: "Huge LCD screen, a great deal",
    rating: 4.5,
  },
  {
    id: "2345",
    name: "Basketball",
    price: "$10",
    description: "Just like the pros use",
    rating: 3.8,
  },
  {
    id: "3456",
    name: "Running Shoes",
    price: "$120",
    description: "State-of-the-art technology for optimum running",
    rating: 4.2,
  },
];

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  res.json(products.find((product) => product.id === id));
});

app.post("/products/:id", (req, res) => {
  const { id } = req.params;
  const { product: updatedProduct } = req.body;

  products = products.map((product) =>
    product.id === id ? updatedProduct : product
  );

  res.json(products.find((product) => product.id === id));
});
app.listen(8080, () => console.log("Server listening on port 8080"));
