export default function(babel) {
  const { template, types: t } = babel;

  return {
    name: 'ast-transform', // not required
    visitor: {
      CallExpression(path) {
        const isJqueryCallExpression = looksLike(path, {
          node: {
            callee: {
              object: {
                callee: {
                  name: '$'
                }
              }
            }
          },

          parent: {
            expression: {
              callee: {
                property: {
                  name: 'hide'
                }
              }
            }
          }
        });

        if (!isJqueryCallExpression) {
          return;
        }

        const overallPath = path.parentPath;
        const templateString = `EL.style.display = "none" `;
        const assignmentBuilder = template(templateString);
        const assignment = assignmentBuilder({
          EL: t.identifier(
            path.parent.expression.callee.object.arguments[0].name
          )
        });
        overallPath.replaceWith(assignment);
      }
    }
  };
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
