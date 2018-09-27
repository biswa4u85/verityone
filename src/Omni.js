import { Constants } from '@common';

import _EventEmitter from 'EventEmitter';
export const EventEmitter = new _EventEmitter();

import _Timer from 'react-timer-mixin';
export const Timer = _Timer;

import _Validate from './ultils/Validate';
export const Validate = _Validate;

import reactotron from 'reactotron-react-native'
export const Reactotron = reactotron;

export const log = (values) => __DEV__ && reactotron.log(values);
export const warn = (values) => __DEV__ && reactotron.warn(values);
export const error = (values) => __DEV__ && reactotron.error(values);

//Drawer
export const openDrawer = () => EventEmitter.emit(Constants.EmitCode.SideMenuOpen);
export const closeDrawer = () => EventEmitter.emit(Constants.EmitCode.SideMenuClose);

/**
 * An async fetch with error catch
 * @param url
 * @param data
 * @returns {Promise.<*>}
 */
export const request = async (url, data = {}) => {
    try {
        const response = await fetch(url, data);

        return await response.json();
    } catch (err) {
        error(err);
        return { error: err };
    }
};

/**
 * Display the message toast-like (work both with Android and iOS)
 * @param msg Message to display
 * @param duration Display duration
 */
export const toast = (msg, duration = 4000) => {
    EventEmitter.emit(Constants.EmitCode.Toast, msg, duration)
};

import _ from 'lodash';
import { Config } from '@common'
// import _currencyFormatter from 'currency-formatter';
// export const currencyFormatter = _.bind(_currencyFormatter.format, undefined, _, {
//     symbol: '$',
//     decimal: '.',
//     thousand: ',',
//     precision: 2,
//     format: '%s%v' // %s is the symbol and %v is the value
// });

// import { Images } from "@common"
import { PixelRatio } from 'react-native';
export const getProductImage = (uri, containerWidth) => {
    //Enhance number if you want to fetch a better quality image (may affect performance
    const DPI_NUMBER = 0.5; // change this to 1 for high quality image

    if (!Config.ProductSize.enable) {
        return uri;
    }

    if (typeof uri != "string") {
        return ''
    }

    //parse uri into parts
    const index = uri.lastIndexOf('.');
    let editedURI = uri.slice(0, index);
    let defaultType = uri.slice(index);

    const SMALL = Config.ProductSize.ProductThumbnails;
    const MEDIUM = Config.ProductSize.CatalogImages;
    const LARGE = Config.ProductSize.SingleProductImage;

    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(containerWidth);

    switch (true) {
        case pixelWidth * DPI_NUMBER < SMALL.width:
            editedURI = editedURI + '-' + SMALL.width + 'x' + SMALL.height + defaultType;
            break;
        case pixelWidth * DPI_NUMBER < MEDIUM.width:
            editedURI = editedURI + '-' + MEDIUM.width + 'x' + MEDIUM.height + defaultType;
            break;
        case pixelWidth * DPI_NUMBER < LARGE.width:
            editedURI = editedURI + '-' + LARGE.width + 'x' + LARGE.height + defaultType;
            break;
        default:
            editedURI = editedURI + defaultType;
    }

    return editedURI;
};
