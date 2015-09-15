'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
    Image,
    View,
    TouchableOpacity,
    StyleSheet
} = React;

class FooterLogoView extends React.Component {
    render() {
        var containerStyle = {
            position: this.props.position,
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            bottom: 0,
            width: width
        };

        return(
            /* jshint ignore:start */
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={containerStyle}>
                    <Image
                        style={styles.footerImage}
                        source={require('image!footerLogo')}
                    />
                </View>
            </TouchableOpacity>
            /* jshint ignore:end */
        );
    }
}

FooterLogoView.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    position: React.PropTypes.string
};

FooterLogoView.defaultProps = {
    position: 'relative'
};

var styles = StyleSheet.create({
    footerImage: {
        height: 44,
        width: 220
    }
});

module.exports = FooterLogoView;
