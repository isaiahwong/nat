import React, { Component, createRef } from 'react';
import './App.css';

import Button from './components/Button/Button';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            deposit: null,
            loading: false,
        };

        this.initialTF = createRef();
        this.monthlyTF = createRef();
        this.getInvestment = this.getInvestment.bind(this);
    }

    async getInvestment() {
        const initialInvest = this.initialTF.current.value;
        const monthlyInvest = this.monthlyTF.current.value;

        this.setState({ loading: true });
        const res = await fetch('https://www.mocky.io/v2/5e69de892d00007a005f9e29?mocky-delay=100ms', {
            method: 'POST',
            body: {
                "initialInvestment": initialInvest,
                "monthlyInvestment": monthlyInvest
            }
        });

        const json = await res.json();

        this.setState({
            loading: false,
            deposit: json[0].totalDeposit
        });
    }

    Loading() {
        if (!this.state.loading) return null;

        return (
            <div>Loading</div>
        );;
    }

    Results() {
        if (!this.state.deposit) return null;

        return (
            <div>Your deposit is: {this.state.deposit}</div>
        )
    }

    render() {
        return (
            <div className='container'>
                {this.Loading()}
                {this.Results()}
                <input ref={this.initialTF} type="number" className="initial" placeholder='initial Investment' />
                <input ref={this.monthlyTF} type="number" placeholder='Monthly Investment' />
                <Button
                    onClick={this.getInvestment}
                />
            </div>
        );
    }

}



export default App;
