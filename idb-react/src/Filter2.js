import React from 'react';
import {Link} from 'react-router-dom';
import { FormGroup, Label, Input, Button, Collapse, Card, CardBody } from 'reactstrap';
import {getPodcastSearch, getProviderSearch, getGenreSearch, getEpisodeSearch} from "./Request";

/*<Form>
  <FormGroup>
    <Label for="exampleEmail">Email</Label>
    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
  </FormGroup>
</Form>
*/

class SearchBar extends React.Component {
  constructor (props) {
    super (props);
        this.state = {value: ''};


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    // alert('no');
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //onSubmit={this.handleSubmit}
    // alert('A search was submitted: ' + this.state.value);
    event.preventDefault();
    this.props.onSearch(this.state.value);

  }

  render() { 
    var rows = []
      rows.push(
        <label>
          Search:
        </label>
      );

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} placeholder="Search" onChange={this.handleChange} />
        <input type="submit" value="Go" />
      </form>
    );
  }


}


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return(<div>
      <h3> Yes, I searched for {this.props.searchTerm} </h3>
      <p>{getEpisodeSearch(this.props.searchTerm, 2)}</p>
      </div>);
  }

}




export default SearchBar;
export {SearchResults};