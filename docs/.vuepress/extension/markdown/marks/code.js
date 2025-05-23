function backticksFor(node, side) {
    let ticks = /`+/g, m, len = 0;
    if (node.isText)
        while (m = ticks.exec(node.text))
            len = Math.max(len, m[0].length);
    let result = len > 0 && side > 0 ? " `" : "`";
    for (let i = 0; i < len; i++)
        result += "`";
    if (len > 0 && side < 0)
        result += " ";
    return result;
}

export const code = {
    open(_state, _mark, parent, index) { return backticksFor(parent.child(index), -1); },
    close(_state, _mark, parent, index) { return backticksFor(parent.child(index - 1), 1); },
    escape: false
}