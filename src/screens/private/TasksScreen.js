
// outsource dependencies
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import {
    Avatar,
    ListItem,
    List,
    Icon,
    Divider,
} from 'react-native-elements';
import Modal from "react-native-modal";
import {connect} from "react-redux";
import {responsive} from "react-native-responsive-ui";

// local dependencies
import {MODAL} from "../../actions/types";
import {colors} from "../../constants/Colors";
import {fonts} from "../../constants/Fonts";

@responsive
export class TasksScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleWitcherProfile: false,
        };
    }
    static navigationOptions = {
        tabBarLabel: 'Tasks',
    };
    toggleWitcherProfile = () =>
        this.setState({ isVisibleWitcherProfile: !this.state.isVisibleWitcherProfile });

    render() {
        const {width, height} = this.props.window;
        const mode = height > width ? "portrait" : "landscape";
        return (
            <ImageBackground
                resizeMode="cover"
                style={styles.container}
                source={require('../../assets/images/pages.backgrounds/tasks-bg.jpg')}
                    >
                <View style={styles.container}>
                    <View style={styles.avatarHolder}>
                        <Avatar
                            xlarge
                            rounded
                            source={{uri: this.props.avatar}}
                            onPress={() => this.toggleWitcherProfile()}
                            activeOpacity={0.5}
                                />
                        <View style={styles.avatarDescriptionWrapper}>
                            <Text style={styles.avatarName}>{this.props.name}</Text>
                        </View>
                        <Modal isVisible={this.state.isVisibleWitcherProfile}>
                            <View style={styles.witcherProfileWrapper}>
                                {/*Rendering different components depending on display orientation*/}
                                {
                                    (mode === 'portrait') &&
                                    <View style={styles.witcherProfilePortrait}>
                                        <ImageBackground
                                            resizeMode="cover"
                                            style={styles.witcherImage}
                                            source={{uri: this.props.avatar}}
                                        />
                                        <View style={styles.witcherProfileInfoPortrait}>
                                            <Divider style={styles.witcherProfileDivider}/>
                                            <Text style={styles.witcherProfileDescription}>Name: {this.props.name}</Text>
                                            <Text style={styles.witcherProfileDescription}>Age: {this.props.age}</Text>
                                            <Text style={styles.witcherProfileDescription}>School: {this.props.school}</Text>
                                            <Text style={styles.witcherProfileDescription}>Biography: {this.props.biography}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{alignSelf: 'flex-end'}}
                                            onPress={() => this.toggleWitcherProfile()}
                                                >
                                            <Icon
                                                reverse
                                                name='times'
                                                type='font-awesome'
                                                color='transparent'
                                                iconStyle={styles.closeDescriptionIcon}
                                                    />
                                        </TouchableOpacity>
                                    </View>

                                }
                                {
                                    (mode === 'landscape') &&
                                    <View style={styles.witcherProfileLandscape}>
                                        <ImageBackground
                                            resizeMode="cover"
                                            style={styles.witcherImage}
                                            source={{uri: this.props.avatar}}
                                                />
                                        <View style={styles.witcherProfileInfoLandscape}>
                                            <View style={styles.witcherProfileDescriptionWrapperLandscape}>
                                                <Text style={styles.witcherProfileDescription}>Name: {this.props.name}</Text>
                                                <Text style={styles.witcherProfileDescription}>Age: {this.props.age}</Text>
                                                <Text style={styles.witcherProfileDescription}>School: {this.props.school}</Text>
                                                <Text style={styles.witcherProfileDescription}>Biography: {this.props.biography}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={{alignSelf: 'flex-end'}}
                                                onPress={() => this.toggleWitcherProfile()}
                                                    >
                                                <Icon
                                                    reverse
                                                    name='times'
                                                    type='font-awesome'
                                                    color='transparent'
                                                    iconStyle={styles.closeDescriptionIcon}
                                                        />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                        </Modal>
                    </View>
                    <ScrollView>
                        <Text style={styles.taskTitle}> Tasks: </Text>
                        <List>
                            {
                                this.props.tasks.map( (task, i) => (
                                    <ListItem
                                        key={i}
                                        roundAvatar
                                        title={task.taskTitle}
                                        titleStyle={styles.taskTitle}
                                        subtitle={
                                            <View style={styles.taskListItem}>
                                                <Image
                                                    style={styles.taskImage}
                                                    source={{uri: task.taskImg}}
                                                        />
                                                <Text style={styles.taskShortDescription}>{task.shortTaskDescription}</Text>
                                            </View>
                                        }
                                        avatar={{uri: task.taskCustomerImg}}
                                        onPress={()=>this.props.openTask(task.taskTitle, task.wholeTaskDescription)}
                                        containerStyle={styles.taskList}
                                    />
                                ))
                            }
                        </List>
                        <Modal isVisible={this.props.showTask}>
                            <View style={styles.taskDescriptionWrapper}>
                                <Text style={styles.taskDescriptionTitle}>{this.props.currentTaskTitle}</Text>
                                <Text style={styles.taskDescriptionText}>{this.props.currentTaskDescription}</Text>
                                <TouchableOpacity
                                    style={{alignSelf: 'flex-end'}}
                                    onPress={this.props.closeTask}
                                        >
                                    <Icon
                                        reverse
                                        name='times'
                                        type='font-awesome'
                                        color='transparent'
                                        iconStyle={styles.closeDescriptionIcon}
                                            />
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarHolder: {
        flexDirection: 'row',
        borderColor: colors.borderMainColor,
        borderBottomWidth: 3,
    },
    avatarDescriptionWrapper: {
        alignSelf: 'center',
        flexGrow: 1,
    },
    avatarName: {
        textAlign: 'center',
        color: colors.textMainColor,
        fontSize: fonts.md,
    },
    taskList: {
        backgroundColor: colors.tasksBackground,
    },
    taskListItem: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    taskImage: {
        height: 70,
        width: 100,
    },
    taskTitle: {
        fontSize: fonts.md,
        color: colors.textMainColor,
    },
    taskShortDescription: {
        paddingLeft: 10,
        color: colors.tasksDescriptionColor,
    },
    taskDescriptionWrapper: {
        backgroundColor: colors.tasksDescriptionBackground,
        borderRadius: 10,
        borderColor: colors.borderMainColor,
        borderWidth: 4,
    },
    taskDescriptionTitle: {
        textAlign: 'center',
        fontSize: fonts.md,
        color: colors.textMainColor,
    },
    taskDescriptionText: {
        textAlign: 'center',
        color: colors.tasksDescriptionColor,
    },
    closeDescriptionIcon: {
        color: colors.textMainColor,
    },

    witcherProfileWrapper: {
        flex: 1,
        backgroundColor: colors.tasksDescriptionBackground,
        borderRadius: 10,
        borderColor: colors.borderMainColor,
        borderWidth: 4,
    },
    witcherProfilePortrait: {
        flex: 1,
    },
    witcherProfileDivider: {
        height: 3,
        backgroundColor: colors.borderMainColor,
    },
    witcherProfileInfoPortrait: {
        flex: 1,
    },
    witcherProfileLandscape: {
        flex: 1,
        flexDirection: 'row',
    },
    witcherProfileInfoLandscape: {
        justifyContent: 'space-between',
        flex: 1,
        borderColor: colors.borderMainColor,
        borderLeftWidth: 3,
    },
    witcherProfileDescriptionWrapperLandscape: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: '3%',
    },
    witcherImage: {
        flex: 1,
    },
    witcherProfileDescription: {
        marginLeft: '3%',
        color: colors.textMainColor,
    },
});
const mapDispatchToProps = dispatch => ({
    openTask: (title, description) => dispatch({type: MODAL.SHOW_MODAL, showTask: true, currentTaskTitle: title, currentTaskDescription: description}),
    closeTask: () => dispatch({type: MODAL.HIDE_MODAL, showTask: false}),
});
export default connect(state => ({ ...state.login, ...state.tasks }),mapDispatchToProps)(TasksScreen);
