import React, { Component } from 'react';
import { Tab, Tabs, TabHeading, Text, List, ListItem, Thumbnail, Left, Body, Right } from 'native-base';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Images } from "@common";
import { toast, error } from '@app/Omni';
import Icon from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux';
import ChatAPI from '@services/ChatAPI'

import styles from './styles'

class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      emptyMessage: "",
    }
  }

  componentDidMount() {
    this.setState({ 'loading': true });
    ChatAPI.loadUsers((user) => {
      if (Object.keys(user).length !== 0) {
        if (user.profileUrl === '') {
          user.profileUrl = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
        }
        this.setState({
          list: [...this.state.list, user]
        })
      }
      this.setState({ 'loading': false })
    });
  }


  openChat = (user) => {
    const { selectChatUser, onViewChatcreen } = this.props
    selectChatUser(user)
    onViewChatcreen()
  }

  renderItem() {
    let { list } = this.state;
    return (
      <ScrollView style={styles.userArea}>
        {Object.keys(list).map((index) => {
          return <List key={index}>
            <ListItem avatar button={true} onPress={() => this.openChat(list[index])}>
              <Left>
                <Thumbnail style={styles.userImage} source={{ uri: list[index].profileUrl }} />
              </Left>
              <Body>
                <Text>{list[index].firstName} {list[index].lastName}</Text>
                <Text note>{list[index].email}</Text>
              </Body>
              <Right>
                <Icon name={'arrow-bold-right'} size={30} color={'#000'} />
              </Right>
            </ListItem>
          </List>
        })}
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Tabs>
          <Tab heading={<TabHeading style={styles.tabBg}><Text style={styles.tabTxt}>Messages</Text></TabHeading>}>
            {this.renderItem()}
            <View style={styles.privateArea}>
              <View style={styles.privateBg}>
                <Text style={styles.privateTitle}>Private Message</Text>
                <TouchableOpacity style={styles.addIcon}>
                  <Text style={styles.addIconTxt}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabBg}><Text style={styles.tabTxt}>Notifications</Text></TabHeading>}>
            <View style={styles.bodyBg}>
              <Image style={styles.pageIcon} source={Images.chat} />
              <Text style={styles.textTitle}>Nothing here</Text>
              {/* <Text style={styles.textMsg}>You can add an item by clicking the + button</Text> */}
            </View>
          </Tab>
        </Tabs>
      </View>
    )
  }

}

const mapStateToProps = ({ netInfo, user }) => ({ netInfo })
const mapDispatchToProps = (dispatch) => {
  const { actions } = require('@redux/UserRedux');
  return {
    selectChatUser: (chatUser) => dispatch(actions.selectChatUser(chatUser)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Messages);