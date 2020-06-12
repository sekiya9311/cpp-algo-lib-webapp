import React, { useState, useCallback } from 'react';
import {
  Drawer,
  List,
  ListSubheader,
  Collapse,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { TreeNode, TreeType } from '../types/TreeNode';
import { useHistory } from 'react-router';

interface AppSidebarItemProps {
  node: TreeNode;
  onClick: (key: number) => void;
  rank: number;
}
const AppSidebarItem: React.FC<AppSidebarItemProps> = ({
  node,
  onClick,
  rank,
}: AppSidebarItemProps) => {
  const [open, setOpen] = useState(false);
  const clickInternalNode = useCallback(() => {
    setOpen((x) => !x);
  }, []);
  const clickLeafNode = useCallback(() => {
    onClick(node.key);
  }, [node, onClick]);

  return node.type === TreeType.internal ? (
    <>
      <ListItem button onClick={clickInternalNode}>
        <ListItemText
          primary={node.title}
          style={{ paddingLeft: `${rank * 2}em` }}
        />
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List>
          {node.children.map((node) => (
            <AppSidebarItem
              key={node.key}
              node={node}
              onClick={onClick}
              rank={rank + 1}
            />
          ))}
        </List>
      </Collapse>
    </>
  ) : (
    <ListItem button onClick={clickLeafNode}>
      <ListItemText
        primary={node.title}
        style={{ paddingLeft: `${rank * 2}em` }}
      />
    </ListItem>
  );
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AppSidebar: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const libraries = useSelector((state: RootState) => state.libraries);
  const onClick = useCallback(
    (key: number) => {
      history.push({ pathname: `/detail/${key}` });
    },
    [history]
  );

  return (
    <Drawer anchor='left' {...props}>
      <List
        subheader={
          <>
            <ListSubheader>SourceCode List</ListSubheader>
            <Divider />
          </>
        }
      >
        {libraries.root.children.map((node) => (
          <AppSidebarItem
            key={node.key}
            node={node}
            onClick={onClick}
            rank={0}
          />
        ))}
      </List>
    </Drawer>
  );
};
