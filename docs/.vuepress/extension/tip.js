import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Tip from '../components/Tip.vue'

export default Node.create({
    name: 'tip',

    group: 'block',

    content: 'block+',

    addAttributes() {
        return {
            tipType: {
                default: 'tip',
            },
            tipContent: {
                default: '',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'vue-component',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['vue-component', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(Tip)
    },

    addCommands() {
        return {
            toggleTipText: () => ({ commands }) => {
                return commands.toggleWrap(this.name)
            },
        }
    },
})