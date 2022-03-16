const DEFAULT_CONFIG = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config) => Object.assign({}, DEFAULT_CONFIG, config);

/**
 * @template T
 * @param {T[]} list 
 * @param {Partial<typeof DEFAULT_CONFIG>} config 
 * @returns {T[]}
 */
export function listToTree(list, config = {}) {
  const conf = getConfig(config)
  const nodeMap = new Map();
  const result = [];
  const {
    id,
    children,
    pid
  } = conf;

  for (const node of list) {
    node[children] = node[children] || [];
    nodeMap.set(node[id], node);
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid]);
    (parent ? parent[children] : result).push(node);
  }
  return result;
}

/**
 * @template T
 * @param {T[]} tree 
 * @param {Partial<typeof DEFAULT_CONFIG>} config 
 * @returns {T[]}
 */
export function treeToList(tree, config = {}) {
  config = getConfig(config);
  const {
    children
  } = config;
  const result = [...tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children]) continue;
    result.splice(i + 1, 0, ...result[i][children]);
  }
  return result;
}

/**
 * @template T
 * @param {T[]} tree 
 * @param {(node: T) => boolean} func 
 * @param {Partial<typeof DEFAULT_CONFIG>} config 
 * @returns {T}
 */
export function findNode(
  tree,
  func,
  config = {},
) {
  config = getConfig(config);
  const {
    children
  } = config;
  const list = [...tree];
  for (const node of list) {
    if (func(node)) return node;
    node[children] && list.push(...node[children]);
  }
  return null;
}

/**
 * @template T
 * @param {T[]} tree 
 * @param {(node: T) => boolean} func 
 * @param {Partial<typeof DEFAULT_CONFIG>} config 
 * @returns {T[]}
 */
export function findNodeAll(
  tree,
  func,
  config = {},
) {
  config = getConfig(config);
  const {
    children
  } = config;
  const list = [...tree];
  const result = [];
  for (const node of list) {
    func(node) && result.push(node);
    node[children] && list.push(...node[children]);
  }
  return result;
}

/**
 * @template T
 * @param {T[]} tree 
 * @param {(node: T) => boolean} func 
 * @param {Partial<typeof DEFAULT_CONFIG>} config 
 * @returns {T|T[]|null}
 */
export function findPath(
  tree,
  func,
  config = {},
) {
  config = getConfig(config);
  const path = [];
  const list = [...tree];
  const visitedSet = new Set();
  const {
    children
  } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children] && list.unshift(...node[children]);
      path.push(node);
      if (func(node)) {
        return path;
      }
    }
  }
  return null;
}

/**
 * @template T
 * @param {T[]} tree 
 * @param {(node: T) => boolean} func 
 * @param {Partial<typeof DEFAULT_CONFIG>} config 
 * @returns {T[][]}
 */
export function findPathAll(tree, func, config = {}) {
  config = getConfig(config);
  const path = [];
  const list = [...tree];
  const result = [];
  const visitedSet = new Set(),
    {
      children
    } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children] && list.unshift(...node[children]);
      path.push(node);
      func(node) && result.push([...path]);
    }
  }
  return result;
}

/**
 * @template T
 * @param {T[]} tree 
 * @param {(node: T) => boolean} func 
 * @param {Partial<typeof DEFAULT_CONFIG>} config 
 * @returns {T[]}
 */
export function filter(
  tree,
  func,
  config = {},
) {
  config = getConfig(config);
  const children = config.children;

  function listFilter(list) {
    return list
      .map((node) => ({
        ...node
      }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }
  return listFilter(tree);
}

/**
 * @template T
 * @param {T[]} tree 
 * @param {(node: T) => boolean} func 
 * @param {Partial<typeof DEFAULT_CONFIG>} config 
 * @returns {void}
 */
export function forEach(
  tree,
  func,
  config = {},
) {
  config = getConfig(config);
  const list = [...tree];
  const {
    children
  } = config;
  for (let i = 0; i < list.length; i++) {
    //func 返回true就终止遍历，避免大量节点场景下无意义循环，引起浏览器卡顿
    if (func(list[i])) {
      return;
    }
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children]);
  }
}

/**
 * @template T
 * @typedef {Object} TreeMapOption 
 * @property {string} children 
 * @property {(data: T) => object} conversion 
 */

/**
 * @description: Extract tree specified structure
 * @template T
 * @param {T[]} tree 
 * @param {TreeMapOption<T>} opt
 * @return {T[]}
 */
export function treeMap(tree, opt) {
  return tree.map((item) => treeMapEach(item, opt));
}

/**
 * @description: Extract tree specified structure
 * @template T
 * @param {T} data 
 * @param {TreeMapOption<T>} opt
 * @return {T}
 */
export function treeMapEach(data, {
  children,
  conversion
}) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0;
  const conversionData = conversion(data) || {};
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i) =>
        treeMapEach(i, {
          children,
          conversion,
        }),
      ),
    };
  } else {
    return {
      ...conversionData,
    };
  }
}

/**
 * @param {NodeList} tree
 * @param {(el: Node, pel?: Node) => Node} func
 * @param {Node} parentNode
 * @return {void}
 */
export function eachNodeTree(tree, func, parentNode) {
  tree.forEach((element) => {
    const newNode = func(element, parentNode) || element;
    if (element.childNodes) {
      eachNodeTree(element.childNodes, func, newNode);
    }
  });
}