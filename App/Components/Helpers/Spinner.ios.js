'use strict';

var React = require('react-native');

var {
    ActivityIndicatorIOS,
    View,
} = React;

class Spinner extends React.Component {
    render() {
        return (
            <ActivityIndicatorIOS
                animating={this.props.isLoading}
                size='large' />
        );
    }
}

module.exports = Spinner;
