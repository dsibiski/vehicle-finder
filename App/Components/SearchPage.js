'use strict';

var React = require('react-native');
var VehicleMakesList = require('./VehicleMakesList');
var MainLogoView = require('./MainLogoView');
var FooterLogoView = require('./FooterLogoView');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Image,
    PickerIOS,
    ActivityIndicatorIOS,
    WebView,
} = React;

var PickerItemIOS = PickerIOS.Item;

function generateYears() {
    var arr = [];
    var currentYear = new Date().getFullYear();

    for (var i = currentYear; i >= 1990; i--) {
        arr.push(i.toString());
    }

    return arr;
}

function makeUrlForQuery(key, value) {
    var data = {
        state: 'used',
        view: 'basic',
        fmt: 'json',
        api_key: '5muyk3bkhdtjgurbd8r493sk', // jshint ignore:line
    };
    data[key] = value;

    var querystring = Object.keys(data)
        .map(key => `${key}=${encodeURIComponent(data[key])}`)
        .join('&');

    return `https://api.edmunds.com/api/vehicle/v2/makes?${querystring}`;
}

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleYear: '2015',
            isLoading: false,
            message: ''
        };
        this._onYearTextChanged = this._onYearTextChanged.bind(this);
        this._onViewMakesPressed = this._onViewMakesPressed.bind(this);
        this._handleLogoPress = this._handleLogoPress.bind(this);
    }

    _onYearTextChanged(vehicleYear) {
        this.setState({ vehicleYear });
    }

    _onViewMakesPressed() {
        var query = makeUrlForQuery('year', this.state.vehicleYear);
        this._executeQuery(query);
    }

    _executeQuery(query) {
        // console.log(query);
        this.setState({ isLoading: true, message: '' });
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
        this.setState({ isLoading: false });

        this.props.navigator.push({
            title: `${this.state.vehicleYear} Makes`,
            component: VehicleMakesList,
            passProps: {
                year: this.state.vehicleYear,
                data: response.makes,
                footerPressed: this._handleLogoPress
            }
        });
    }

    _handleLogoPress() {
        this.props.navigator.push({
            title: 'Edmunds.com',
            component: WebView,
            passProps: {
                url: 'http://www.edmunds.com/?id=apis',
                startInLoadingState: true
            }
        });
    }

    render() {
        return (
            /* jshint ignore:start */
            <View style={styles.container}>
                <MainLogoView onPress={this._handleLogoPress}/>
                <Text style={styles.header}>
                    Edmunds API Vehicle Explorer
                </Text>
                <Text style={styles.description}>Please choose a year:</Text>
                <PickerIOS style={styles.picker}
                    selectedValue={this.state.vehicleYear}
                    onValueChange={this._onYearTextChanged}>
                    {generateYears().map(
                        year => <PickerItemIOS
                            key={year}
                            value={year}
                            label={year}
                        />
                    )}
                </PickerIOS>
                <TouchableHighlight style={styles.button}
                    onPress={this._onViewMakesPressed}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Start Search</Text>
                </TouchableHighlight>
                <View style={styles.infoArea}>
                    <ActivityIndicatorIOS
                        animating={this.state.isLoading}
                        size='large'
                    />
                    <Text style={styles.description}>{this.state.message}</Text>
                </View>
                <FooterLogoView
                    position='absolute'
                    onPress={this._handleLogoPress}/>
            </View>
            /* jshint ignore:end */
        );
    }
}

var styles = StyleSheet.create({
    header: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
        fontWeight: 'bold'
    },
    description: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    image: {
        width: 93,
        height: 103,
        marginBottom: 25
    },
    infoArea: {
        marginTop: 5,
        alignItems: 'center'
    },
    picker: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 4,
        alignSelf: 'stretch'
    }
});

module.exports = SearchPage;
