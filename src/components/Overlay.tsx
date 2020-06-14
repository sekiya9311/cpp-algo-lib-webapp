import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
import { createPortal } from 'react-dom';

const portal = document.getElementById('portal')!;

interface Props {
  zIndex?: number;
  onClick: () => void;
}

const useStyles = makeStyles({
  layout: (props: { zIndex: number }) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: props.zIndex,
  }),
  overlay: (props: { zIndex: number }) => ({
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: props.zIndex,
  }),
  item: (props: { zIndex: number }) => ({
    position: 'relative',
    zIndex: props.zIndex + 1,
  }),
});

export const Overlay: React.FC<PropsWithChildren<Props>> = ({
  zIndex = 123456,
  onClick,
  children,
}: PropsWithChildren<Props>) => {
  const styles = useStyles({ zIndex });
  return createPortal(
    <div className={styles.layout}>
      <div className={styles.item}>{children}</div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className={`${styles.layout} ${styles.overlay}`} onClick={onClick} />
    </div>,
    portal
  );
};
