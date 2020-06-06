import React from 'react';
import { GitHub } from '@material-ui/icons';
import { IconButton, makeStyles, PropTypes } from '@material-ui/core';

interface Props {
  readonly detailText: string;
  readonly linkUrl: string;
  readonly color: PropTypes.Color;
}

const useStyles = makeStyles(() => ({
  icon: {
    marginRight: '10px',
  },
}));

export const GitHubLinkIcon = React.memo((props: Props) => {
  const styles = useStyles();
  return (
    <IconButton
      href={props.linkUrl}
      target='_blank'
      rel='noopener noreferrer'
      color={props.color}
    >
      <div className={styles.icon}>
        <GitHub />
      </div>
      <div>{props.detailText}</div>
    </IconButton>
  );
});

GitHubLinkIcon.displayName = 'GitHubLinkIcon';
