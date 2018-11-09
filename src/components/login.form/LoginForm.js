
// outsource dependencies
import React from 'react';
import {
    reduxForm,
    Field
} from 'redux-form';
import {
    ScrollView,
    View,
    StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements'

// local dependencies
import { LOGIN_PAGE } from '../../actions/types';
import witchersList from '../../witchersList';
import FormField from './Field';


const submit = (values, dispatch) => {
    // from start set user unregistered
    let userData = {
        registeredUser: false,
    };
    // find out if pasted data corresponds to some witcher
    for ( let i = 0; i < witchersList.length; i++ ) {
        if (values.name === witchersList[i].name && values.password === witchersList[i].password) {
            userData.registeredUser = true;
            Object.assign(userData, witchersList[i]);
        }
    }
    dispatch({type: LOGIN_PAGE.LOG_IN.START, ...userData});
};

function LogIn(props) {
    const { handleSubmit } = props;
    return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={styles.logInFormContentWrapper}>
                <Field
                    name={'name'}
                    label={'Name'}
                    component={FormField}
                />
                <Field
                    name={'password'}
                    label={'Password'}
                    secureTextEntry={true}
                    component={FormField}
                />
            </View>
            <Button
                title="Submit"
                icon={logInSubmitIcon}
                backgroundColor={'#3d1f18'}
                onPress={handleSubmit(submit)}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // set padding to align content
    logInFormContentWrapper: {
        padding: '3%'
    },
});

// button icon style
const logInSubmitIcon = {
    name: 'accessibility',
    color: '#958d92',
};

export default reduxForm({
    form: 'logIn',
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'name is required.'
        }

        if (!values.password) {
            errors.password = 'password is required.'
        }

        return errors
    }
})(LogIn);
