export default function text(state, node) {
    state.text(node.text, !state.inAutolink);
}