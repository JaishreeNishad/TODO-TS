import './style.css';

interface Todo {
  title: string; 
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];
const todoContainer = document.querySelector(".todocontainer") as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

// Handle form submission
myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };

  todos.push(todo); 
  todoInput.value = ""; 
  renderTodo(todos);
};

// Generate a single todo item
const generateTodoItem = (todo: Todo) => {
  const todoElement = document.createElement("div");
  todoElement.className = "todo";

  // Creating a checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = todo.isCompleted;

  // Creating a paragraph for the title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = todo.title;

  // Creating Delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";

  // Append all todo item elements
  todoElement.append(checkBox, paragraph, btn);
  todoContainer.append(todoElement);

  // Add event listener for the delete button
  btn.onclick = () => {
    deleteTodo(todo.id);
  };
};

// Delete todo function
const deleteTodo = (id: string) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1); // Remove todo from the array
    renderTodo(todos); // Re-render the todo list
  }
};

// Render todos
const renderTodo = (todos: Todo[]) => {
  todoContainer.innerHTML = ""; 
  if (todos.length === 0) {
    const noTodoMessage = document.createElement("p");
    noTodoMessage.innerText = "No todo yet";
    todoContainer.append(noTodoMessage); 
  } else {
    todos.forEach(item => {
      generateTodoItem(item);
    });
  }
};
