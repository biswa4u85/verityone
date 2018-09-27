import React from 'react';
import { View, Text, StyleSheet, NetInfo } from 'react-native';
import { connect } from 'react-redux';

import { Color, Languages, Styles } from "@common";
import { toast } from '@app/Omni';

class MyNetInfo extends React.Component {
  constructor(props) {
    super(props);

    this.skipFirstToast = true;
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    this.props.updateConnectionStatus(isConnected);
    if (!isConnected) return;

    if (!this.skipFirstToast) {
      toast('Regain internet connection');
    } else {
      this.skipFirstToast = false;
    }
  };

  render() {
    const { netInfo } = this.props;

    if (netInfo.isConnected) return <View />;
    return (
      <View style={styles.connectionStatus}>
        <Text style={styles.connectionText}>{Languages.noConnection}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionStatus: {
    position: 'absolute',
    backgroundColor: Color.error,
    alignItems: 'center',
    bottom: 0, //padding bottom
    left: 0,
    right: 0, // padding horizontal
  },
  connectionText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  }
});

const mapStateToProps = (state) => {
  return {
    netInfo: state.netInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('./../../redux/NetInfoRedux');

  return {
    updateConnectionStatus: (isConnected) => dispatch(actions.updateConnectionStatus(isConnected)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNetInfo);
