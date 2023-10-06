import { traverse, traverseAncestor, Tree, TreeNode } from './index';

describe('traverse function', () => {
  it('should traverse the tree and call the callback for each node', () => {
    const root = new TreeNode();
    root.value = 10;

    const child1 = new TreeNode();
    child1.value = 20;
    root.children.push(child1);

    const child2 = new TreeNode();
    child2.value = 30;
    root.children.push(child2);

    const callback = jest.fn();
    traverse(root, callback);

    expect(callback).toHaveBeenCalledTimes(3); // Three nodes in the tree
    expect(callback).toHaveBeenCalledWith(root);
    expect(callback).toHaveBeenCalledWith(child1);
    expect(callback).toHaveBeenCalledWith(child2);
  });
});

describe('traverseAncestor function', () => {
  it('should traverse the ancestors of a node and call the callback for each ancestor', () => {
    const root = new TreeNode();
    root.value = 10;

    const child1 = new TreeNode();
    child1.value = 20;
    child1.parent = root;
    root.children.push(child1);

    const child2 = new TreeNode();
    child2.value = 30;
    child2.parent = child1;
    child1.children.push(child2);

    const callback = jest.fn();
    traverseAncestor(child2, callback);

    expect(callback).toHaveBeenCalledTimes(2); // Two ancestors (root and child1)
    expect(callback).toHaveBeenCalledWith(child1);
    expect(callback).toHaveBeenCalledWith(root);
  });

  describe('class Tree', () => {
    it('should add values', () => {
      const tree = new Tree();
      tree.add(10);
      tree.add(2);
      tree.add(3);

      let [left, right] = tree.root.children;
      expect(tree.root.value).toBe(2);
      expect(left.value).toBe(3);
      expect(right.value).toBe(10);

      tree.add(1);
      
      [left, right] = tree.root.children;
      expect(tree.root.value).toBe(1);
      expect(left.value).toBe(2);
      expect(right.value).toBe(10);
      [left] = left.children;
      
      expect(left.value).toBe(3);
    });
    
    it('should remove values', () => {
      const tree = new Tree();
      tree.add(1);
      tree.add(2);
      tree.add(3);
      tree.remove(2);

      expect(tree.root.children[0].value).toBe(3);

      tree.add(2);
      tree.add(4);
      tree.add(5);
      tree.add(6);

      tree.remove(1);
      expect(tree.root.value).toBe(2);
      
      tree.remove(2);
      expect(tree.root.value).toBe(3);
      
      tree.remove(3);
      expect(tree.root.value).toBe(4);
      
      tree.remove(4);
      expect(tree.root.value).toBe(5);
      
      tree.remove(5);
      expect(tree.root.value).toBe(6);
      
      tree.remove(6);
      expect(tree.root.value).toBe(new TreeNode().value);
    });
  });
});
