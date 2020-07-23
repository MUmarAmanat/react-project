//run as it is in https://jscomplete.com/playground  no need to setup react env
class Form extends React.Component{
  state = { userName: '' };
  handleSubmit = async (event) => {
  	event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data)
    this.setState({ userName: '' });
    
  };
  
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder='Github username'
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          required
          />
        <button>Add</button>
      </form>
    );
  }
} // form class end here

class CardList extends React.Component{
  render(){
    const prof = this.props;
    return(
      <div>
        {this.props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
      </div>
    );
  }//render end here
} //CaardList end here

class Card extends React.Component {
  render(){
    const profile = this.props;
    return(
      <div className='github-profile'>
        <img src={profile.avatar_url} alt=""/>
        <div className='info'>
          <div className='name'>{profile.name}</div>
          <div className='company'>{profile.company}</div>
        </div>
      </div>
    ); // render end here
  }
}// Card class end here

const addElement = async () => {
  
}

class App extends React.Component {
  state = {
    profiles: [],
  };
     
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };

  render(){
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }//render end here
}// App class end here

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
