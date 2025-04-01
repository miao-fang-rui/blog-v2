export default function orderedList(state, node) {
    let start = node.attrs.order || 1;
    let maxW = String(start + node.childCount - 1).length;
    let space = state.repeat(" ", maxW + 2);
    state.renderList(node, space, i => {
        let nStr = String(start + i);
        return state.repeat(" ", maxW - nStr.length) + nStr + ". ";
    });
}