const queueContainer = document.getElementById('kanbanBoard');
const inProgressContainer = document.getElementById('inProgress');
const done = document.getElementById('done');




const getCards = () => fetch('/api/cards', {
    method: 'GET'
  }).then((response) =>{
    return response.json()
  })
  .catch(err => {
    throw err;
  })

const Card = (props) => (
  <li className="task">
    <h3>Title: { props.card.title }</h3>
    <p>id: { props.card.id }</p>
    <p>Priority: { props.card.priority }</p>
    <p>Status: { props.card.status}</p>
    <p>Created by: { props.card.created_by}</p>
    <p>Assigned to: { props.card.assigned_to}</p>
    <input type="button" onClick={
      function(){
        props.next(props.card.id);
      }
    } value= { props.card.button }/>
  </li>
);



const CardList = ({ cards, next }) =>(
  <ul>
    {  cards.map(card => <Card card={card} next={next} /> ) }
  </ul>
  );









class LoginForm extends React.Component {
  constructor(props){

    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
  }

  clearForm(state){

    this.setState ({
      username: "",
      password: ""
    });
  }

  handleSignUpSubmit(event){
    event.preventDefault()
    let userObj = Object.assign({}, this.state)
    this.signUp(userObj);
    this.clearForm(this.state)
  }

  handlePasswordChange(event){
    event.preventDefault()
    this.setState({ password: event.target.value});
  }

  handleUserNameChange(event){
    event.preventDefault()
    this.setState({ username: event.target.value});
  }

  signUp(user){
    console.log(user)
  }



    render(){
      return(
        <form onSubmit={this.handleSignUpSubmit}>
          <div>
            <input type="text" placeholder="Username" onChange={this.handleUserNameChange} value={this.state.username} />
          </div>

          <div>
            <input type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
    )}
}












class NewCardForm extends React.Component {
  constructor(props){

    super(props);

    this.state = {
      title: "",
      priority: "",
      created_by: "",
      assigned_to: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleTitleChange = this.handleTitleChange.bind(this);

    this.handlePriorityChange = this.handlePriorityChange.bind(this);

    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);

    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
  }

    clearForm(card){
      this.setState({
        title: "",
        priority: "",
        created_by: "",
        assigned_to: ""
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      let cardObj = Object.assign({}, this.state)
      this.props.addCard(cardObj);
      this.clearForm(this.state);
    }

    handleTitleChange(event){
      event.preventDefault();
      this.setState({ title: event.target.value });
    }
    handleStatusChange(event){
      event.preventDefault();
      this.setState({ status: event.target.value});
    }
    handlePriorityChange(event){
      event.preventDefault();
      this.setState({ priority: event.target.value });
    }
    handleCreatedByChange(event) {
      event.preventDefault();
      this.setState({ created_by: event.target.value });
    }

    handleAssignedToChange(event){
      event.preventDefault();
      this.setState({ assigned_to: event.target.value});
    }
    render(){
      return(
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text" placeholder="Title" onChange={this.handleTitleChange} value={this.state.title} />
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

    this.nextStage = this.nextStage.bind(this);

  }

  componentDidMount() {
    this.getFakeCards()
      .then(cards =>{
        this.setState({ cards });
      });
    }

  addCard(card){
    fetch('/api/cards', {
      method: 'POST',
      headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify(card)
      })
      .catch(err => {
        throw err;
      })
      .then(data =>{
        this.setState({
          cards : this.state.cards.concat(card)
        });
      })

    this.componentDidMount();

  }

  nextStage(id){
   let cardindex = this.changeStatus(id)
   let newArray = [];
   let cardArrayIndex;
   let cardArray = this.state.cards
    for(var i=0; i<cardArray.length; i++){
      if(cardArray[i].id === id){

        if(cardArray[i].button==="clear"){
         this.deleteCard(cardArray[i])
         cardArray[i].status = 'Ova'
        }

        if(cardArray[i].status === "Complete"){
          alert("already Completed")
          cardArray[i].button = "clear"
          newArray.push(cardArray[i])
        }
        if(cardArray[i].status === "In Progress"){
          cardArray[i].status = "Complete"
          newArray.push(cardArray[i])
        }
        if(cardArray[i].status === "Queue"){
          cardArray[i].status = "In Progress"
          newArray.push(cardArray[i])
        }
      }
      else {
        newArray.push(cardArray[i])
      }
    }
    this.setState({
      cards : newArray
    })

  }

  deleteCard(card){
    fetch('/api/cards', {
      method: "DELETE",
      headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify(card)
    })
    .then(console.log('success'))
    .catch(err =>{
      throw err;
    })
  }

  getFakeCards(){
    return  getCards();
  }

  changeStatus(id){
    let current;
    for(var i = 0; i<this.state.cards.length; i++){
      if(this.state.cards[i].id === id){
        current = this.state.cards[i];
        console.log(current)
      }
    }
    fetch('/api/cards', {
      method: 'PUT',
      headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify(current)
      })
      .catch(err => {
        throw err;
      })
  }



  render(){

     let allCards = this.state.cards;
     let queuedCards =[];
     let inProgressCards =[];
     let completedCards = [];

     for(var i = 0; i<allCards.length; i++){
      if (allCards[i].status === "Queue"){
        queuedCards.push(allCards[i]);
      }
      if (allCards[i].status === "In Progress"){
        inProgressCards.push(allCards[i]);
      }
      if (allCards[i].status === "Complete"){
        completedCards.push(allCards[i]);
      }
     }

    return(
      <div id="board">

      <div id='newForm'>
          <NewCardForm addCard={this.addCard}/>
          </div>

      <div id='LoginForm'>
          <LoginForm />
          </div>


        <div id="queuedBoard">
          <h1>Queued Tasks</h1>
          <CardList cards={queuedCards} next={this.nextStage}></CardList>
        </div>
        <div id="inProgressBoard">
          <h1>Inprogress Tasks</h1>
          <CardList cards={inProgressCards} next={this.nextStage}></CardList>
        </div>
        <div id="DoneBoard">
          <h1>Completed Tasks</h1>
          <CardList cards={completedCards} next={this.nextStage}></CardList>
        </div>
      </div>
    );
  }
};

ReactDOM.render(

  <App />,

  queueContainer

);









