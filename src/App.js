import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App__header">
          <h1 className="f5 mv0 b">Pet Store</h1>
          <div className="App__header__avatar">SM</div>
        </div>
        <div className="nested-list-reset">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/store">Store</Link>
              <ul>
                <li>
                  <Field label="Find Pet by ID" type="search" />
                </li>
                <li>
                  <Link to="/store/add-pet">Add Pet</Link>
                </li>
                <li>
                  <TODO>Order</TODO>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/users">Users</Link>
              <ul>
                <li>
                  <Link to="/users/create">Create Account</Link>
                </li>
                <li>
                  <Link to="/users/login">Login</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="App__body">
          <Route exact path="/" component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/store/add-pet" component={CreatePet} />
          <Route exact path="/users" component={Users} />
          <Route path="/users/create" component={CreateUser} />
          <Route path="/users/login" component={LoginUser} />
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function Store() {
  const [pets, setPets] = React.useState([]);

  React.useEffect(() => {
    fetch("https://petstore.swagger.io/v2/store/inventory")
      .then(r => r.json())
      .then(json => {
        // As an array of [pet name, status] pairs
        const asPairs = Object.keys(json).map(k => ({
          name: k,
          status: json[k]
        }));
        setPets(asPairs);
      });
  });

  return (
    <div>
      <h1>Store</h1>
      <h2>Pets</h2>
      <TODO>Verify that it's status codes to quantities, not pet names</TODO>
      <ul>
        {pets.map(pet => (
          <li>{pet.name}</li>
        ))}
      </ul>
    </div>
  );
}

function CreatePet() {
  return (
    <div>
      <h1>Add Pet</h1>
      <form>
        <Field label="Name" />
        <Field label="Status" />
        <Field label="Category" />
        <Field label="Tags" />
        <TODO>Show photos</TODO>
        <Field label="Upload Image" type="file" />
      </form>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}

function CreateUser() {
  return (
    <div>
      <h1>Create Account</h1>
      <form>
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
    <div>
      <h1>Login</h1>
      <form>
        <Field label="Username" />
        <Field label="Password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
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

function TODO({ children }) {
  return <div className="gray b">TODO: {children}</div>;
}

export default App;
