const assignedContainer = document.getElementById('assigned');

const getTasks = () => new Promise((resolve, reject) =>{
  const tasksFromGetTasks = [
      {
        name: "test task"
      }
    ];
    setTimeout(() => resolve(
      tasksFromGetTasks),250);
});

const Task = (props) => (
  <li>
    <h3>{ props.task.name }</h3>
  </li>
);


class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      tasks: [],
    };
    //this.addTask = this.addTask.bind(this);

  }

  componentWillMount() {
    this.getFaketasks()
      .then(tasks =>{
        this.setState({ tasks });
      });
    }
    getFaketasks(){
      let value =  getTasks();
      return value;
    }

  render(){
    return(
      <div>
        <h1>Hello Tasks</h1>
        <div tasks={this.state.tasks}></div>
      </div>
    );
  }
};

ReactDOM.render(

  <App />,

  assignedContainer

);









