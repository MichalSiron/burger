import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            axios.interceptors.request.use(req => {
               this.setState({error: null});
               return req;
            });

            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        modalCloseHandler = () => {
            this.setState({error: null})
        };

        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.modalCloseHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props}/>
                </>
            )
        }

    }
};

export default withErrorHandler;