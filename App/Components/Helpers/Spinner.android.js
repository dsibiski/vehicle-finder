'use strict';

var React = require('react-native');

var {
    ProgressBarAndroid,
    View,
} = React;

class Spinner extends React.Component {
    render() {
        if (this.props.isLoading) {
            return (
                <View  style={{alignItems: 'center'}}>
                    <ProgressBarAndroid styleAttr="Large"/>
                </View>
            );
        } else {
            return ( <View /> );
        }
    }
}

module.exports = Spinner;
