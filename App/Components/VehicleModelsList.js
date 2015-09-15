'use strict';

var React = require('react-native');
var PlainListView = require('./Helpers/PlainListView');
var VehicleStylesList = require('./VehicleStylesList');

function urlForQuery(year, make, model) {
    var data = {
        year: year,
        state: 'used',
        view: 'basic',
        fmt: 'json',
        api_key: '5muyk3bkhdtjgurbd8r493sk', // jshint ignore:line
    };

    var querystring = Object.keys(data)
        .map(key => `${key}=${encodeURIComponent(data[key])}`)
        .join('&');

        return `https://api.edmunds.com/api/vehicle/v2/${make}/${model}?` +
            querystring;
}

class VehicleModelsList extends React.Component {
    constructor(props) {
        super(props);

        this._rowPressed = this._rowPressed.bind(this);
        this._executeQuery = this._executeQuery.bind(this);
        this._handleResponse = this._handleResponse.bind(this);
    }

    _rowPressed(props, rowData) {
        var query = urlForQuery(this.props.year,
                                this.props.make,
                                rowData.niceName);

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
        console.log(response);
        this.props.navigator.push({
            title: `${response.name} Styles`,
            component: VehicleStylesList,
            passProps: {
                data: response.years[0].styles,
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

VehicleModelsList.propTypes = {
    year: React.PropTypes.string.isRequired,
    make: React.PropTypes.string.isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired
};

module.exports = VehicleModelsList;
