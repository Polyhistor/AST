export default function(babel) {
  const { types: t } = babel;

  return {
    name: 'console-text-replacer', // not required
    visitor: {
      CallExpression(path) {
        const isConsoleCall = looksLike(path, {
          node: {
            callee: {
              type: 'MemberExpression',
              object: {
                name: 'console'
              }
            }
          }
        });

        if (!isConsoleCall) {
          return;
        }

        let prefix = '';
        const parentFunctionName = getFunctionName(path);

        console.log(parentFunctionName);

        if (parentFunctionName) {
          prefix += parentFunctionName;
        }

        const start = path.node.loc.start;

        //console.log(path)

        path.node.arguments.unshift(
          t.stringLiteral(`${start.line}:${start.column}`)
        );

        // path.node.arguments.splice(1)
      }
    }
  };
}

function getFunctionName(path) {
  const parentFunction = path.findParent(parent => {
    return parent.isFunctionDeclaration() || parent.isArrowFunctionExpression();
  });

  if (parentFunction) {
    if (
      parentFunction.isArrowFunctionExpression() &&
      parentFunction.parentPath.isVariableDeclarator()
    ) {
      console.log(parentFunction);
      return parentFunction.parent.id.name;
    }

    return parentFunction.node.id.name;
  }

  return null;
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === 'function') {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}
