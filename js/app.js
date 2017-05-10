const queueContainer = document.getElementById('queue');
const inProgressContainer = document.getElementById('inProgress');

const done = document.getElementById('done');

const getCards = () => new Promise((resolve, reject) =>{
  const cardsFromGetCards = [
      {
        id: 1,
        title: "test task",
        priority: "High",
        status: "Queue",
        created_by: "Adam",
        assigned_to: "Bob"
      },
      {
        id: 2,
        title: "Laundry",
        priority: "Medium",
        status: "Queue",
        created_by: "Adam",
        assigned_to: "Kat"
      }
    ];
    setTimeout(() => resolve(
      cardsFromGetCards),250);
});

const Card = (props) => (
  <li>
    <h3>Title: { props.card.title }</h3>
    <p>id: { props.card.id }</p>
    <p>Priority: { props.card.priority }</p>
    <p>Status: { props.card.status}</p>
    <p>Created by: { props.card.created_by}</p>
    <p>Assigned to: { props.card.assigned_to}</p>
  </li>
);


const CardList = ({ cards }) =>(
  <ul>
    {  cards.map(card => <Card card={card} /> ) }
  </ul>
  );

let id = 3;

class NewCardForm extends React.Component {
  constructor(props){

    super(props);

    this.state = {
      id: id,
      title: "",
      priority: "",
      status: "Queue",
      created_by: "",
      assigned_to: ""
    };


    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleTitleChange = this.handleTitleChange.bind(this);

    this.handlePriorityChange = this.handlePriorityChange.bind(this);

    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);

    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
  }

    addCard(card){
      console.log(card);
      this.props.addCard(card);
      const title = "";
      const priority = "";
      const created_by = "";
      const assigned_to = "";
      this.setState({
        id,
        title,
        priority,
        status,
        created_by,
        assigned_to
      });
    }

    handleSubmit(event) {
      console.log('hit handle submit');
      id++;
      event.preventDefault();
      console.log(this.state);
      this.addCard(this.state);
    }

    // handleIdChange(event) {
    //   console.log('hit handled id change')
    //   console.log(this.state)
    //   event.preventDefault();
    //   this.setState({ id: event.target.value });
    // }
    handleTitleChange(event){
      console.log('hit handle title change')
      event.preventDefault();
      this.setState({ title: event.target.value });
    }
    handleStatusChange(event){
      console.log('hit handle status change')
      event.preventDefault();
      this.setState({ status: event.target.value});
    }
    handlePriorityChange(event){
      console.log('hit handle priority change')
      event.preventDefault();
      this.setState({ priority: event.target.value });
    }
    handleCreatedByChange(event) {
      console.log('hit handle created by change')
      event.preventDefault();
      this.setState({ created_by: event.target.value });
    }

    handleAssignedToChange(event){
      console.log('hit handle assigned to change')
      event.preventDefault();
      this.setState({ assigned_to: event.target.value});
    }
    render(){
      return(
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" placeholder="title" onChange={this.handleTitleChange} value={this.state.title} />
          </div>

          <div>
            <input type="text" placeholder="Priority" onChange={this.handlePriorityChange} value={this.state.priority} />
          </div>

          <div>
            <input type="text" placeholder="Created By" onChange={this.handleCreatedByChange} value={this.state.created_by} />
          </div>

          <div>
            <input type="text" placeholder="Assigned To" onChange={this.handleAssignedToChange} value={this.state.assigned_to} />
          </div>

          <div>
            <button type="submit">Add Card</button>
          </div>
        </form>
        )
    }
  }




class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      cards: [],
    };
    this.addCard = this.addCard.bind(this);
  }
  componentWillMount() {
    this.getFakeCards()
      .then(cards =>{
        this.setState({ cards });
      });
    }

  addCard(card){
    this.setState({
      cards : this.state.cards.concat(card)
    });
  }

  getFakeCards(){
    return  getCards();
  }

  render(){
    return(
      <div>
        <h1>Hello Cards</h1>
        <CardList cards={this.state.cards}></CardList>
        <NewCardForm addCard={this.addCard}/>
      </div>
    );
  }
};

ReactDOM.render(

  <App />,

  queueContainer

);









