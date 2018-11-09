
// outsource dependencies
import React from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    View,
} from "react-native";

// local dependencies
import {size} from '../constants/PreloaderConfigurations'

export default class Preloader extends React.Component {
    constructor (props) {
        super(props);
        this.spinValue = new Animated.Value(0);
    }
    componentDidMount () {
        this.spin()
    }
    spin () {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear
            }
        ).start(() => this.spin());
    }
    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        if (this.props.size === 'small' && this.props.location === 'bottom'){
            // hide if "show" value is true
            return (
                this.props.show &&
                <View style={styles.preloaderBottom}>
                    <Animated.Image
                        style={{
                            height: size.sm,
                            width: size.sm,
                            transform: [{rotate: spin}] }}
                        source={require('../assets/images/preloaders/uroboros.png')}
                    />
                </View>
            );
        } else if (this.props.size === 'medium' && this.props.location === 'center'){
            // hide if "hide" value is true
            return (
                this.props.show &&
                <View style={styles.preloaderCenter}>
                    <Animated.Image
                        style={{
                            height: size.md,
                            width: size.md,
                            transform: [{rotate: spin}] }}
                        source={require('../assets/images/preloaders/uroboros.png')}
                    />
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    preloaderBottom: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
    },
    preloaderCenter: {
        flex: 1,
        alignSelf:'center',
        justifyContent: 'center'
    },
});
