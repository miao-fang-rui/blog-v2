// import Image from '@tiptap/extension-image';
import { Node, mergeAttributes } from '@tiptap/core'
import ResizableImageNode from '../components/ResizableImageNode.vue';
import { VueNodeViewRenderer } from '@tiptap/vue-3'

const ResizableImage = Node.create({
    name: 'ResizableImage',
    group: 'block',
    draggable: true,

    addOptions() {
        return {
            types: ["image"],
            HTMLAttributes: {},
            width: '',
            height: '',
            display: ''
        }
    },

    addAttributes() {
        return {
            src: {},
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                renderHTML: (attributes) => {
                    return {
                        width: attributes.width
                    };
                }
            },
        
            height: {
                renderHTML: (attributes) => {
                    return {
                        height: attributes.height
                    };
                }
            },
            display: {
                default: 'flex',
                parseHTML: element => {
                    const display = element.style.display || element.getAttribute('display')
                    return display || this.options.display
                },
                renderHTML: (attributes) => {
                    if (!attributes.display) {
                        return {}
                      }
            
                      return {
                        display: attributes.display,
                        style: `display: ${attributes.display}`,
                      }
                }
            },
            justifyContent: {
                parseHTML: element => {
                    const justifyContent = element.style.justifyContent || element.getAttribute('justifyContent')
                    return justifyContent || this.options.justifyContent
                },
                renderHTML: (attributes) => {
                    if (!attributes.justifyContent) {
                        return {}
                      }
            
                      return {
                        display: attributes.justifyContent,
                        style: `justifyContent: ${attributes.justifyContent}`,
                      }
                }
            },
            isDraggable: {
                default: true,
                renderHTML: (attributes) => {
                    return {};
                }
            }
        }
    },

    renderHTML({ node, HTMLAttributes }) {
        return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },

    addCommands() {
        return {
            setImage: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
            toggleResizable:() => ({ tr }) => {
                const { node } = tr?.selection;
                if (node?.type?.name === 'ResizableImage') {
                    node.attrs.isDraggable = !node.attrs.isDraggable;
                }
            }
        }
    },


    addNodeView() {
        return VueNodeViewRenderer(ResizableImageNode)
    },
})

export default ResizableImage