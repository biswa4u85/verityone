import React, { Component } from 'react'
import { View, SectionList, Text } from 'react-native'
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages, Images, Styles } from '@common'
import VerityAPI from '@services/VerityAPI'
import { Menu, Logo, EmptyView } from '../../navigation/IconNav'
import styles from './styles'

const googleMapUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBHMVfcKqZC0gQky3zgP5r6fEUWo9bEBcc&sensor=true';
const str_certified = "certified";
const splashAPIKey = "AIzaSyDnvz6A0jktKUhgFl3XWI1TWa1WT_Jn_e4";

class StoreView extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <SectionList
                    renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.storeTitleBackG}>
                            <Text style={styles.storeTitle}>{title}</Text>
                        </View>
                    )}
                    sections={this.props.listStore}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }


};

export default StoreView