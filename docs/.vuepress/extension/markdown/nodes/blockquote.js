export default function blockquote(state, node) {
    state.wrapBlock("> ", null, node, () => state.renderContent(node));
}