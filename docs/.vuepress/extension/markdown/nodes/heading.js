export default function heading(state, node) {
    state.write(state.repeat("#", node.attrs.level) + " ");
    state.renderInline(node, false);
    state.closeBlock(node);
}