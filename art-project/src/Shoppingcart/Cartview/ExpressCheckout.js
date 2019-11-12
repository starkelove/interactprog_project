import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showButton: false
        };
        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const  {
            isScriptLoaded,
            isScriptLoadSucceed
        } = this.props;

        console.log("in did mount ", isScriptLoaded);

        if(isScriptLoaded && isScriptLoadSucceed) {
            this.setState({
                showButton : true
            });

        }
    }

    // it is not certain that the script has loaded at
    // componentDidMount, therefore this method will check
    // for the loaded script
    componentWillReceiveProps(nextProps) {
        const {
            isScriptLoaded,
            isScriptLoadSucceed
        } = nextProps;

        const loadedNow = 
            !this.state.showButton &&
            !this.props.isScriptLoaded &&
            isScriptLoaded;
        
        if(loadedNow) {
            if(isScriptLoadSucceed) {
                this.setState({
                    showButton: true
                });
            }
        }

        console.log("in receive props ", isScriptLoaded);
    }

    render() {
        const {
            total, // total amount 
            currency, // desired currency
            env, // env mode, development or production, to choose a Client ID from the client obj
            commit, // if true, paypal will display 'Pay Now' button
            client, // object which has your client IDs for Sandbox and Production
            onSuccess, // A handler to do something in case of successful payment
            onError, // A handler to do something in case of erroneuos payment
            onCancel,// A handler to do something in case of cancelled payment
        } = this.props;

        const {
            showButton,
        } = this.state;

        const payment = () => 
            paypal.rest.payment.create(env, client, {
                transactions: [
                    {
                        amount: {
                            total,
                            currency,
                        }
                    },
                ],
        });
        
        const onAuthorize = (data, actions) => 
            actions.payment.execute()
                .then(() => {
                    const payment = {
                        paid: true,
                        cancelled: false,
                        payerID: data.payerID,
                        paymentID: data.paymentID,
                        paymentToken: data.paymentToken,
                        returnUrl: data.returnUrl,
                    };

                    onSuccess(payement);
                });

        return (
            <div>
                {showButton && <paypal.Button.React
                env = {env}
                client = {commit}
                payment = {payment}
                onAuthorize = {onAuthorize}
                onCancel = {onCancel}
                onError = {onError}
                />}
            </div>
        )


    }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);