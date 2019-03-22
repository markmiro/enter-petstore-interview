import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

function randomId() {
  return Math.random()
    .toString()
    .slice(2);
}

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={LoginUser} />
        <Route exact path="/store" component={Store} />
        <Route path="/store/add-pet" component={CreatePet} />
        <Route path="/store/order-pet" component={OrderPet} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/create" component={CreateUser} />
        <Route path="/users/login" component={LoginUser} />
      </div>
    </Router>
  );
}

function Store() {
  const [petStats, setPetStats] = React.useState([]);
  const [pets, setPets] = React.useState([]);

  React.useEffect(() => {
    fetch("https://petstore.swagger.io/v2/store/inventory")
      .then(r => r.json())
      .then(setPetStats);
    fetch("https://petstore.swagger.io/v2/pet/findByStatus?status=available")
      .then(r => r.json())
      .then(setPets);
  }, []);

  return (
    <AuthenticatedPage>
      <h1>Store</h1>
      <Field label="Find Pet by ID" type="search" />
      Available: {petStats.available} • Pending: {petStats.pending} • Sold:{" "}
      {petStats.sold}
      <div className="flex justify-between items-center">
        <h2>Pets</h2>
        <Link to="/store/add-pet" className="mt3">
          + Add Pet
        </Link>
      </div>
      <div className="card">
        {pets.map((pet, i) => (
          <div key={i}>
            {pet.name} - {pet.id}
          </div>
        ))}
      </div>
    </AuthenticatedPage>
  );
}

function CreatePet() {
  const [name, setName] = React.useState("Doggie");
  const [status, setStatus] = React.useState("available");
  const [category, setCategory] = React.useState("some category");
  const [tags, setTags] = React.useState("some tag");
  const [image, setImage] = React.useState("");

  return (
    <AuthenticatedPage>
      <h1>Add Pet</h1>
      <form
        className="card"
        onSubmit={e => {
          e.preventDefault();
          fetch("https://petstore.swagger.io/v2/pet", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: randomId(),
              category: {
                id: randomId(),
                name: category
              },
              name,
              photoUrls: [image],
              tags: [
                {
                  id: randomId(),
                  name: tags
                }
              ],
              status
            })
          }).catch(err => alert("Something went wrong"));
        }}
      >
        <Field label="Name" value={name} onChange={setName} />
        <Field label="Status" value={status} onChange={setStatus} />
        <Field label="Category" value={category} onChange={setCategory} />
        <Field label="Tags" value={tags} onChange={setTags} />
        <Field label="Image URL" value={image} onChange={setImage} />
        <button type="submit">Add Pet</button>
      </form>
    </AuthenticatedPage>
  );
}

function OrderPet() {
  return (
    <AuthenticatedPage>
      <h1>Order Pet</h1>
      <p className="card">Different than adding a pet?</p>
    </AuthenticatedPage>
  );
}

function Users() {
  return (
    <AuthenticatedPage>
      <h1>Users</h1>
      <div className="card">
        <ul>
          <li>Add List of Users</li>
          <li>Delete User</li>
        </ul>
      </div>
    </AuthenticatedPage>
  );
}

function CreateUser() {
  return (
    <div className="App__login pa4">
      <h1>Create Account</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          alert("create account worked (fake)");
          window.location = "/store";
        }}
      >
        <Field label="Username" />
        <Field label="First Name" />
        <Field label="Last Name" />
        <Field label="Email" type="email" />
        <Field label="Password" type="password" />
        <Field label="Phone Number" type="tel" />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

function LoginUser() {
  return (
    <div className="App__login pa4">
      <h1>Login</h1>
      <form>
        <Field label="Username" />
        <Field label="Password" type="password" />
        <button
          type="submit"
          onClick={e => {
            e.preventDefault();
            // TODO: do login, then...
            window.location = "/store";
          }}
        >
          Login
        </button>
        <small className="db mt2 tc">
          Don't have an account? <Link to="/users/create">Sign up</Link>
        </small>
      </form>
    </div>
  );
}

function AuthenticatedPage({ children }) {
  return (
    <>
      <Header />
      <div className="flex flex-wrap">
        <Sidebar />
        <div className="App__body">{children}</div>
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <div className="nav nested-list-reset">
      <ul>
        <li>
          <Link className="nav-link" to="/store">
            Store
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>
        <li>
          {/* TODO: make this actually work */}
          <Link className="nav-link" to="/users/login">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="App__header">
        <h1 className="f5 mv0 b">Pet Store</h1>
        <div className="App__header__avatar">SM</div>
      </div>
    </>
  );
}

/*
  Acts as an input except:
  - We have a label
*/
function Field({ label, className, type, onChange, ...rest }) {
  return (
    <>
      <label className="db mb1">{label}</label>
      <input
        className={`db mb3 ${className}`}
        type={type}
        onChange={e => onChange(e.target.value)}
        {...rest}
      />
    </>
  );
}

export default App;
