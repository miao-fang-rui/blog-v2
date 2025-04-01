import { Extension, markPasteRule } from '@tiptap/core'

const FontSize = Extension.create({
  name: 'fontSize',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
            parseHTML: element => {
              return {
                fontSize: element.style.fontSize.replace('px', ''),
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: fontSize => ({ commands }) => {
        return commands.setMark('textStyle', { fontSize: `${fontSize}px` })
      },
      unsetFontSize: () => ({ commands }) => {
        return commands.unsetMark('textStyle')
      },
    }
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: /font-size\s*:\s*([\d.]+)(px|rem|vw)?/ig,
        handler: ({ match, commands }) => {
          commands.setMark('textStyle', { fontSize: '16px' }) 
        }
      })
    ]
  }

})

export default FontSize