'use strict';

var React = require('react-native');
var SearchPage = require('./App/Components/SearchPage');

var styles = React.StyleSheet.create({
    container: {
        flex: 1
    }
});

class VehicleFinderApp extends React.Component {
    render() {
        return (
            /* jshint ignore:start */
            <React.NavigatorIOS
                style={styles.container}
                tintColor='#48BBEC'
                initialRoute={{
                    title: 'Edmunds API Vehicle Finder',
                    component: SearchPage
                }}
            />
            /* jshint ignore:end */
        );
    }
}

React.AppRegistry.registerComponent('VehicleFinder', function() {
    return VehicleFinderApp;
});
