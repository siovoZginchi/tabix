import React from 'react';
import { Form, Input } from 'antd';
import { observer } from 'mobx-react';
import { ServerConnectionModel } from 'models';
import { error2status } from 'components/utils';
import ActionButtons, { ActionButtonsProps } from '../ActionButtons';

export interface Props extends ActionButtonsProps {
  model: ServerConnectionModel;
}

@observer
export default class ServerSignInForm extends React.Component<Props> {
  private submit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    // const { store, history } = this.props;
    // if (store.model.validate()) {
    // store.signIn(history);
    // }
  };

  render() {
    const {
      model,
      model: { changeField, errors },
      ...rest
    } = this.props;

    return (
      <Form layout="vertical" onSubmit={this.submit}>
        <Form.Item
          help="For example: dev"
          validateStatus={error2status(errors.connectionName.error.nonEmpty())}
        >
          <Input
            name="connectionName"
            placeholder="Connection name"
            value={model.connectionName}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item
          help="For example: https://tabix.dev/s1"
          validateStatus={error2status(errors.connectionUrl.error.nonEmpty())}
        >
          <Input
            name="connectionUrl"
            placeholder="Connection url"
            value={model.connectionUrl}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item validateStatus={error2status(errors.configKey.error.nonEmpty())}>
          <Input
            name="configKey"
            placeholder="Config key"
            value={model.configKey}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item validateStatus={error2status(errors.username.error.nonEmpty())}>
          <Input
            name="username"
            placeholder="Login"
            value={model.username}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item validateStatus={error2status(errors.password.error.nonEmpty())}>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={model.password}
            onChange={changeField}
          />
        </Form.Item>

        <Form.Item>
          <ActionButtons {...rest} />
        </Form.Item>
      </Form>
    );
  }
}
