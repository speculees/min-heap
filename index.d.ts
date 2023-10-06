export declare function traverseMinimum(node: TreeNode, callback: (node: TreeNode) => void): void;
export declare function traverse(node: TreeNode, callback: (node: TreeNode) => void): void;
export declare function traverseAncestor(node: TreeNode, callback: (node: TreeNode) => void): void;
export declare class TreeNode {
    value: number;
    parent?: TreeNode;
    children: TreeNode[];
}
export declare class Tree {
    private _parentCandidate;
    root: TreeNode;
    add(value: number): void;
    remove(value: number): void;
}
//# sourceMappingURL=index.d.ts.map