import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
// const App = () => {
//     window.navigator.geolocation.getCurrentPosition((position)=>{
//         console.log("position is ",position);
//     },(err)=>{
//         console.log(err);
//     });
//     return (<div>Hello World</div>);
// };

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { lat: null, errorMessage: '' }
    // }
    state = { lat: null, errorMessage: '' }
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition((position) => {
            console.log("position is ", position);
            this.setState({ lat: position.coords.latitude })
        }, (err) => {
            this.setState({ errorMessage: err.message })
        });
    }

    renderContent() {
        if (this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />;
        }
        if (this.state.errorMessage) {
            return <div>ERROR: {this.state.errorMessage}</div>;
        }
        return <div><Spinner message="Please accept location request" /></div>;
    }
    render() {
        return (<div>{this.renderContent()}</div>)
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));