import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  name: {
    marginTop: 16,
    marginBottom: 16,
    color: '#159957',
    fontSize: 19,
  },
  description: {
    color: '#606c71',
    fontSize: 16,
    marginBottom: 16,
  },
});

const Demo = (props) => {
  const {
    name,
    description,
    children,
  } = props;

  return (
    <View>
      <Text style={styles.name}>
        {name}
      </Text>
      <Text style={styles.description}>
        {description}
      </Text>
      {children}
    </View>
  );
};

Demo.propTypes = {
  children: React.PropTypes.node.isRequired,
  description: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default Demo;
