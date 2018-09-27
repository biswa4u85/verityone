import { StyleSheet } from 'react-native'
import { Styles, Color } from '@common'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    },
    containerPadding: {
        padding: 30,
    },
    label: {
        fontWeight: 'bold',
        fontSize: Styles.FontSize.large,
        color: Color.black,
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: Color.grey,
        color: Color.black,
        height: 40,
        marginTop: 10,
        padding: 0,
        margin: 0,
    },
    calendarWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 10,
        borderColor: Color.grey,
        borderBottomWidth: 1,
    },
    radioWrap: {
        paddingTop: 20
    },
    radioLable: {
        fontSize: Styles.FontSize.medium,
        color: Color.grey,
        marginRight: 15,
    },
    dobLabel: {
        fontSize: Styles.FontSize.medium,
        color: Color.black,
        marginLeft: 10,
    },
    profileText: {
        color: Color.grey,
        fontSize: Styles.FontSize.big,
    },
    profileWrap: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 10
    },
    profileImg: {
        paddingVertical: 30,
        width: 70,
        height: 70,
        borderRadius: 10
    },
    signUpButton: {
        marginTop: 20,
        backgroundColor: Color.primary,
        borderRadius: 5,
        elevation: 1,
    },
});