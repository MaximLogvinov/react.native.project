
// outsource dependencies
import React from 'react';
import {
    Text,
    View,
    ImageBackground,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {connect} from "react-redux";
import Swiper from 'react-native-swiper-animated';
import {
    responsive,
    ResponsiveStyleSheet,
} from "react-native-responsive-ui";

// local dependencies
import bestiary from '../../bestiary';
import {colors} from "../../constants/Colors";
import {fonts} from "../../constants/Fonts";
import {BESTIARY} from "../../actions/types";
import Preloader from '../../components/Preloader'

@responsive
export class BestiaryScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Bestiary',
    };
    componentWillMount(){
        this.props.getBestiary(bestiary);
    }
    render() {
        const {style} = this;
        const {width, height} = this.props.window;
        const mode = height > width ? "portrait" : "landscape";
        // setting content rendering for different orientations
        if (mode === "portrait"){
            return (
                <ImageBackground
                    resizeMode="cover"
                    style={style.container}
                    source={require('../../assets/images/pages.backgrounds/tasks-bg.jpg')}
                        >
                    {/*Emulation getting server response, initially display preloader, after getting response show content */}
                    {
                        this.props.expectAnswer? <Preloader show={this.props.expectAnswer} size={'medium'} location={'center'} />:
                            <Swiper
                            loop
                            smoothTransition
                                >
                            {
                                bestiary.map((monster, i) => (
                                    <View
                                        key={i}
                                        style={style.monsterSlide}
                                            >
                                        <ImageBackground
                                            resizeMode="cover"
                                            style={style.monsterImgWrapper}
                                            source={{uri: monster.monsterImg}}
                                                >
                                            <View style={style.monsterNameHolder}>
                                                <Text style={style.monsterName}>
                                                    Name: {monster.monsterName}
                                                </Text>
                                            </View>
                                            <View style={style.monsterDescriptionHolder}>
                                                <Divider style={style.monsterContentDivider}/>
                                                <Text style={style.monsterDescription}>
                                                    Description: {monster.monsterDescription}
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                ))
                            }
                        </Swiper>
                    }
                </ImageBackground>
            )
        } else {
            return (
                <View style={style.container}>
                    <ImageBackground
                        resizeMode="cover"
                        style={style.bestiaryWrapper}
                        source={require('../../assets/images/pages.backgrounds/tasks-bg.jpg')}
                            >
                        {/*Emulation getting server response, initially display preloader, after getting response show content */}
                        {
                            this.props.expectAnswer? <Preloader show={this.props.expectAnswer} size={'medium'} location={'center'} />:
                                <Swiper
                                    loop
                                    smoothTransition
                                        >
                                    {
                                        bestiary.map((monster, i) => (
                                            <View
                                                key={i}
                                                style={style.monsterSlide}
                                                    >
                                                <ImageBackground
                                                    resizeMode="cover"
                                                    style={style.monsterViewWrapper}
                                                    source={{uri: monster.monsterImg}}
                                                        >
                                                    <View style={style.monsterNameHolder}
                                                            >
                                                        <Text style={style.monsterName}>
                                                            Name: {monster.monsterName}
                                                        </Text>
                                                    </View>
                                                </ImageBackground>
                                                <View style={style.monsterDescriptionHolder}>
                                                    <Text style={style.monsterDescription}>
                                                        Description: {monster.monsterDescription}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </Swiper>
                        }

                    </ImageBackground>
                </View>
            )
        }
    }
    get style() {
        return ResponsiveStyleSheet.select([{
            query: { orientation: "portrait" },
            style: {
                container: {
                    flex: 1,
                },
                monsterSlide: {
                    flex:1,
                    marginLeft: '3%',
                    marginRight: '3%',
                    marginBottom: '3%',
                },
                monsterImgWrapper: {
                    flex:1,
                    justifyContent: 'space-between',
                    borderColor: colors.borderMainColor,
                    borderWidth: 4,
                    borderRadius: 5,
                },
                monsterNameHolder: {
                    marginLeft: '3%',
                    marginTop: '3%',
                },
                monsterName: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.textMainColor,
                },
                monsterContentDivider: {
                    backgroundColor: colors.borderMainColor,
                    height: 3,
                },
                monsterDescriptionHolder: {
                    backgroundColor: colors.projectMainColor,
                },
                monsterDescription: {
                    color: colors.textMainColor,
                    paddingLeft: '3%',
                    paddingBottom: '3%',
                },
            }
        }, {
            query: { orientation: "landscape" },
            style: {
                container: {
                    flex: 1,
                },
                monsterSlide: {
                    flex:1,
                    borderColor: colors.borderMainColor,
                    borderWidth: 4,
                    borderRadius: 5,
                    flexDirection: 'row',
                },
                monsterViewWrapper: {
                    flex:1,
                    justifyContent: 'flex-end',
                },
                bestiaryWrapper: {
                    flex: 1,
                    paddingBottom: '3%',
                    paddingHorizontal: '10%',
                },
                monsterNameHolder: {
                    marginLeft: '3%',
                    marginTop: '3%',
                },
                monsterName: {
                    fontSize: fonts.md,
                    fontWeight: 'bold',
                    color: colors.textMainColor,
                },
                monsterDescriptionHolder: {
                    backgroundColor: colors.projectMainColor,
                    flex: 1,
                    justifyContent: 'center',
                    borderLeftWidth: 3,
                    borderColor: colors.borderMainColor,
                },
                monsterDescription: {
                    color: colors.textMainColor,
                    paddingLeft: '3%',
                    paddingBottom: '3%',
                },
            }
        }]);
    }
}

const mapDispatchToProps = dispatch => ({
    getBestiary: ( data ) => {
        dispatch({type: BESTIARY.GET_BESTIARY.START, bestiary: data});
    },
});

export default connect(state => ({ ...state.bestiary }), mapDispatchToProps)(BestiaryScreen);
