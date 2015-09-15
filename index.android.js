/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var SearchPage = require('./App/Components/SearchPage');

var VehicleFinder = React.createClass({
  render: function() {
    return (
        <SearchPage />
    );
  }
});

AppRegistry.registerComponent('VehicleFinder', () => VehicleFinder);
