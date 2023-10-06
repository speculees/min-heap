export function traverseLeft(node: TreeNode, callback: (node: TreeNode) => void) {
    callback(node);
    const [left] = node.children;
    if (left) {
        traverseLeft(left, callback);
    }
}

export function traverse(node: TreeNode, callback: (node: TreeNode) => void) {
    callback(node);
    for (const child of node.children) { 
        traverse(child, callback);
    }
}

export function traverseAncestor(node: TreeNode, callback: (node: TreeNode) => void) {
    if (node.parent) {
        callback(node.parent);
        traverseAncestor(node.parent, callback); 
    } 
}

export class TreeNode {
    value: number = Number.POSITIVE_INFINITY;
    parent?: TreeNode;
    children: TreeNode[] = [];
}

export class Tree {
    private _parentCandidate = new TreeNode();
    root =  new TreeNode();    

    add(value: number) {
        // if no root
        if (this.root.value === Number.POSITIVE_INFINITY) {
            this.root.value = value;
            return;
        }

        // traverse from top & find smallest leaf
        traverse(this.root, (node) => {
            if (node.children.length < 2) {
                if (node.value < this._parentCandidate.value) {
                    this._parentCandidate = node;
                }
            } 
        });

        // create a new node and add to leaf
        const newTreeNode = new TreeNode();
        newTreeNode.value = value;
        newTreeNode.parent = this._parentCandidate;
        this._parentCandidate.children.push(newTreeNode); 
        this._parentCandidate.children.sort((a, b) => a.value - b.value);
        this._parentCandidate = new TreeNode();

        // swap with parent
        traverseAncestor(newTreeNode, (parent) => {
            for (const child of parent.children) { 
                if (parent.value > child.value) { 
                    // swap
                    const { value } = child;
                    child.value = parent.value;
                    parent.value = value;

                    // sort ancestor children after swap
                    parent.parent?.children.sort((a, b) => a.value - b.value);
                }
            }
        });
    }

    remove(value: number) {
        // traverse from top & find target node
        let target: TreeNode | undefined; 
        traverse(this.root, (node) => {
            if (!target && node.value === value) {
                target = node;
            } 
        });
        if (!target) return;

        // swap and remove
        traverseLeft(target, (node) => {
            const parent = node;
            const [ child ] = node.children; 
            if (child) {
                // swap
                const { value } = child;
                child.value = parent.value;
                parent.value = value;
            } else if (node.parent) {
                // remove
                const index = node.parent.children.findIndex(({ value }) => value === node.value);
                node.parent.children.splice(index, 1);
                node.parent = undefined;
            } else { // if no parent reset root
                this.root = new TreeNode();
            }

            node.parent?.children.sort((a, b) => a.value - b.value);
        });
    }
}

const tree = new Tree();
tree.add(10);
tree.add(20);
tree.add(50);
tree.add(30);
tree.add(80);
tree.add(60);
tree.add(70);
tree.add(1);


traverse(tree.root, (node) => {
    console.log('p', node.parent?.value || '');
    console.log('v', node.value);
    console.log('c', node.children.map(({value}) => value).join(', '));
    console.log('\n');
});

tree.remove(10);
tree.remove(20);
tree.remove(50);
tree.remove(30);
tree.remove(80);
tree.remove(60);
tree.remove(70);

traverse(tree.root, (node) => {
    console.log('p', node.parent?.value || '');
    console.log('v', node.value);
    console.log('c', node.children.map(({value}) => value).join(', '));
    console.log('\n');
});