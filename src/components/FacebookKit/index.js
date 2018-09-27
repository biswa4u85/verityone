import React from 'react';
import {
  WebView
} from 'react-native'


class FacebookKit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onMessage } = this.props;
    return (
      <WebView ref={(wv) => { this.webView = wv; }}
        source={{ uri: 'https://rawgit.com/xpsdeset/72a0ca5b774dfdbc8f60d45dbf379967/raw/5e538c496e3658b6618029aa8d4c29fc087f55f5/AccountKit.html' }}
        injectedJavaScript={patchPostMessageJsCode}
        onMessage={onMessage}
        pointerEvents={"none"}
      />
    );
  }
}

export default FacebookKit;

