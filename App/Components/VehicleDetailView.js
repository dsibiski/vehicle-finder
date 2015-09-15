'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text
} = React;

class VehicleDetailView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var vehicle = this.props.vehicle;
        console.log(vehicle);

        return (
            /* jshint ignore:start */
            <Text>
                {this.props.vehicle}
            </Text>
            /* jshint ignore:end */
        );
    }
}

VehicleDetailView.propTypes = {
    vehicle: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
});

module.exports = VehicleDetailView;
