import { TreeNode, TreeType } from '../types/TreeNode';
import { useAsyncRetry } from 'react-use';

let _cachedRoot: Promise<TreeNode> | undefined;
const fetchLibraries = async (): Promise<TreeNode> => {
  if (!_cachedRoot) {
    _cachedRoot = fetch('/.netlify/functions/GetLibraries')
      .then((res) => res.json())
      .then((val) => {
        return {
          key: -1,
          title: '',
          sourceCode: '',
          children: val,
          type: TreeType.internal,
        } as TreeNode;
      });
  }
  return _cachedRoot;
};
export const useFetchLibraries = () => {
  const res = useAsyncRetry(fetchLibraries);
  return {
    ...res,
    retry: () => {
      _cachedRoot = undefined;
      res.retry();
    },
  };
};
