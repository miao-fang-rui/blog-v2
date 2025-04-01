export default function ResizableImage(state, node, extension) {

    const nodes = extension.content.content
    let hardBreak = ''
    
    let widthHeight = ''
    if(node.attrs?.width || node.attrs?.height){
        widthHeight = `=${node.attrs?.width? node.attrs?.width: ''}x${node.attrs?.height? node.attrs?.height: ''}` 
    }else{
        widthHeight = ''
    }

    if(node.attrs.display !== 'inline-block'){
        hardBreak = '\n'
    }else{
        if(node.attrs.src){
            let foundIndex = nodes.findIndex(e => node.attrs?.src === e.attrs.src)
            
            if(nodes[foundIndex+1]?.type.name === "ResizableImage"){
                hardBreak = '&nbsp;'
            }else{
                hardBreak = '\n'
            }
        }
        
    }

    state.write("![" + state.esc(node.attrs.alt || "") + "](" + node.attrs.src.replace(/[\(\)]/g, "\\$&") +
                    (node.attrs.title ? ' "' + node.attrs.title.replace(/"/g, '\\"') + '"' : "") + " "+ widthHeight + ")" + hardBreak);

    state.write("\n");
}