//ES6 example

'use strict';

var React = require('react-native');
var PlainListView = require('./PlainListView');
var VehicleDetailView = require('./VehicleDetailView');

function urlForQuery(styleID) {
    var data = {
        view: 'full',
        fmt: 'json',
        api_key: '5muyk3bkhdtjgurbd8r493sk', // jshint ignore:line
    };

    var querystring = Object.keys(data)
        .map(key => `${key}=${encodeURIComponent(data[key])}`)
        .join('&');

        return `https://api.edmunds.com/api/vehicle/v2/styles/${styleID}?` +
            querystring;
}

VehicleStylesList.propTypes = {
    data: React.PropTypes.array.isRequired
};

class VehicleStylesList extends React.Component {
    constructor(props) {
        super(props);
        this._rowPressed = this._rowPressed.bind(this);
        this._executeQuery = this._executeQuery.bind(this);
        this._handleResponse = this._handleResponse.bind(this);
    }

    _rowPressed(props, rowData) {
        var query = urlForQuery(rowData.id);
        this._executeQuery(query);
    }

    _executeQuery(query) {
        fetch(query) // jshint ignore:line
            .then((response) => response.json())
            .then(json => this._handleResponse(json))
            .catch(error =>
                   this.setState({
                       isLoading: false,
                       message: `Something bad happened ${error}`
                   }));
    }

    _handleResponse(response) {
        this.props.navigator.push({
            title: `${response.make.name} ${response.model.name}`,
            component: VehicleDetailView,
            passProps: {
                vehicle: response,
                footerPressed: this.props.footerPressed
            }
        });
    }

    render() {
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
}

module.exports = VehicleStylesList;
