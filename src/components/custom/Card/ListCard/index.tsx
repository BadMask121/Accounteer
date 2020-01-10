import React from 'react';
import RippleView from 'react-native-material-ripple';
import style from './style';
export default props => {
  return (
    <RippleView
      rippleCenter={true}
      rippleDuration={600}
      rippleOpacity={0.03}
      style={[style.ListCardContainer, {...props.cardStyle}]}
      {...props}>
      {props.children}
    </RippleView>
  );
};
