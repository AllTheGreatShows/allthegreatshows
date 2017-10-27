import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Media, Jumbotron, Button} from 'reactstrap';

// VALID MEDIA TYPES
// podcast
// provider
// episode
// genre

// PODCASTS, runs when media_type == "podcast"
function renderPodcast(obj, i) {
    var val = obj["objects"][i];
    console.log(val);
    return (
        <Card>
            <Media left href="#">
            <Media object data-src="holder.js/64x64" img src={val.image_url.toString()} alt="Generic placeholder image" />
            </Media>
            <Media body>
            <Media heading>
                {val.title.toString()}
            </Media>
                genres: {val.genres.toString()} <br/>
                id: {val.id.toString()} <br/>
                feed_url: {val.feed_url.toString()} <br/>
                itunes_id: {val.itunes_id.toString()} <br/>
            </Media>
        </Card>  
        );
}

// PROVIDERS, runs when media_type == "provider"
function renderProvider(obj, i) {
    var val = obj["objects"][i];
    console.log(val);
    return (
        <Card>
            <Media left href="#">
            </Media>
            <Media body>
            <Media heading>
                {val.name.toString()}
            </Media>
                {/* description: {val.description.toString()} <br/> */}
                id: {val.id.toString()} <br/>
                itunes id: {val.id.toString()} <br/>
                {/* podcasts: {val.podcasts.toString()} <br/> */}

            </Media>
        </Card>  
        );
}

// GENRE, runs when media_type == "genre"
function renderGenre(obj, i) {
    var val = obj["objects"][i];
    console.log(val);
    return (
        <Card>
            <Media left href="#">
            {/* <Media object data-src="holder.js/64x64" img src={val.image_url.toString()} alt="Generic placeholder image" /> */}
            <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />

            </Media>
            <Media body>
            <Media heading>
                {val.name.toString()}
            </Media>
                podcasts: {val.podcasts.toString()} <br/>
                itunes id: {val.itunes_id.toString()} <br/>
                id: {val.id.toString()} <br/>
            </Media>
        </Card>  
        );
}

// EPISODES, runs when media_type == "episode"
function renderEpisode(obj, i) {
    var val = obj["objects"][i];
    console.log(val);
    return (
        <Card>
            <Media left href="#">
            <Media object src={ val.podcast.image_url.toString() } alt="Podcast artwork" />

            </Media>
            <Media body>
            <Media heading>
                { val.podcast.title.toString() }<br/>
                { val.title.toString() }
            </Media>
                ATGSID: { val.id.toString() } <br/>
                Date Published: { val.published.toString() }<br/>
                <a href={ val.podcast.feed_url.toString() }>RSS Feed</a><br/>
                <audio controls><source src={ val.file_url.toString() } type="audio/mpeg" /> Your browser does not support the audio element.</audio>
            </Media>
        </Card>  
        );
}

class MyMedia extends Component {

    render() {
        // const obj = JSON.parse(sampleData);
        const obj = this.props.json;
        const i = this.props.index;
        switch (this.props.media_type) {
            case "podcast":
                return renderPodcast(obj, i);
            case "provider":
                return renderProvider(obj, i);
            case "genre":
                return renderGenre(obj, i);
            case "episode":
                return renderEpisode(obj, i);
        }
    }
}

export default MyMedia;