import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { styles } from './styles';

interface Props {
  maintainerName: string;
  repositoryName: string;
  maintainerUrl: string;
  repositoryUrl: string;
  version: string;
}

class Footer extends React.Component<Props> {
  render() {
    const { maintainerName, repositoryName, version } = this.props;

    return (
      <Appbar style={styles.toolbar}>
        <Appbar.Content
          title={`${repositoryName}`}
          subtitle={`v${version} - maintained by ${maintainerName}`}
        />
      </Appbar>
    );
  }
}

export default Footer;
