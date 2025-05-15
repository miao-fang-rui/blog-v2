export default function taskList(state, node) {
    state.renderList(node, "", () => "- ");
}