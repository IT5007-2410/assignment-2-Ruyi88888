/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const totalSeats = 10;
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555,
    bookingTime: new Date(),
    email:'Jack5555@gmail.com',
    departure:'London',
    arrival:'Paris',
    travelDate: new Date('2024-12-25'),
    travelClass:'Economy',
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444,
    bookingTime: new Date(),
    email:'Rose4444@gmail.com',
    departure:'Singapore',
    arrival:'Bangkok',
    travelDate: new Date('2024-11-01'),
    travelClass:'Economy',
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const traveller = props.traveller;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    <td>{traveller.id}</td>
    <td>{traveller.name}</td>
    <td>{traveller.phone}</td>
    <td>{traveller.bookingTime.toLocaleString()}</td>
    <td>{traveller.email}</td>
    <td>{traveller.departure}</td>  
    <td>{traveller.arrival}</td>  
    <td>{traveller.travelDate.toLocaleString()}</td>
    <td>{traveller.travelClass}</td>  
    </tr>
  );
}

function Display(props) {
  const { travellers } = props;

  if (!travellers || !Array.isArray(travellers)) {
    return <div>No travellers data available.</div>;
  }

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Email</th>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Travel Date</th>
          <th>Travel Class</th>
        </tr>
      </thead>
      <tbody>
        {travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}


class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const newTraveller = {
      id: this.props.travellers.length + 1,
      name: form.travellername.value,
      phone: form.travellerphone.value,
      bookingTime: new Date(),
      email: form.travelleremail.value,
      departure: form.travellerdeparture.value,
      arrival: form.travellerarrival.value,
      travelDate: new Date(form.travellertravelDate.value),
      travelClass: form.travellertravelClass.value,};
      this.props.bookTraveller(newTraveller);
      form.reset();
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required/>
        <input type="text" name="travellerphone" placeholder="Phone" required/>
        <input type="email" name="travelleremail" placeholder="Email" required/>
        <input type="text" name="travellerdeparture" placeholder="Departure" required/>
        <input type="text" name="travellerarrival" placeholder="Arrival" required/>
        <input type="date" name="travellertravelDate" placeholder="Travel Date" required/>
        <input type="text" name="travellertravelClass" placeholder="Travel Class" required/>

        <button>Add Traveller</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const travellerName = form.travellername.value;
    this.props.deleteTraveller(travellerName);
    form.reset();
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	      <input type="text" name="travellername" placeholder="Name" />    
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  render() {
    const { travellers } = this.props;

    if (!travellers || !Array.isArray(travellers)) {
      return <div>No travellers data available.</div>;
    }

    const totalSeats = 10;
    const freeSeats = totalSeats - travellers.length;

    return (
      <div>
        <h2>Welcome to Ticket To Ride!</h2>
        <p>We have {travellers.length} travellers booked.</p>
      </div>
    );
  }
}


class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(newTraveller) {
    this.setState((prevState) => ({
      travellers: [...prevState.travellers, newTraveller],  
    }));
  }
  


  deleteTraveller(passenger) {
    this.setState((prevState) => ({
      travellers: prevState.travellers.filter(traveller => traveller.name !== passenger),
    }));
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	      <div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
        <button onClick={() => this.setSelector(1)}>Homepage</button>
        <button onClick={() => this.setSelector(2)}>Display Travellers</button>
        <button onClick={() => this.setSelector(3)}>Add Traveller</button>
        <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
	      </div>
	      <div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}	
		{/*Q4. Code to call the component that adds a traveller.*/}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        {this.state.selector === 1 && <Homepage travellers={this.state.travellers} />}
        {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
        {this.state.selector === 3 && <Add travellers={this.state.travellers} bookTraveller={this.bookTraveller} />}
        {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
	      </div>
      </div>
    );

  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));

