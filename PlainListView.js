'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Component,
    ListView
} = React;

class PlainListView extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});
            this.state = {
                dataSource: dataSource.cloneWithRows(this.props.displayData)
            };

        this._renderRow = this._renderRow.bind(this);
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            /* jshint ignore:start */
            <TouchableHighlight
                onPress={() => this.props.rowPressed(
                    this.props,
                    this.props.data[rowID])
                }
                underlayColor='#f3f3f3'>
                <View style={styles.container}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.name}>{rowData}</Text>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
            /* jshint ignore:end */
        );
    }

    render() {
        return (
            /* jshint ignore:start */
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}/>
            /* jshint ignore:end */
        );
    }
}

var styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#dddde0'
    },
    name: {
        fontSize: 19,
        color: '#000'
    },
    container: {
        marginLeft: 15
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 0
    }
});

module.exports = PlainListView;
