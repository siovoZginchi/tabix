import React from 'react';
import { Flex } from 'reflexy';
import { Menu, Icon } from 'antd';
import { SelectParam } from 'antd/lib/menu';
import { Connection } from 'services';
import css from './ConnectionList.css';

export interface Props {
  connections: ReadonlyArray<Connection>;
  selectedConnection?: Connection;
  onSelect?: (connection: Connection) => void;
}

export default class ConnectionList extends React.Component<Props> {
  private onSelect = (p: SelectParam) => {
    const { connections, onSelect } = this.props;
    if (onSelect) {
      const con = connections.find(_ => _.connectionName === p.key);
      con && onSelect(con);
    }
  };

  render() {
    const { connections, selectedConnection } = this.props;

    const selectedKeys =
      selectedConnection && selectedConnection.connectionName
        ? [selectedConnection.connectionName]
        : undefined;

    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        onSelect={this.onSelect}
        className={css['root']}
      >
        {connections.map(c => (
          <Menu.Item key={c.connectionName}>
            <Flex alignItems="center" justifyContent="space-between">
              <Flex column>
                <div className={css['title']}>{c.connectionName}</div>
                <div className={css['subtitle']}>{c.connectionUrl}</div>
              </Flex>
              <Icon type="ellipsis" />
            </Flex>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
