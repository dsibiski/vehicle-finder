//ES5 example

'use strict';

var React = require('react-native');
var {
    WebView
} = React;

var VehicleModelsList = require('./VehicleModelsList');
var PlainListView = require('./PlainListView');

var VehicleMakesList = React.createClass({
    propTypes: {
        year: React.PropTypes.string.isRequired,
        data: React.PropTypes.array.isRequired
    },

    _rowPressed: function(props, rowData) {
        this.props.navigator.push({
            title: `${rowData.name} Models`,
            component: VehicleModelsList,
            passProps: {
                year: this.props.year,
                make: rowData.niceName,
                data: rowData.models,
                footerPressed: this.props.footerPressed
            }
        });
    },

    render: function() {
        return (
            /* jshint ignore:start */
            <PlainListView
                data={this.props.data}
                displayData={this.props.data.map((item) => item.name)}
                rowPressed={this._rowPressed}
                footerPressed={this.props.footerPressed}
            />
            /* jshint ignore:end */
        );
    }
});

module.exports = VehicleMakesList;
