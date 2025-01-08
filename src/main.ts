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



const editor = document.getElementById('pte-container');

//editor?.addEventListener("keydown", e => e.preventDefault());

type TextNode = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

type EditorState = {
    textNodes: TextNode[];
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    cursorPosition: number;
}


const testRender = () => {
    const sampleText : TextNode[] = [
        { text: "Hello World!", bold: true },
        { text: " It is me, your " },
        { text: "friendly", italic: true },
        { text: " text editor!" }
    ];
    
    for (let node of sampleText) {
        let { bold, italic, underline, text } = node;
        if (!bold && !italic && !underline) {
            const el = document.createTextNode(text);
            editor?.appendChild(el);
        } else {
            const el = document.createElement('span');
            el.textContent = text;
            if (bold) el.style.fontWeight = 'bold';
            if (italic) el.style.fontStyle = 'italic';
            if (underline) el.style.textDecoration = 'underline';
            editor?.appendChild(el);
        }
    }
}

window.testRender = testRender;
window.editor = editor;

const nodes: TextNode[] = [];


const simpleState: string = "";

const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    const { key } = e;
    console.log(key);
    if (key === "1") {
        const children = editor?.childNodes;
        if (children) {
            const boldSpan = children[0];
            console.log(boldSpan);
            document.getSelection()?.setPosition(editor, 1);
            //document.getSelection()?.setPosition(children[0], 2)
            console.log(boldSpan.childNodes)
        }
    }
}


editor?.addEventListener("keydown", handleKeyDown);






