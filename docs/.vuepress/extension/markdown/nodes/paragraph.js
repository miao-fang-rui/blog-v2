export default function paragraph(state, node) {
    state.renderInline(node);
    state.closeBlock(node);
}