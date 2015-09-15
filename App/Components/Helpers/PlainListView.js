'use strict';

var React = require('react-native');
var FooterLogoView = require('../FooterLogoView');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Component,
    ListView,
    WebView
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
        this._renderFooter = this._renderFooter.bind(this);
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

    _renderFooter() {
        return (
            /* jshint ignore:start */
            <FooterLogoView onPress={() => this.props.footerPressed()}/>
            /* jshint ignore:end */
        );
    }

    render() {
        return (
            /* jshint ignore:start */
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                renderFooter={this._renderFooter}
                initialListSize={20}
            />
            /* jshint ignore:end */
        );
    }
}

PlainListView.propTypes = {
    data: React.PropTypes.array.isRequired,
    displayData: React.PropTypes.array.isRequired,
    rowPressed: React.PropTypes.func.isRequired,
    footerPressed: React.PropTypes.func.isRequired
};

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
