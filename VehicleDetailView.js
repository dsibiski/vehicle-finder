'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text
} = React;

VehicleDetailView.propTypes = {
    vehicle: React.PropTypes.object.isRequired
};

class VehicleDetailView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var vehicle = this.props.vehicle;
        console.log(vehicle);

        return (
            /* jshint ignore:start */
            <View>
            </View>
            /* jshint ignore:end */
        );
    }
}

var styles = StyleSheet.create({
});

module.exports = VehicleDetailView;
