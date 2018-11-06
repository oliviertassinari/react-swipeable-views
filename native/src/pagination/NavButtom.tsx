import * as React from 'react';
import { Button, withTheme, Theme } from 'react-native-paper';

interface Props {
  title: string;
  selected: boolean;
  onPress: () => void;
  theme: Theme;
}

class NavButtom extends React.Component<Props> {
  render() {
    const { selected, title, onPress } = this.props;
    const { colors } = this.props.theme;

    return (
      <Button
        mode="text"
        compact={true}
        onPress={onPress}
        color={selected ? colors.accent : colors.surface}
      >
        {title}
      </Button>
    );
  }
}

export default withTheme(NavButtom);
