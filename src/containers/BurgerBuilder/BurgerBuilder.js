import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 17,
    meat: 54,
    bacon: 24,
    cheese: 19
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        axios.get('/ingredients.json').then(response => {
            this.setState({ingredients: response.data});
        }).catch(error => {
            this.setState({error: true})
        });
    };

    setPurchasable(ingredients){
        const sum = Object.keys(ingredients)
            .map((igKey) => {
               return ingredients[igKey]
            }).reduce((sum, elem) => {
                return sum + elem;
            } , 0);
        console.log(sum);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const updatedPrice = oldTotalPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.setPurchasable(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const additionalPrice = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - additionalPrice;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.setPurchasable(updatedIngredients)
    };

    showModalHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const post = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            user: {
                firstname: 'Michal',
                address: {
                    city: 'somewhere',
                    country: 'Czech republic'
                }
            }
        };

        axios.post('/orders.json', post)
            .then(response => {
                this.setState({loading: false, purchasing: false});
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
            });
    };

    render(){
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Some error occurred</p> : <Spinner/>;
        if (this.state.ingredients) {
            burger = <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    totalPrice={this.state.totalPrice}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    purchasing={this.showModalHandler}/>
            </>;
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}/>;
        }
        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);