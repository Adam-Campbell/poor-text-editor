/**
 *    _________________
 *      ONGOING NOTES  
 *    _________________
 * 
 * To position the cursor correctly, I ultimately have to drill down to the text node level.
 * I need to find the element that contains the text node, and then go into the text node itself.
 * 
 * A problem that we will have, is that a span can theoretically contain multiple text nodes. Eventually, 
 * we will want to have a thorough strategy for dealing with this, but for now, we can:
 *   - simply assume that the span contains only one text node
 *   - call span.normalize() to merge all text nodes into one - assuming that the only children of the span are text nodes
 *
 * These will suffice for now.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

import { Char, EditorState, defaultState } from './types';


class Editor {

    private state: EditorState;
    private container: HTMLElement;

    constructor(initialState: EditorState = defaultState) {
        const container = document.getElementById('pte-container');
        if (!container) {
            throw new Error('Container not found');
        }
        this.container = container;
        this.state = initialState;
        
    }

    public init() : void {
        this.container.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (e: KeyboardEvent) : void => {
        e.preventDefault();
        const { key } = e;
        
        if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta') {
            return;
        }
        if (key === 'Backspace') {
            this.removeChar();
            return;
        }
        if (key === 'ArrowLeft') {
            this.moveCursor('left');
            return;
        }
        if (key === 'ArrowRight') {
            this.moveCursor('right');
            return;
        }
        this.addChar(key);
    }

    private addChar(charString: string) : void {
        const newChar: Char = {
            char: charString,
            bold: this.state.isBold,
            italic: this.state.isItalic,
            underline: this.state.isUnderline
        };
        this.state.chars.splice(this.state.cursorPosition, 0, newChar);
        this.state.cursorPosition++;
        this.render();
    }

    private removeChar() : void {
        if (this.state.cursorPosition === 0) {
            return;
        }
        this.state.chars.splice(this.state.cursorPosition - 1, 1);
        this.state.cursorPosition--;
        this.render();
    }

    private moveCursor(direction: 'left' | 'right') : void {
        if (direction === 'left') {
            if (this.state.cursorPosition === 0) {
                return;
            }
            this.state.cursorPosition--;
        } else {
            if (this.state.cursorPosition === this.state.chars.length) {
                return;
            }
            this.state.cursorPosition++;
        }
        this.render();
    }

    /**
     * Extremely naive implementation for now
     */
    private render() : void {
        this.container.innerHTML = '';
        let text = '';
        for (let char of this.state.chars) {
            if (char.char === " ") {
                // The cursor position does not consistently respect a trailing space literal, 
                // so we convert it to a non-breaking space to put it in the DOM
                text += "\u00A0";
                continue;
            }
            text += char.char;
        }
        const textNode = document.createTextNode(text);
        this.container.appendChild(textNode);
        const range = document.createRange();
        range.setStart(textNode, this.state.cursorPosition);
        range.setEnd(textNode, this.state.cursorPosition);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}



const editorInstance = new Editor();
editorInstance.init();
