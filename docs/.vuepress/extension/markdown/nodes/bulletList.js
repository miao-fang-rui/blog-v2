export default function bulletList(state, node) {
    state.renderList(node, "  ", () => (node.attrs.bullet || "*") + " ");
}