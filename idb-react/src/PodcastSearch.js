import React from 'react';
import Grid from './Grid';
import {Button} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {getPodcastSearch} from './Request';


class PodcastSearchGrid extends React.Component{

    constructor(props){
        super(props)
        this.page = Array(1)
        this.page[0] = this.props.match.params.pagenum;
        this.state = {userInput : null};
        this.getChildData = this.getChildData.bind(this);
    }


    getChildData = (childData) => {
        // console.log("In parent and child data is " + childData);
        console.log("state originally set to " + this.state.userInput);
        console.log(childData);

        this.setState({userInput:childData});
        this.forceUpdate();
        console.log("STATE NOW SET TO: " + this.state.userInput);
    }

    render () {
        var prevURL;
        var nextURL;
        var sort = this.props.match.params.sorttype;
        var term = this.props.match.params.searchterm;
        var backButtonCheck = false;
        var forwardButtonCheck = false;

        console.log("TERM: " + term + " page: " + this.page[0]);
        var data = getPodcastSearch(term, this.page[0]);
        var totalPages = data["total_pages"];
        if (parseInt(totalPages) == 0) {
            return (
                <div>
                    <Button outline color="danger" size="lg"> No Results Found </Button>
                </div>
            );
        }
        else {
            console.log("REACHHH")
            if (parseInt(this.page[0]) == 1)
                backButtonCheck=true;
            else{
                backButtonCheck = false;
                prevURL = "/search/" + term + "/podcast/page=" + (parseInt(this.page[0]) - 1);
            }
            if(parseInt(this.page[0]) == parseInt(totalPages))
                forwardButtonCheck = true;
            else{
                console.log("REACHINGGG")
                nextURL = "/search/"+term+"/podcast/page=" + (parseInt(this.page[0]) + 1);
                forwardButtonCheck = false;
            }
        }

        if(totalPages == 1){
            return (
                <div>
                    <Grid ref="child" Data={data} CardTitle={"title"} ImageField={"image_url"} MediaType = "podcast" page={this.page[0]} />
                </div>
            )
        }

        else if(backButtonCheck){
            return (
                <div>
                {console.log("Prev Url: " + prevURL)}
                {console.log("Next URL: " + nextURL)}

                <Grid ref="child" Data={data} CardTitle={"title"} ImageField={"image_url"} MediaType = "podcast" page={this.page[0]} />
                <Link to={nextURL}>
                    <Button outline color="warning" size="lg" onClick= {() => 
                        {
                            this.page[0] = parseInt(this.page[0]) + 1;
                            data = getPodcastSearch(term, this.page[0]);
                            this.refs.child.changeState(data, this.page[0]);   
                         this.forceUpdate();} 
                      }> Next </Button>
                </Link>
    
                </div>
            );
    
        }
        
        else if (forwardButtonCheck){
            return (
                <div>
                <Grid ref="child" Data={data} CardTitle={"title"} ImageField={"image_url"} MediaType = "podcast" page={this.page[0]} />
                    
                <Link to={prevURL}>
                    <Button outline color="warning" size="lg" onClick= {() => 
                        {this.page[0] = (parseInt(this.page[0]) == 1)? 1: parseInt(this.page[0])- 1;
                            
                             data = getPodcastSearch(term, this.page[0]);
                            this.refs.child.changeState(data, this.page[0]);   
                            this.forceUpdate();} 
                        }> Previous </Button>
                </Link>
                </div>
            );
    
        }
        else{ 
        return (
            <div>
            <Grid ref="child" Data={data} CardTitle={"title"} ImageField={"image_url"} MediaType = "podcast" page={this.page[0]} />
            {console.log("Prev Url: " + prevURL)}
            <Link to={prevURL}>
                <Button outline color="warning" size="lg" onClick= {() => 
                    {this.page[0] = (parseInt(this.page[0]) == 1)? 1: parseInt(this.page[0])- 1;    
                    data = getPodcastSearch(term, this.page[0]);
                    this.refs.child.changeState(data, this.page[0]);  
                 this.forceUpdate();} 
                  }> Previous </Button>
            </Link>
            {'  '}
            {console.log("Next URL: " + nextURL)}
            <Link to={nextURL}>
                <Button outline color="warning" size="lg" onClick= {() => 
                    {this.page[0] = parseInt(this.page[0]) + 1;
                    data = getPodcastSearch(term, this.page[0]);
                    this.refs.child.changeState(data, this.page[0]);   
                     this.forceUpdate();} 
                  }> Next </Button>
            </Link>

            </div>
        );
    }
    }
}

export default PodcastSearchGrid;