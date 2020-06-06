import React, { useCallback } from 'react';
import { ToggleOn, ToggleOff } from '@material-ui/icons';
import { IconButton, PropTypes } from '@material-ui/core';

interface Props {
  readonly value: boolean;
  readonly toggle: () => void;
  readonly color: PropTypes.Color;
}

// アイコンだけだと明らかに分かりにくい Bad UX だけど、まあヨシ！
export const ToggleIcon: React.FC<Props> = React.memo((props: Props) => {
  const toggle = useCallback(() => {
    props.toggle();
  }, [props]);

  return (
    <IconButton onClick={toggle} color={props.color}>
      {props.value ? <ToggleOn /> : <ToggleOff />}
    </IconButton>
  );
});

ToggleIcon.displayName = 'ToggleIcon';
