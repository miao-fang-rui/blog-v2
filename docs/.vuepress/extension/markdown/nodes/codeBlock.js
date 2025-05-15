export default function codeBlock(state, node) {
    const backticks = node.textContent.match(/`{3,}/gm);
    const fence = backticks ? (backticks.sort().slice(-1)[0] + "`") : "```";
    state.write(fence + (node.attrs.language || "") + "\n");
    state.text(node.textContent, false);
    state.write("\n");
    state.write(fence);
    state.closeBlock(node);
}