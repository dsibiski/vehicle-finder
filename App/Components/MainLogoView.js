'use strict';

var React = require('react-native');

var {
    Image,
    TouchableOpacity,
    StyleSheet
} = React;

class MainLogoView extends React.Component {
    render() {
        return(
            /* jshint ignore:start */
            <TouchableOpacity onPress={this.props.onPress}>
                <Image source={require('image!logo')} style={styles.image}/>
            </TouchableOpacity>
            /* jshint ignore:end */
        );
    }
}

MainLogoView.propTypes = {
    onPress: React.PropTypes.func.isRequired
};

var styles = StyleSheet.create({
    image: {
        width: 93,
        height: 103,
        marginBottom: 25
    }
});

module.exports = MainLogoView;
