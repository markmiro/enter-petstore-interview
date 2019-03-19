import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

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
  const [pets, setPets] = React.useState([]);

  React.useEffect(() => {
    fetch("https://petstore.swagger.io/v2/store/inventory")
      .then(r => r.json())
      .then(setPets);
  });

  return (
    <AuthenticatedPage>
      <h1>Store</h1>
      <Field label="Find Pet by ID" type="search" />
      Available: {pets.available} • Pending: {pets.pending} • Sold: {pets.sold}
    </AuthenticatedPage>
  );
}

function CreatePet() {
  return (
    <AuthenticatedPage>
      <h1>Add Pet</h1>
      <form className="card">
        <Field label="Name" />
        <Field label="Status" />
        <Field label="Category" />
        <Field label="Tags" />
        <Field label="Upload Image" type="file" />
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
    <div className="nested-list-reset">
      <ul>
        <li>
          <Link className="nav-link" to="/store">
            Store
          </Link>
          <ul>
            <li>
              <Link className="nav-link" to="/store/add-pet">
                Add Pet
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/store/order-pet">
                Order Pet
              </Link>
            </li>
          </ul>
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
function Field({ label, className, type, ...rest }) {
  return (
    <>
      <label className="db mb1">{label}</label>
      <input className={`db mb3 ${className}`} type={type} {...rest} />
    </>
  );
}

export default App;
