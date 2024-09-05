import {Component, Fragment} from "react";
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class WhoAmI extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            years: 0,
            position: ''
        }
    }

    nextYear = () => {
        if(this.state.years < 50 ) {
            this.setState(state => ({
                years: state.years + 1
            }));
        }
    }

    lastYear = () => {
        if(this.state.years > -50 ) {
            this.setState(state => ({
                years: state.years - 1
            }));
        }
    }

    randomYear = () => {
        this.setState(state => ({
            years: Math.floor(Math.random() * (50 - -50 + 1)) + -50
        }));
    }

    resetYear = () => {
        this.setState(state => ({
            years: 0
        }));
    }

    CommitInputChanges = (e) => {
        this.setState({
            position: e.target.value
        });
    }

    render() {
        const {name,surname,link} = this.props;
        return(
            <Fragment>
                <h1>My name is {name},
                    surname - {surname},
                    age - {this.state.years},
                    position - {this.state.position}
                </h1>
                <button onClick={this.nextYear}>+</button>
                <button onClick={this.lastYear}>-</button>
                <button onClick={this.randomYear}>rand</button>
                <button onClick={this.resetYear}>reset</button>
                <a href={link}>Ссылка</a>
                <form>
                    <span>Введите должность:</span>
                    <input type="text" onChange={this.CommitInputChanges}/>
                </form>
            </Fragment>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:[
                {name: "John", salary: 800, increase: true, rise: true, id: 0},
                {name: "Alex", salary: 1000, increase: false, rise: false, id: 1},
                {name: "Norm", salary: 900, increase: false, rise: false, id: 2}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {data: data.filter(item => item.id !== id)};
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArray = [...data, newItem];
            return {data: newArray};
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        });
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter){
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                {/*<WhoAmI name='Igor' surname='Rozhkov' link="vk.com"/>*/}
                {/*<WhoAmI name='Ivan' surname='Nesterov' link="youtube.com"/>*/}
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    />
                <EmployeesAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }
}

export default App;
