import { StyleSheet, Dimensions } from 'react-native'
import { Styles, Color } from '@common'

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        width: width,
    },


    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    ImageIconStyle: {
        marginTop: 5,
        paddingTop: 10,
        height: 40,
        width: 40,
        borderRadius: 5,
        resizeMode: 'stretch',

    },
    mainContainer: {
        backgroundColor: '#ffffff',
        height: height,
    },
    labelText: {
        marginVertical: 15,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#4ac0f7'
    },
    activityIndicatorWrapper: {
        backgroundColor: 'transparent',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        paddingHorizontal: '50%'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});