export default function taskItem(state, node) {
    const check = node.attrs.checked ? '[x]' : '[ ]';
    state.write(`${check} `);
    state.renderContent(node);
}