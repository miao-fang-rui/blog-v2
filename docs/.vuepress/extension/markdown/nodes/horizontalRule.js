export default function horizontalRule(state, node) {
    state.write(node.attrs.markup || "---");
    state.closeBlock(node);
}