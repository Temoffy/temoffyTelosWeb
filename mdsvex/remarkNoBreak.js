//courtesy of Claude ai. 2026

export function remarkNoBreak() {
  return (tree) => {
    const children = tree.children;
    const newChildren = [];

    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      const next = children[i + 1];

      if (
        node.type === 'heading' &&
        next?.type === 'paragraph'
      ) {
        newChildren.push({
          type: 'element', // or 'containerDirective' if using remark-directive
          data: {
            hName: 'div',
            hProperties: { className: ['noBreak'] },
          },
          children: [node, next],
        });
        i++; // skip next since we consumed it
      } else {
        newChildren.push(node);
      }
    }

    tree.children = newChildren;
  };
}