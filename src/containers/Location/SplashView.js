import React, { Component } from 'react'
import { View, SectionList, Text } from 'react-native'
import { toast, error } from '@app/Omni';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages, Images, Styles } from '@common'
import VerityAPI from '@services/VerityAPI'
import { Menu, Logo, EmptyView } from '../../navigation/IconNav'
import styles from './styles'

class SplashView extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let text = 'Waiting..';
        if (this.props.errorMessage) {
            text = this.props.errorMessage;
        } else if (this.props.location) {
            text = JSON.stringify(this.props.location);
        }
        let image = "";
        // if (this.props.place == 'strCostco') image = require('../../assets/images/Splash/costco.imageset/1536x2048.png');
        // else if (this.props.place == 'strThefresh') image = require('../../assets/images/Splash/freshMarket.imageset/1536x2048.png');
        // else if (this.props.place == 'strKroger') image = require('../../assets/images/Splash/krogermart.imageset/1536x2048.png');
        // else if (this.props.place == 'strPublix') image = require('../../assets/images/Splash/publix.imageset/1536x2048.png');
        // else if (this.props.place == 'strTrader') image = require('../../assets/images/Splash/traderjoes.imageset/1536x2048.png');
        // else if (this.props.place == 'strWalmart') image = require('../../assets/images/Splash/walmart.imageset/1536x2048.png');

        // else if (this.props.place == 'strWawa') image = require('../../assets/images/Splash/wawa.imageset/1536x2048.png');
        // else if (this.props.place == 'strWholefoods') image = require('../../assets/images/Splash/wholefoods.imageset/1536x2048.png');
        // else if (this.props.place == 'strStartBucks') image = require('../../assets/images/Splash/starbucks.imageset/1536x2048-Recovered.jpg');
        // else if (this.props.place == 'strChipotle') image = require('../../assets/images/Splash/chipotle.imageset/1536x2048.jpg');

        // else if (this.props.place == 'strAlfalfas') image = require('../../assets/images/Splash/alfalfas.imageset/1536x2048.jpg');
        // else if (this.props.place == 'strCosmoProf') image = require('../../assets/images/Splash/cosmoProf.imageset/1536x2048-Recovered.jpg');
        // else if (this.props.place == 'strCvsPharmacy') image = require('../../assets/images/Splash/cvsPharmacy.imageset/1536x2048.jpg');
        // else if (this.props.place == 'strDunkinDonuts') image = require('../../assets/images/Splash/dunkinDonuts.imageset/1536x2048.jpg');

        // else if (this.props.place == 'strGNCLiveWell') image = require('../../assets/images/Splash/gncLiveWell.imageset/1536x2048-Recovered.jpg');
        // else if (this.props.place == 'strPaneraBread') image = require('../../assets/images/Splash/paneraBread.imageset/1536x2048-Recovered.jpg');
        // else if (this.props.place == 'strPetSupermarket') image = require('../../assets/images/Splash/petSupermarket.imageset/1536x2048-Recovered.jpg');
        // else if (this.props.place == 'strSaloncentric') image = require('../../assets/images/Splash/salonCentric.imageset/1536x2048-Recovered.jpg');
        // else if (this.props.place == 'strWalgreens') image = require('../../assets/images/Splash/walgreens.imageset/1536x2048.jpg');
        // else if (this.props.place == 'normal') image = require('../../assets/images/Splash/normal.imageset/1536x2048.png');


        return (
            <View style={styles.container}>
                {(image != "" &&
                    <Image
                        source={image}
                        style={styles.ImageStyle}
                    />
                )}
                {(this.props.loading &&
                    <Image
                        // source={require('../../assets/images/GIFVerity.gif')}
                        style={styles.gifImageStyle}
                    />
                )}
            </View>
        );
    }


};

export default SplashView