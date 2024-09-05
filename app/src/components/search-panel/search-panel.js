import {Component} from "react";
import './search-panel.css';

class SearchPanel extends Component {

    constructor(prop) {
        super(prop);

        this.state ={
            term: ''
        }
    }

    onChangeTerm = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }



    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="Найти сотрудника"
                   value={this.state.term}
                   onChange={this.onChangeTerm}/>
        )
    }
}

export default SearchPanel;