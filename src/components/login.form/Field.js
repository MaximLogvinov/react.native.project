
// outsource dependencies
import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

// local dependencies
import {colors} from "../../constants/Colors";

export default function FormField(props) {
    const { input, label, meta: { touched, error }, ...inputProps } = props;

    return (
        <View style={styles.container}>
            <FormLabel>{label}</FormLabel>
            <FormInput
                {...inputProps}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
                underlineColorAndroid="transparent"
            />
            {touched &&
            ((error && <View style={styles.errorMessage}><FormValidationMessage>{error}</FormValidationMessage></View>))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.formBackground,
        borderBottomColor: colors.formFieldDividerColor,
        borderBottomWidth: 4,
    },
    errorMessage: {
        position: 'absolute',
        right: 0,
        top: '50%',
    }
});
