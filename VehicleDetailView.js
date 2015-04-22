'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text
} = React;

var VehicleDetailView = React.createClass({
    render: function() {
        var vehicle = this.props.vehicle;
        console.log(vehicle);

        return (
            /* jshint ignore:start */
            <View>
            </View>
            /* jshint ignore:end */
        );
    }
});

var styles = StyleSheet.create({
});

module.exports = VehicleDetailView;
