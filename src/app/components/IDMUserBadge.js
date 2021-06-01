import React from 'react';
import autoBind from 'react-autobind';
//
import { Menu, Avatar, Dropdown, Icon, Tag, Typography } from 'antd';
//

// import Utils from '../../components/Utils';
// import Globals from '../../config/Globals';
// import config from '../../config/config';
//
export default class IDMUserBadge extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return (
      <Dropdown overlay={this._renderDropdownMenu()} className="-leave">
        <Tag className="idmBadgeContainer">
          <Avatar justify="end" size={36} className="idmBadgeUserIcon">
            <Typography.Text className="idmBadgeUserText">{this.props.user?.firstName?.substr(0, 1)}</Typography.Text>
          </Avatar>
        </Tag>
      </Dropdown>
    );
  }
  _renderDropdownMenu() {
    return (
      <Menu className="userPopoverList">
        <Menu.Item disabled>
          <Icon type="user" />
          {this.props.user?.firstName + ' ' + this.props.user?.lastName}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item as="button" onClick={this.props.changePassword}>
          Change Password
        </Menu.Item>
        <Menu.Item as="button" onClick={this.props.logoutHandler}>
          <Icon type="export" /> Logout
        </Menu.Item>
      </Menu>
    );
  }
}
