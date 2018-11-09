
// outsource dependencies
import React from 'react';
import {
    ImageBackground,
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import {
    responsive,
    ResponsiveStyleSheet,
} from "react-native-responsive-ui";

// local dependencies
import LoginForm from '../../components/login.form/LoginForm'
import Preloader from '../../components/Preloader'
import {LOG_OUT} from "../../actions/types";
import {colors} from '../../constants/Colors'

@responsive
class LogInScreen extends React.Component {
    componentWillMount(){
        this.props.initialProps();
    }
    render() {
        // styles for different display orientations
        const {style} = this;
        return (
            <ImageBackground
                resizeMode="cover"
                style={style.container}
                source={require('../../assets/gifs/home-bg.gif')}
                    >
                <View>
                    <View style={style.titleWrapper}>
                        <Text style={style.greetingText}>
                            Hello {this.props.name}!
                        </Text>
                        {/* Showing error message if pasted data are wrong */}
                        {
                            this.props.failedAuth &&
                            <Text style={style.errorMessageText}>{this.props.errorMessage}</Text>
                        }
                    </View>
                    <View style={style.formWrapper}>
                        <LoginForm />
                    </View>
                </View>
                <Preloader show={this.props.expectAnswer} size={'small'} location={'bottom'} />
            </ImageBackground>
        );
    }
    get style() {
        return ResponsiveStyleSheet.select([{
            query: { orientation: "portrait" },
            style: {
                container: {
                    flex:1,
                    justifyContent: 'center'
                },
                errorMessageText: {
                    color: colors.errorMessageColor,
                },
                greetingText: {
                    color: colors.textMainColor,
                },
                // set margin to align greeting text with content
                titleWrapper: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: '3%',
                    marginRight: '3%',
                    padding: '4%',
                    backgroundColor: colors.formBackground,
                },
                formWrapper:{}
            }
        }, {
            query: { orientation: "landscape" },
            style: {
                container: {
                    flex:1,
                    justifyContent: 'center'
                },
                errorMessageText: {
                    color: colors.errorMessageColor,
                },
                greetingText: {
                    color: colors.textMainColor,
                },
                // set margin to align greeting text with content
                titleWrapper: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '20%',
                    padding: '4%',
                    backgroundColor: colors.formBackground,
                },
                formWrapper:{
                    marginHorizontal: '18%',
                }
            }
        }]);
    }
}

const mapDispatchToProps = dispatch => ({
    initialProps: () => {
        dispatch({type: LOG_OUT});
    },
});

export default connect(state => ({ ...state.login }), mapDispatchToProps)(LogInScreen);
